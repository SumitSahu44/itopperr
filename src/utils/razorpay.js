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

export const launchRazorpayCheckout = async ({ item, user, amount, onSuccess, onError, onCancel }) => {
  const isScriptLoaded = await loadRazorpayScript();
  if (!isScriptLoaded) {
    alert("Failed to load Razorpay Payment Gateway. Please check your internet connection.");
    if (onError) onError("Failed to load Razorpay SDK");
    return;
  }

  const finalPayable = amount !== undefined && amount !== null ? amount : (item.finalPrice || 4999);

  try {
    const orderRes = await fetch(getApiUrl('/api/payment/create-order'), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: finalPayable,
        currency: "INR",
        receipt: `pay_${((item._id || item.id || 'item')).toString().substring(0, 8)}_${Date.now()}`,
        notes: {
          title: item.title || item.subject || "UPSC Plan",
          studentEmail: user?.email || "guest@itopper.com"
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
      description: item.title || item.subject || "UPSC Course",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=200",
      order_id: orderData.orderId,
      handler: async function (response) {
        try {
          const verifyRes = await fetch(getApiUrl('/api/payment/verify'), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId: item._id || item.id,
              studentId: user?.id || user?._id,
              studentName: user?.name,
              studentEmail: user?.email,
              pricePaid: finalPayable,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyRes.ok && verifyData.success) {
            if (onSuccess) onSuccess(response.razorpay_payment_id, finalPayable);
          } else {
            alert(verifyData.message || "Payment verification failed.");
            if (onError) onError(verifyData.message);
          }
        } catch (err) {
          console.error("Verification error:", err);
          alert("Error verifying payment signature.");
          if (onError) onError(err.message);
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
      alert(response.error.description || "Payment cancelled or failed.");
      if (onCancel) onCancel(response.error);
    });

    razorpayInstance.open();
  } catch (err) {
    console.error("Payment error:", err);
    alert("Something went wrong with the payment gateway.");
    if (onError) onError(err.message);
  }
};
