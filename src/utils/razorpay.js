import { getApiUrl } from '../config/api';

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const checkOrderStatus = async (orderId) => {
  try {
    const res = await fetch(getApiUrl(`/api/payment/status/${orderId}`));
    return await res.json();
  } catch (err) {
    console.error("Failed to check order status:", err);
    return { success: false, error: err.message };
  }
};

export const launchRazorpayCheckout = async ({ item, user, amount, onSuccess, onError, onCancel }) => {
  const isScriptLoaded = await loadRazorpayScript();
  if (!isScriptLoaded) {
    alert("Failed to load Razorpay Payment Gateway. Please check your internet connection.");
    if (onError) onError("Failed to load Razorpay SDK");
    return;
  }

  const finalPayable = amount !== undefined && amount !== null ? amount : (item.finalPrice || 4999);
  const itemName = item.title || item.subject || "UPSC Plan";
  const itemType = item.category || (item.title ? "Evaluation" : "Course");

  try {
    const orderRes = await fetch(getApiUrl('/api/payment/create-order'), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: finalPayable,
        currency: "INR",
        receipt: `pay_${((item._id || item.id || 'item')).toString().substring(0, 8)}_${Date.now()}`,
        courseId: item._id || item.id,
        studentId: user?.id || user?._id,
        studentName: user?.name || "Student",
        studentEmail: user?.email || "guest@itopper.com",
        itemType,
        itemName,
        notes: {
          title: itemName,
          studentName: user?.name || "Student",
          studentEmail: user?.email || "guest@itopper.com",
          itemType,
          courseId: item._id || item.id
        }
      }),
    });

    const orderData = await orderRes.json();
    if (!orderRes.ok || !orderData.orderId) {
      alert(orderData.message || "Failed to create payment order.");
      if (onError) onError(orderData.message);
      return;
    }

    const razorpayKey = orderData.key || import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_live_TbVfSTdE3of9kw";

    const options = {
      key: razorpayKey,
      amount: orderData.amount,
      currency: orderData.currency || "INR",
      name: "iTopper IAS Academy",
      description: itemName,
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=200",
      order_id: orderData.orderId,
      handler: async function (response) {
        // Asynchronously notify backend of verification
        try {
          await fetch(getApiUrl('/api/payment/verify'), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId: item._id || item.id,
              studentId: user?.id || user?._id || "guest_student",
              studentName: user?.name || "Student",
              studentEmail: user?.email || "student@itopper.com",
              pricePaid: finalPayable,
              itemName,
              itemType
            }),
          });
        } catch (err) {
          console.warn("Background backend verification notification warning:", err);
        }

        // Always save local purchase enrollment record so user immediately sees plan in dashboard
        try {
          const userEmail = user?.email || 'guest';
          const userKey = `itopper_purchased_evals_${userEmail}`;
          const existingUserEvals = JSON.parse(localStorage.getItem(userKey) || "[]");
          const globalEvals = JSON.parse(localStorage.getItem("itopper_purchased_evals_all") || "[]");

          const newRecord = {
            ...item,
            purchasedAt: new Date().toISOString(),
            receiptId: response.razorpay_payment_id,
            finalPaid: finalPayable
          };

          if (!existingUserEvals.some(p => (p._id && p._id === item._id) || (p.id && p.id === item.id))) {
            localStorage.setItem(userKey, JSON.stringify([...existingUserEvals, newRecord]));
          }
          if (!globalEvals.some(p => (p._id && p._id === item._id) || (p.id && p.id === item.id))) {
            localStorage.setItem("itopper_purchased_evals_all", JSON.stringify([...globalEvals, newRecord]));
          }
        } catch (storageErr) {
          console.error("Local storage save error:", storageErr);
        }

        // Fulfill success & redirect user to dashboard / success screen
        if (onSuccess) {
          onSuccess(response.razorpay_payment_id, finalPayable);
        }
      },
      prefill: {
        name: user?.name || "",
        email: user?.email || "",
        contact: ""
      },
      theme: {
        color: "#0a2968"
      }
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.on("payment.failed", function (response) {
      console.error("Payment failed:", response.error);
      const errReason = response.error.description || "Payment cancelled or failed.";
      alert(`Payment Warning: ${errReason}`);
      if (onCancel) onCancel(response.error);
    });

    razorpayInstance.open();
  } catch (err) {
    console.error("Payment error:", err);
    alert("Something went wrong with the payment gateway. Please try again.");
    if (onError) onError(err.message);
  }
};
