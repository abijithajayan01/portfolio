<?php
/**
 * ==============================================================================
 * DUAL-EMAIL MEETING DISPATCH SCRIPT (SWIFT / PHP SMTP)
 * ==============================================================================
 *
 * Dispatches two emails when a client schedules a meeting:
 * 1. Admin Alert: Sent to abijithajayan01@gmail.com with complete meeting specs.
 * 2. Client Confirmation: Sent to the client FROM abijithajayan01@gmail.com
 *    with a customized, professional "Thank You" confirmation template.
 */

// Headers for JSON API & CORS
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed. Use POST.']);
    exit;
}

// Load Configuration
$config = file_exists(__DIR__ . '/config.php') ? require __DIR__ . '/config.php' : [];
$smtpHost  = $config['smtp_host'] ?? 'smtp.gmail.com';
$smtpPort  = (int)($config['smtp_port'] ?? 587);
$smtpEnc   = $config['smtp_encryption'] ?? 'tls';
$smtpUser  = trim($config['smtp_user'] ?? 'abijithajayan01@gmail.com');
$smtpPass  = str_replace(' ', '', trim($config['smtp_pass'] ?? ''));
$adminEmail = $config['admin_email'] ?? 'abijithajayan01@gmail.com';
$adminName  = $config['admin_name'] ?? 'Abijith Ajayan';
$whatsappNo = $config['whatsapp_number'] ?? '+91 9605780704';

// Read JSON Input
$inputRaw = file_get_contents('php://input');
if (empty($inputRaw)) {
    $inputRaw = file_get_contents('php://stdin');
}
$data = json_decode($inputRaw, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON input.']);
    exit;
}

// Sanitize & Validate Fields
$clientName    = htmlspecialchars(trim($data['client_name'] ?? 'Client'), ENT_QUOTES, 'UTF-8');
$clientEmail   = filter_var(trim($data['client_email'] ?? ''), FILTER_VALIDATE_EMAIL);
$platform      = htmlspecialchars(trim($data['platform'] ?? 'Google Meet'), ENT_QUOTES, 'UTF-8');
$meetingDate   = htmlspecialchars(trim($data['meeting_date'] ?? 'Upcoming Date'), ENT_QUOTES, 'UTF-8');
$meetingTime   = htmlspecialchars(trim($data['time_slot'] ?? '06:30 PM IST (09:00 AM EST)'), ENT_QUOTES, 'UTF-8');
$agenda        = htmlspecialchars(trim($data['agenda'] ?? 'Architecture & Project Discussion'), ENT_QUOTES, 'UTF-8');
$notes         = htmlspecialchars(trim($data['notes'] ?? ''), ENT_QUOTES, 'UTF-8');

if (!$clientEmail) {
    http_response_code(422);
    echo json_encode(['success' => false, 'error' => 'Please provide a valid client email address.']);
    exit;
}

// ==============================================================================
// 1. TEMPLATE 1: ADMIN MEETING ALERT (TO: abijithajayan01@gmail.com)
// ==============================================================================
$adminSubject = "📅 Video Call Meeting Request: {$platform} with {$clientName}";

$adminHtml = <<<HTML
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Meeting Request</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #070a12; color: #f1f5f9;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background: #0d1527; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 14px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <!-- Top Accent Banner -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #10b981, #2dd4bf, #3b82f6);"></td>
          </tr>
          <!-- Header -->
          <tr>
            <td style="padding: 28px 32px 18px 32px; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <span style="display: inline-block; padding: 4px 10px; background: rgba(20, 184, 166, 0.15); border: 1px solid #2dd4bf; border-radius: 20px; color: #2dd4bf; font-size: 11px; font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase;">
                📅 Meeting Schedule Alert
              </span>
              <h2 style="margin: 12px 0 4px 0; color: #ffffff; font-size: 22px; font-weight: 700;">
                New Video Discussion Request
              </h2>
              <p style="margin: 0; color: #94a3b8; font-size: 14px;">
                Requested by <strong>{$clientName}</strong> via your portfolio booking modal.
              </p>
            </td>
          </tr>
          <!-- Body Specifications -->
          <tr>
            <td style="padding: 24px 32px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="10" style="background: #080e19; border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 8px;">
                <tr>
                  <td width="35%" style="color: #64748b; font-size: 12px; font-family: monospace; text-transform: uppercase;">Platform</td>
                  <td style="color: #2dd4bf; font-weight: 700; font-size: 14px;">{$platform}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-size: 12px; font-family: monospace; text-transform: uppercase;">Proposed Date</td>
                  <td style="color: #f8fafc; font-weight: 600; font-size: 14px;">{$meetingDate}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-size: 12px; font-family: monospace; text-transform: uppercase;">Time Slot</td>
                  <td style="color: #38bdf8; font-weight: 600; font-size: 14px;">{$meetingTime}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-size: 12px; font-family: monospace; text-transform: uppercase;">Client Name</td>
                  <td style="color: #f8fafc; font-weight: 600; font-size: 14px;">{$clientName}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-size: 12px; font-family: monospace; text-transform: uppercase;">Client Email</td>
                  <td><a href="mailto:{$clientEmail}" style="color: #2dd4bf; text-decoration: none; font-weight: 600;">{$clientEmail}</a></td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-size: 12px; font-family: monospace; text-transform: uppercase;">Agenda / Topic</td>
                  <td style="color: #e2e8f0; font-size: 14px;">{$agenda}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-size: 12px; font-family: monospace; text-transform: uppercase;">Project Notes</td>
                  <td style="color: #cbd5e1; font-size: 13px; font-style: italic;">{$notes}</td>
                </tr>
              </table>

              <!-- Quick Actions -->
              <div style="margin-top: 24px; text-align: center;">
                <a href="mailto:{$clientEmail}?subject=Re:%20Video%20Meeting%20with%20Abijith%20Ajayan" style="display: inline-block; padding: 12px 24px; background: #2dd4bf; color: #042f2e; text-decoration: none; font-weight: 700; font-size: 14px; border-radius: 8px; margin-right: 8px;">
                  ✉️ Reply to {$clientName}
                </a>
                <a href="https://wa.me/919605780704" style="display: inline-block; padding: 12px 20px; background: rgba(255, 255, 255, 0.06); color: #cbd5e1; text-decoration: none; font-weight: 600; font-size: 14px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.1);">
                  💬 WhatsApp Direct
                </a>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 16px 32px; background: #060912; border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center; color: #64748b; font-size: 12px;">
              Portfolio Lead Dispatch Engine &bull; Abijith Ajayan &bull; {$adminEmail}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;

// ==============================================================================
// 2. TEMPLATE 2: CLIENT THANK YOU & CONFIRMATION (TO: clientEmail)
// ==============================================================================
$clientSubject = "Thank You for Scheduling a Discussion — Abijith Ajayan";

$clientHtml = <<<HTML
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Thank You for Scheduling</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #070a12; color: #f1f5f9;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background: #0d1527; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 14px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <!-- Top Accent Banner -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #10b981, #2dd4bf, #3b82f6);"></td>
          </tr>
          <!-- Header -->
          <tr>
            <td style="padding: 32px 32px 20px 32px; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <span style="display: inline-block; padding: 4px 10px; background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: 20px; color: #10b981; font-size: 11px; font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase;">
                ✓ Request Received
              </span>
              <h2 style="margin: 14px 0 6px 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                Thank You for Connecting!
              </h2>
              <p style="margin: 0; color: #cbd5e1; font-size: 15px; line-height: 1.5;">
                Hi <strong>{$clientName}</strong>, thank you for scheduling a video call meeting with me.
              </p>
            </td>
          </tr>
          <!-- Body Specifications -->
          <tr>
            <td style="padding: 24px 32px;">
              <p style="color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 0 0 18px 0;">
                I have received your discussion request and am reviewing my schedule. I will prepare the agenda and send you an official calendar invitation with the <strong>{$platform}</strong> video call link shortly.
              </p>

              <!-- Meeting Summary Card -->
              <table width="100%" border="0" cellspacing="0" cellpadding="10" style="background: #080e19; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; margin-bottom: 22px;">
                <tr>
                  <td width="35%" style="color: #64748b; font-size: 12px; font-family: monospace; text-transform: uppercase;">Platform</td>
                  <td style="color: #2dd4bf; font-weight: 700; font-size: 14px;">{$platform}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-size: 12px; font-family: monospace; text-transform: uppercase;">Proposed Date</td>
                  <td style="color: #f8fafc; font-weight: 600; font-size: 14px;">{$meetingDate}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-size: 12px; font-family: monospace; text-transform: uppercase;">Preferred Time</td>
                  <td style="color: #38bdf8; font-weight: 600; font-size: 14px;">{$meetingTime}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-size: 12px; font-family: monospace; text-transform: uppercase;">Discussion Topic</td>
                  <td style="color: #e2e8f0; font-size: 14px;">{$agenda}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-size: 12px; font-family: monospace; text-transform: uppercase;">Your Notes</td>
                  <td style="color: #cbd5e1; font-size: 13px; font-style: italic;">{$notes}</td>
                </tr>
              </table>

              <p style="color: #94a3b8; font-size: 13.5px; line-height: 1.6; margin: 0 0 20px 0;">
                If you have architectural blueprints, technical specifications, or need immediate assistance, feel free to reply directly to this email or contact me on WhatsApp:
              </p>

              <!-- WhatsApp Action -->
              <div style="text-align: left; margin-bottom: 24px;">
                <a href="https://wa.me/919605780704" style="display: inline-block; padding: 10px 18px; background: rgba(37, 211, 102, 0.12); color: #25d366; text-decoration: none; font-weight: 600; font-size: 13px; border-radius: 6px; border: 1px solid rgba(37, 211, 102, 0.3);">
                  💬 Message on WhatsApp ({$whatsappNo})
                </a>
              </div>

              <!-- Signature -->
              <div style="padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.08);">
                <p style="margin: 0; color: #ffffff; font-weight: 700; font-size: 15px;">Abijith Ajayan</p>
                <p style="margin: 2px 0 0 0; color: #2dd4bf; font-size: 13px;">Lead Full Stack &amp; GenAI Engineer</p>
                <p style="margin: 4px 0 0 0; color: #64748b; font-size: 12px;">Email: <a href="mailto:{$adminEmail}" style="color: #94a3b8; text-decoration: none;">{$adminEmail}</a></p>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 16px 32px; background: #060912; border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center; color: #64748b; font-size: 11px;">
              This is an automated confirmation sent on behalf of Abijith Ajayan &bull; {$adminEmail}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;

// ==============================================================================
// 3. SMTP MAILER IMPLEMENTATION (SwiftMailer or Standalone Pure-PHP SMTP)
// ==============================================================================

/**
 * Robust Standalone Pure-PHP SMTP Socket Mailer Class
 * Zero dependencies, works on any PHP 7.x/8.x hosting.
 */
class StandaloneSmtpMailer {
    private $host;
    private $port;
    private $encryption;
    private $username;
    private $password;
    private $socket;

    public function __construct($host, $port, $encryption, $username, $password) {
        $this->host = $host;
        $this->port = $port;
        $this->encryption = strtolower($encryption);
        $this->username = $username;
        $this->password = $password;
    }

    private function getResponse() {
        $response = '';
        while (($line = fgets($this->socket, 515)) !== false) {
            $response .= $line;
            if (substr($line, 3, 1) === ' ') break;
        }
        return $response;
    }

    private function sendCommand($cmd, $expectedCode) {
        fputs($this->socket, $cmd . "\r\n");
        $response = $this->getResponse();
        $code = (int)substr($response, 0, 3);
        if ($code !== $expectedCode) {
            throw new Exception("SMTP Error for command [{$cmd}]: {$response}");
        }
        return $response;
    }

    public function send($fromEmail, $fromName, $toEmail, $toName, $subject, $htmlBody, $replyToEmail = null) {
        $prefix = ($this->encryption === 'ssl') ? 'ssl://' : '';
        $timeout = 15;
        $this->socket = @fsockopen($prefix . $this->host, $this->port, $errno, $errstr, $timeout);

        if (!$this->socket) {
            throw new Exception("Could not connect to SMTP host {$this->host}:{$this->port} ({$errno}: {$errstr})");
        }

        $this->getResponse();
        $this->sendCommand('EHLO ' . gethostname(), 250);

        if ($this->encryption === 'tls') {
            $this->sendCommand('STARTTLS', 220);
            stream_socket_enable_crypto($this->socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
            $this->sendCommand('EHLO ' . gethostname(), 250);
        }

        // Authenticate
        if (!empty($this->username) && !empty($this->password)) {
            $this->sendCommand('AUTH LOGIN', 334);
            $this->sendCommand(base64_encode($this->username), 334);
            $this->sendCommand(base64_encode($this->password), 235);
        }

        $this->sendCommand("MAIL FROM:<{$fromEmail}>", 250);
        $this->sendCommand("RCPT TO:<{$toEmail}>", 250);
        $this->sendCommand('DATA', 354);

        $boundary = '=_NextPart_' . md5(microtime());
        $altText = strip_tags(str_replace(['<br>', '<br/>', '</p>'], "\n", $htmlBody));

        $headers  = "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <{$fromEmail}>\r\n";
        $headers .= "To: =?UTF-8?B?" . base64_encode($toName) . "?= <{$toEmail}>\r\n";
        if ($replyToEmail) {
            $headers .= "Reply-To: <{$replyToEmail}>\r\n";
        }
        $headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
        $headers .= "Date: " . date('r') . "\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: multipart/alternative; boundary=\"{$boundary}\"\r\n";

        $body  = "--{$boundary}\r\n";
        $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $body .= chunk_split(base64_encode($altText)) . "\r\n";

        $body .= "--{$boundary}\r\n";
        $body .= "Content-Type: text/html; charset=UTF-8\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $body .= chunk_split(base64_encode($htmlBody)) . "\r\n";
        $body .= "--{$boundary}--\r\n";

        $this->sendCommand($headers . "\r\n" . $body . "\r\n.", 250);
        $this->sendCommand('QUIT', 221);
        fclose($this->socket);
        return true;
    }
}

// ==============================================================================
// 4. EXECUTE DUAL DISPATCH
// ==============================================================================

$errors = [];
$adminSent = false;
$clientSent = false;

// Check if SwiftMailer or Composer autoload is present
if (file_exists(__DIR__ . '/../vendor/autoload.php')) {
    require_once __DIR__ . '/../vendor/autoload.php';
}

if (class_exists('Swift_SmtpTransport') && class_exists('Swift_Mailer')) {
    // --------------------------------------------------------------------------
    // A. SwiftMailer Implementation
    // --------------------------------------------------------------------------
    try {
        $transport = (new Swift_SmtpTransport($smtpHost, $smtpPort, $smtpEnc))
            ->setUsername($smtpUser)
            ->setPassword($smtpPass);
        $mailer = new Swift_Mailer($transport);

        // 1. Message to Abijith
        $msg1 = (new Swift_Message($adminSubject))
            ->setFrom([$smtpUser => $clientName])
            ->setReplyTo([$clientEmail => $clientName])
            ->setTo([$adminEmail => $adminName])
            ->setBody($adminHtml, 'text/html');
        $adminSent = (bool)$mailer->send($msg1);

        // 2. Message to Client
        $msg2 = (new Swift_Message($clientSubject))
            ->setFrom([$smtpUser => $adminName])
            ->setReplyTo([$adminEmail => $adminName])
            ->setTo([$clientEmail => $clientName])
            ->setBody($clientHtml, 'text/html');
        $clientSent = (bool)$mailer->send($msg2);
    } catch (Exception $e) {
        $errors[] = 'SwiftMailer Exception: ' . $e->getMessage();
    }
} else {
    // --------------------------------------------------------------------------
    // B. High-Performance Standalone SMTP Socket Implementation
    // --------------------------------------------------------------------------
    if (!empty($smtpPass) && $smtpPass !== 'YOUR_GMAIL_APP_PASSWORD') {
        try {
            $mailer = new StandaloneSmtpMailer($smtpHost, $smtpPort, $smtpEnc, $smtpUser, $smtpPass);

            // 1. Send Meeting Alert to Abijith
            $adminSent = $mailer->send(
                $smtpUser,
                $clientName,
                $adminEmail,
                $adminName,
                $adminSubject,
                $adminHtml,
                $clientEmail
            );

            // 2. Send Thank You Confirmation to Client (From: abijithajayan01@gmail.com)
            $clientSent = $mailer->send(
                $smtpUser,
                $adminName,
                $clientEmail,
                $clientName,
                $clientSubject,
                $clientHtml,
                $adminEmail
            );
        } catch (Exception $e) {
            $errors[] = 'SMTP Exception: ' . $e->getMessage();
        }
    } else {
        // Fallback: If SMTP credentials not yet provided in config.php
        if (PHP_OS_FAMILY === 'Windows' && ini_get('SMTP') === 'localhost') {
            $errors[] = 'SMTP credentials not yet set in api/config.php. Please enter your 16-character Gmail App Password.';
        } else {
            $headersAdmin  = "From: {$adminName} <{$smtpUser}>\r\n";
            $headersAdmin .= "Reply-To: {$clientEmail}\r\n";
            $headersAdmin .= "MIME-Version: 1.0\r\nContent-Type: text/html; charset=UTF-8\r\n";

            $headersClient  = "From: {$adminName} <{$smtpUser}>\r\n";
            $headersClient .= "Reply-To: {$adminEmail}\r\n";
            $headersClient .= "MIME-Version: 1.0\r\nContent-Type: text/html; charset=UTF-8\r\n";

            $adminSent = @mail($adminEmail, $adminSubject, $adminHtml, $headersAdmin);
            $clientSent = @mail($clientEmail, $clientSubject, $clientHtml, $headersClient);

            if (!$adminSent && !$clientSent) {
                $errors[] = 'SMTP credentials not configured in api/config.php and mail() was rejected by local environment.';
            }
        }
    }
}

// Return JSON Response
if ($adminSent || $clientSent) {
    echo json_encode([
        'success'      => true,
        'message'      => 'Meeting request received and Thank You confirmation dispatched to client.',
        'admin_sent'   => $adminSent,
        'client_sent'  => $clientSent,
        'sender'       => $smtpUser
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error'   => 'Could not dispatch emails.',
        'details' => $errors,
        'hint'    => 'Please set your 16-character Gmail App Password in api/config.php.'
    ]);
}
