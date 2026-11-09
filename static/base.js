let sidebarStatus = false
const sidebar = document.querySelector('#sidebar')
const sideButton = document.querySelector('#side-button');
const lastUpdate = document.getElementById('last-refresh')

document.addEventListener('DOMContentLoaded', e => {
    function updateTime() {
        const now = new Date();
        document.getElementById('current-time').textContent = `The current time is: 而家係：${now.toLocaleTimeString()}`
        document.getElementById('current-date').textContent = `Today's date is: 今日係：${now.toLocaleDateString()}`
    }

    updateTime();
    setInterval(updateTime, 1000);
})

document.addEventListener('click', e => {
    if (sideButton.contains(e.target)) {
        if (sidebarStatus === false) {
            if (window.innerWidth <= 575) {
                document.getElementById("sidebar").style.height = "250px"
                document.getElementById("sidebar").style.width = "100%"
            }
            else {
                document.getElementById("sidebar").style.height = "100%"
                document.getElementById("sidebar").style.width = "320px"
                document.getElementById("main").style.marginLeft = "320px"
                document.getElementById("topbar").style.marginLeft = "320px"
            }
            sidebarStatus = true
        }
        else {
            if (window.innerWidth <= 575) {
                document.getElementById("sidebar").style.height = "0"
            }
            else {
                document.getElementById("sidebar").style.width = "0"
                document.getElementById("main").style.marginLeft = "0"
                document.getElementById("topbar").style.marginLeft = "0"
            }
            sidebarStatus = false
        }
    }
    else if (!sidebar.contains(e.target)) {
        if (sidebarStatus === true) {
            if (window.innerWidth <= 575) {
                document.getElementById("sidebar").style.height = "0"
            }
            else {
                document.getElementById("sidebar").style.width = "0"
                document.getElementById("main").style.marginLeft = "0"
                document.getElementById("topbar").style.marginLeft = "0"
            }
            sidebarStatus = false
        }
    }
})