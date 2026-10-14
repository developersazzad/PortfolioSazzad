<?php
header('Content-Type: application/json');

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $form_type = $_POST["form_type"] ?? 'contact';
    $email = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);

    if (empty($email)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Email is required."]);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // Use local mail() function - exactly how WordPress sends emails by default!
        $mail->setFrom('noreply@sazzad.wedevspro.com', 'Portfolio System');
        $mail->addAddress('developer.sazzad.me@gmail.com');
        $mail->isHTML(true);

        if ($form_type === 'subscribe') {
            $mail->addReplyTo($email);
            $mail->Subject = 'New Newsletter Subscriber';
            
            $emailTemplate = "
            <div style='font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background-color: #f4f7f6; padding: 30px; border-radius: 10px; border-top: 5px solid #c9f15f; box-shadow: 0 2px 10px rgba(0,0,0,0.05);'>
                <div style='text-align: center; margin-bottom: 20px;'>
                    <h2 style='color: #111; margin: 0; font-size: 24px;'>New Subscriber Alert! ??</h2>
                    <p style='color: #666; font-size: 15px; margin-top: 8px;'>Someone just joined your portfolio updates list.</p>
                </div>
                <div style='background-color: #ffffff; padding: 25px; border-radius: 8px; text-align: center; border: 1px solid #eaeaea;'>
                    <span style='display: inline-block; background-color: #f1f8e9; color: #33691e; padding: 10px 20px; border-radius: 50px; font-weight: bold; font-size: 18px; letter-spacing: 0.5px;'>
                        {$email}
                    </span>
                </div>
                <div style='text-align: center; margin-top: 25px; color: #999; font-size: 12px;'>
                    <p style='margin: 0;'>This notification was sent automatically from your portfolio.</p>
                </div>
            </div>
            ";
            $mail->Body = $emailTemplate;
            $mail->AltBody = "New Subscriber Alert!\n\nSomeone just joined your updates list: {$email}";
        } else {
            // Default Contact Form
            $name = strip_tags(trim($_POST["name"] ?? ''));
            $phone = strip_tags(trim($_POST["phone"] ?? ''));
            $message = strip_tags(trim($_POST["message"] ?? ''));

            if (empty($name) || empty($message)) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "Name and message are required."]);
                exit;
            }

            $mail->addReplyTo($email, $name);
            $mail->Subject = 'New Consultation Request from ' . $name;
            
            $emailTemplate = "
            <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px; border: 1px solid #ddd;'>
                <h2 style='color: #333; text-align: center; border-bottom: 2px solid #c9f15f; padding-bottom: 10px;'>New Consultation Request</h2>
                <div style='background-color: #fff; padding: 20px; border-radius: 8px; margin-top: 20px;'>
                    <p><strong>Name:</strong> {$name}</p>
                    <p><strong>Email:</strong> {$email}</p>
                    <p><strong>Phone:</strong> {$phone}</p>
                    <hr style='border: 0; border-top: 1px solid #eee; margin: 20px 0;'>
                    <p><strong>Message:</strong></p>
                    <p style='background-color: #f1f1f1; padding: 15px; border-left: 4px solid #c9f15f; border-radius: 4px; white-space: pre-wrap;'>{$message}</p>
                </div>
                <p style='text-align: center; color: #888; font-size: 12px; margin-top: 20px;'>This email was generated from your portfolio contact form.</p>
            </div>
            ";
            $mail->Body = $emailTemplate;
            $mail->AltBody = "Name: {$name}\nEmail: {$email}\nPhone: {$phone}\nMessage:\n{$message}";
        }

        $mail->send();
        echo json_encode(["status" => "success", "message" => "Message sent successfully!"]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
    }
} else {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Forbidden request."]);
}
?>
