let filter = document.getElementById('filter')

document.addEventListener("DOMContentLoaded", function() {
    let scheme = localStorage.getItem('scheme')

    function updateTime() {
        const now = new Date();
        document.getElementById('current-time').textContent = `The Time Now Is: ${now.toLocaleTimeString()}`
        document.getElementById('current-date').textContent = `The Date Now Is: ${now.toLocaleDateString()}`
    }

    updateTime();
    setInterval(updateTime, 1000);
    if (scheme === null) {
        localStorage.setItem("scheme", "light")
        scheme = localStorage.getItem('scheme')
    }
})

