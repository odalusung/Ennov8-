<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


header('Content-Type: application/json');  // Always ensure this is at the top

// Load Composer's autoloader
require '/opt/bitnami/apache/htdocs/2.0/Contact/vendor/autoload.php'; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $fullName = $_POST['full_name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $linkedin = $_POST['linkedin'];
    $position = $_POST['position'];
    $coverLetter = $_POST['cover_letter'];
    $workModel = $_POST['work_model'];

    // File upload handling for resume
    if (isset($_FILES['resume']) && $_FILES['resume']['error'] == UPLOAD_ERR_OK) {
        $resumePath = $_FILES['resume']['tmp_name'];
        $resumeName = $_FILES['resume']['name'];
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error uploading resume file.']);
        exit;
    }

    // PHPMailer setup
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';  // Use Gmail's SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'dannaandal3@gmail.com';  // Your Gmail address
        $mail->Password = 'defz maga aemj gsaw';  // Your Gmail app password for better security
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Sender and recipient
        $mail->setFrom('no-reply@ennov8dg.com', 'Ennov8DG');  // Sender email
        $mail->addAddress('dannaandal3@gmail.com', 'HR Department');  // Recipient email

        // Attach the resume file
        $mail->addAttachment($resumePath, $resumeName);

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'New Job Application: ' . $fullName;
        $mail->Body = "
            <h1>New Job Application</h1>
            <p><strong>Full Name:</strong> {$fullName}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Phone:</strong> {$phone}</p>
            <p><strong>LinkedIn Profile:</strong> {$linkedin}</p>
            <p><strong>Applying for Position:</strong> {$position}</p>
            <p><strong>Preferred Work Model:</strong> {$workModel}</p>
            <p><strong>Cover Letter:</strong> {$coverLetter}</p>
        ";

       
      // Send the email
      $mail->send();
      echo json_encode(['status' => 'success', 'message' => 'Application sent successfully.']);
  } catch (Exception $e) {
      echo json_encode(['status' => 'error', 'message' => 'Error sending email: ' . $mail->ErrorInfo]);
  }
} else {
  http_response_code(405);  // Method Not Allowed
  echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}