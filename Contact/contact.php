<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '/opt/bitnami/apache/htdocs/2.0/Contact/vendor/autoload.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $phone = htmlspecialchars(trim($_POST['phone']));
    $message = htmlspecialchars(trim($_POST['message']));

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<div class='error'>Invalid email address!</div>";
        exit();
    }

    $mail = new PHPMailer(true);
    $mail->SMTPDebug = 2;

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.office365.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'hr@ennov8dg.com';
        $mail->Password   = 'hgkbbymmpsgydprd'; // App-specific password if MFA is enabled
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom('hr@ennov8dg.com', 'Ennov8 Contact Form'); // Set sender details here
        $mail->addReplyTo($email, $name);
        $mail->addAddress('hr@ennov8dg.com');

        // Content
        $mail->isHTML(true);
        $mail->Subject = "New Contact Form Submission from $name";
        $mail->Body = "
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> <a href='mailto:{$email}'>{$email}</a></p>
            <p><strong>Phone:</strong> {$phone}</p>
            <hr>
            <h3>Message</h3>
            <p>{$message}</p>
            <br>
            <p><em>This message was submitted via your contact form.</em></p>
        ";

        // Attempt to send email
        if ($mail->send()) {
            echo "<div class='success'>Your message has been sent successfully!</div>";
        } else {
            echo "<div class='error'>Failed to send your message. Please try again later.</div>";
        }
    } catch (Exception $e) {
        echo "<div class='error'>Message could not be sent. Mailer Error: {$mail->ErrorInfo}</div>";
    }
}
?>