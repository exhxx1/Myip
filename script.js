// Function to fetch data and update the UI
async function fetchIpInfo() {
    try {
        const response = await fetch('https://ip-api.com/json/');
        const data = await response.json();

        // Update UI elements with fetched data
        document.getElementById('ip-address').textContent = data.query || 'غير متوفر';
        document.getElementById('isp').textContent = data.isp || 'غير متوفر';
        document.getElementById('location').textContent = `${data.city || ''}, ${data.country || ''}`;

        // Get and display device type
        const deviceType = getDeviceType();
        document.getElementById('device').textContent = deviceType;

        // Animate the info cards after data is loaded
        const infoCards = document.querySelectorAll('#info-container > div');
        infoCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200); // Staggered animation
        });

    } catch (error) {
        console.error('Error fetching IP data:', error);
        document.getElementById('ip-address').textContent = 'خطأ في التحميل';
        document.getElementById('isp').textContent = 'خطأ في التحميل';
        document.getElementById('location').textContent = 'خطأ في التحميل';
        document.getElementById('device').textContent = 'خطأ في التحميل';
    }
}

// Function to determine device type
function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "جهاز لوحي (Tablet)";
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "هاتف محمول (Mobile)";
    }
    return "حاسوب مكتبي (Desktop)";
}

// Function to copy IP address to clipboard
document.getElementById('copy-button').addEventListener('click', () => {
    const ipAddress = document.getElementById('ip-address').textContent;
    navigator.clipboard.writeText(ipAddress)
        .then(() => {
            alert('تم نسخ عنوان IP بنجاح!');
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
            alert('فشل في النسخ، يرجى المحاولة مرة أخرى.');
        });
});

// Run the main function on page load
fetchIpInfo();
