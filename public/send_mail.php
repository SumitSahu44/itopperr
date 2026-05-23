<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request
if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "No data provided."]);
    exit();
}

$to = "itopperiasacademy@gmail.com";
$subject = "New Lead Submission from iTopper Academy";

$message = "You have received a new lead submission.\n\n";
foreach ($data as $key => $value) {
    $message .= ucfirst($key) . ": " . $value . "\n";
}

// Ensure the email goes to inbox by providing standard headers
$headers = "From: noreply@itopper.academy\r\n";
$headers .= "Reply-To: noreply@itopper.academy\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

if (mail($to, $subject, $message, $headers)) {
    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Email sent successfully."]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to send email."]);
}
?>
