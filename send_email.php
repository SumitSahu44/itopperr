<?php
// Prevent PHP from outputting HTML errors which breaks JSON response
ini_set('display_errors', 0);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get JSON POST body
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!$data) {
        echo json_encode(["status" => "error", "message" => "Invalid JSON payload received"]);
        exit;
    }

    $name = isset($data['name']) ? htmlspecialchars(strip_tags($data['name'])) : '';
    $phone = isset($data['phone']) ? htmlspecialchars(strip_tags($data['phone'])) : '';
    $city = isset($data['city']) ? htmlspecialchars(strip_tags($data['city'])) : '';
    $education = isset($data['education']) ? htmlspecialchars(strip_tags($data['education'])) : '';
    $stream = isset($data['stream']) ? htmlspecialchars(strip_tags($data['stream'])) : '';

    if (empty($name) || empty($phone)) {
        echo json_encode(["status" => "error", "message" => "Name and phone are required"]);
        exit;
    }

    // Fixed typo: kuamr -> kumar (please verify if this is correct)
    $to = "sumitkumarshau141@gmail.com"; 
    $subject = "New RankStorm Mentorship Registration - $name";
    
    $message = "You have received a new registration.\n\n";
    $message .= "Name: $name\n";
    $message .= "Phone: $phone\n";
    $message .= "City: $city\n";
    $message .= "Education: $education\n";
    $message .= "Stream: $stream\n";

    // IMPORTANT: Make sure this email exists in your Hostinger account!
    $senderEmail = "info@itopper.academy"; 

    $headers = "From: " . $senderEmail . "\r\n";
    $headers .= "Reply-To: " . $senderEmail . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // The -f parameter sets the return path (Envelope Sender) which is strictly enforced by Hostinger
    $mailSent = @mail($to, $subject, $message, $headers, "-f" . $senderEmail);
    
    if ($mailSent) {
        echo json_encode(["status" => "success", "message" => "Email sent successfully"]);
    } else {
        // Fallback without -f parameter just in case it's blocked by the server
        $mailSentFallback = @mail($to, $subject, $message, $headers);
        if ($mailSentFallback) {
             echo json_encode(["status" => "success", "message" => "Email sent successfully (fallback)"]);
        } else {
             $error = error_get_last();
             echo json_encode(["status" => "error", "message" => "Failed to send email", "details" => $error]);
        }
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
?>
