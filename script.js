// Function to fetch data and update the UI
async function fetchIpInfo() {
    try {
        const response = await fetch('https://ip-api.com/json/');
        const data = await response.json();

        // Update UI elements with fetched data
        document.getElementById('ip-address').textContent = data.query || 'Not available';
        document.getElementById('isp').textContent = data.isp || 'Not available';
        document.getElementById('location').textContent = `${data.city || ''}, ${data.country || ''}`;

        // Get and display device type
        const deviceType = getDeviceType();
        document.getElementById('device').textContent = deviceType;
    } catch (error) {
        console.error('Error fetching IP data:', error);
        document.getElementById('ip-address').textContent = 'Error';
        document.getElementById('isp').textContent = 'Error';
        document.getElementById('location').textContent = 'Error';
        document.getElementById('device').textContent = 'Error';
    }
}

// Function to determine device type
function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "Tablet";
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "Mobile";
    }
    return "Desktop";
}

// Function to copy IP address to clipboard
document.getElementById('copy-button').addEventListener('click', () => {
    const ipAddress = document.getElementById('ip-address').textContent;
    navigator.clipboard.writeText(ipAddress)
        .then(() => {
            alert('IP address copied successfully!');
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy, please try again.');
        });
});

// Run the main function on page load
fetchIpInfo();
