<?php
// Enable error reporting to see any PHP errors
ini_set('display_errors', 1);
error_reporting(E_ALL);

echo "<h2>Testing PHP Mail() Function</h2>";

$to = "sumitkumarshau141@gmail.com"; // Change this to your email if needed
$subject = "Test Email from itopper.academy";
$message = "This is a test email triggered by visiting test_email.php.\nIf you are reading this, PHP mail() is working correctly on your Hostinger server.";

// Ensure this email exists in your Hostinger account!
$senderEmail = "info@itopper.academy";

$headers = "From: " . $senderEmail . "\r\n";
$headers .= "Reply-To: " . $senderEmail . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

echo "<p>Attempting to send email to: <strong>$to</strong></p>";
echo "<p>From: <strong>$senderEmail</strong></p>";
echo "<hr>";

// The -f parameter sets the return path (Envelope Sender)
$mailSent = @mail($to, $subject, $message, $headers, "-f" . $senderEmail);

if ($mailSent) {
    echo "<p style='color: green; font-weight: bold;'>✅ Success: Email accepted for delivery! (Used -f flag)</p>";
    echo "<p>Please check your inbox (and spam folder) at $to.</p>";
} else {
    echo "<p style='color: orange;'>⚠️ Failed with -f flag. Trying fallback method...</p>";
    $mailSentFallback = @mail($to, $subject, $message, $headers);
    
    if ($mailSentFallback) {
         echo "<p style='color: green; font-weight: bold;'>✅ Success: Email accepted for delivery! (Fallback method)</p>";
         echo "<p>Please check your inbox (and spam folder) at $to.</p>";
    } else {
         $error = error_get_last();
         echo "<p style='color: red; font-weight: bold;'>❌ Error: Failed to send email.</p>";
         echo "<strong>Error Details from Server:</strong>";
         echo "<pre style='background: #f4f4f4; padding: 10px; border: 1px solid #ccc;'>";
         print_r($error);
         echo "</pre>";
    }
}
?>
