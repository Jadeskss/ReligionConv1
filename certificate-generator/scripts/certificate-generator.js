document.addEventListener('DOMContentLoaded', function() {
    // Get form and result containers
    const conversionForm = document.getElementById('conversionForm');
    const certificateSection = document.getElementById('certificateSection');
    const certificateContainer = document.getElementById('certificate');
    const qrCodeSection = document.getElementById('qrCodeSection');
    
    // Get action buttons
    const downloadBtn = document.getElementById('downloadBtn');
    const printBtn = document.getElementById('printBtn');
    const newCertBtn = document.getElementById('newCertBtn');
    
    // Handle form submission (Convert button)
    conversionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const fromReligion = document.getElementById('fromReligion').value;
        const toReligion = document.getElementById('toReligion').value;
        const date = formatDate(document.getElementById('date').value);
        
        if (!name || !fromReligion || !toReligion || !date) {
            alert('Please fill in all fields');
            return;
        }
        
        // Generate certificate
        generateCertificate(name, fromReligion, toReligion, date);
        
        // Show certificate section
        certificateSection.classList.remove('hidden');
        
        // Scroll to certificate
        certificateSection.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Generate certificate with user data
    function generateCertificate(name, fromReligion, toReligion, date) {
        // Generate a unique certificate ID
        const certificateId = generateUniqueId();
        
        // Create certificate HTML
        const certificateHTML = `
            <div class="certificate-content">
                <div class="certificate-header">
                    <h1>Certificate of Religious Conversion</h1>
                    <div class="certificate-seal"></div>
                </div>
                <div class="certificate-body">
                    <p class="certificate-text">This is to certify that</p>
                    <p class="certificate-name">${name}</p>
                    <p class="certificate-text">has officially converted from</p>
                    <p class="certificate-religion">${fromReligion}</p>
                    <p class="certificate-text">to</p>
                    <p class="certificate-religion">${toReligion}</p>
                    <p class="certificate-text">on this day</p>
                    <p class="certificate-date">${date}</p>
                </div>
                <div class="certificate-footer">
                    <div class="certificate-signature">
                        <div class="signature-line"></div>
                        <p>Official Signature</p>
                    </div>
                    <div class="certificate-qr-container">
                        <div id="certificateQR" class="certificate-qr"></div>
                        <p>Verification QR Code</p>
                    </div>
                    <div class="certificate-id">Certificate ID: ${certificateId}</div>
                </div>
            </div>
        `;
        
        // Insert certificate HTML
        certificateContainer.innerHTML = certificateHTML;
        
        // Generate QR codes (both in certificate and in separate section)
        generateQRCode('certificateQR', name, fromReligion, toReligion, date, certificateId);
        generateQRCode(qrCodeSection.id, name, fromReligion, toReligion, date, certificateId);
    }
    
    // Generate QR code for verification
    function generateQRCode(targetElementId, name, fromReligion, toReligion, date, certificateId) {
        // Create verification data
        const qrData = JSON.stringify({
            name: name,
            from: fromReligion,
            to: toReligion,
            date: date,
            id: certificateId,
            verified: true
        });
        
        // Clear previous QR code
        const targetElement = document.getElementById(targetElementId);
        targetElement.innerHTML = '';
        
        // Create new QR code using qrcode.js library
        new QRCode(targetElement, {
            text: qrData,
            width: targetElementId === 'certificateQR' ? 80 : 128, // smaller size for in-certificate QR
            height: targetElementId === 'certificateQR' ? 80 : 128,
            colorDark: "#000",
            colorLight: "#fff",
            correctLevel: QRCode.CorrectLevel.H
        });
        
        // Add verification text if it's the separate QR section
        if (targetElementId !== 'certificateQR') {
            const verifyText = document.createElement('p');
            verifyText.className = 'qr-title';
            verifyText.textContent = 'Scan to verify';
            targetElement.appendChild(verifyText);
        }
    }
    
    // Handle download button
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            html2canvas(certificateContainer).then(canvas => {
                const link = document.createElement('a');
                link.download = 'conversion-certificate.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        });
    }
    
    // Handle print button
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }
    
    // Handle new certificate button
    if (newCertBtn) {
        newCertBtn.addEventListener('click', function() {
            // Hide certificate section
            certificateSection.classList.add('hidden');
            
            // Reset form
            conversionForm.reset();
            
            // Scroll back to form
            conversionForm.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Helper function to format date
    function formatDate(dateString) {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }).format(date);
    }
    
    // Helper function to generate unique ID
    function generateUniqueId() {
        return 'CERT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }
});