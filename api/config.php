<?php
/**
 * ==============================================================================
 * SMTP & EMAIL CONFIGURATION FOR PORTFOLIO
 * ==============================================================================
 *
 * Update these settings with your SMTP credentials (e.g. Gmail SMTP or cPanel webmail).
 *
 * How to get a Gmail App Password:
 * 1. Go to your Google Account -> Security (https://myaccount.google.com/security).
 * 2. Enable 2-Step Verification if not already enabled.
 * 3. Search for "App Passwords" -> create a new one named "Portfolio Mailer".
 * 4. Paste the 16-character generated password into SMTP_PASS below.
 */

return [
    // SMTP Server Settings
    'smtp_host'       => getenv('SMTP_HOST') ?: 'smtp.gmail.com',
    'smtp_port'       => (int)(getenv('SMTP_PORT') ?: 587),
    'smtp_encryption' => getenv('SMTP_ENCRYPTION') ?: 'tls', // 'tls' (port 587) or 'ssl' (port 465)

    // Sender Authentication
    'smtp_user'       => getenv('SMTP_USER') ?: 'abijithajayan01@gmail.com',
    'smtp_pass'       => getenv('SMTP_PASS') ?: 'uocr vyur tmmz povy', // Replace with your 16-character Gmail App Password

    // Portfolio Owner Details
    'admin_email'     => 'abijithajayan01@gmail.com',
    'admin_name'      => 'Abijith Ajayan',
    'whatsapp_number' => '+91 9605780704',
    'portfolio_url'   => 'https://abijithajayan.dev'
];
