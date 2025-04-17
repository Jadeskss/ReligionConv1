function generateQRCode(data) {
    const qrCodeContainer = document.getElementById('qr-code');
    qrCodeContainer.innerHTML = ''; // Clear previous QR code

    const qrCode = new QRCode(qrCodeContainer, {
        text: data,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('conversion-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name-input').value;
        const conversionData = `Converted to Inc: ${name}`;
        generateQRCode(conversionData);
    });
});