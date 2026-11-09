let filter = document.getElementById('filter')
let onoff = document.getElementById('onoff')
let hours = document.getElementById('hours').value
let days = document.getElementById('days').value
let submit = document.getElementById('submit')
let increment = document.getElementById('increment')
let hourlyNumber = document.getElementById('hourly-number')
let dailyNumber = document.getElementById('daily-number')
let weeklyNumber = document.getElementById('weekly-number')
let fortnightlyNumber = document.getElementById('fortnightly-number')
let monthlyNumber = document.getElementById('monthly-number')

function setOnOff() {
    if (onoff.checked) {
        $("div").css("filter", "grayscale(0%)");
        $("div").css("opacity", "1");
        $("div").css("pointer-events", "auto");
        chrome.runtime.getPlatformInfo()
    }
    else {
        $("div").css("filter", "grayscale(100%)");
        $("div").css("opacity", "0.5");
        $("div").css("pointer-events", "none");
    }
}

function darkMode() {
    $("#light-dark").prop('checked', true);
    $("body").css("background-color", "black");
    $(".description").css("color", "lightgrey");
    $("#light-dark").css("background-color", "#0d6efd");
    $("input.number-scroll").css({"background-color": "dimgrey"});
    $("input.number-input").css({"background-color": "dimgrey"});
    $("h3").css("color", "lightgrey");
    $("label").css("color", "lightgrey");
    $("#result").css("color", "lightgrey");
    $("p").css("color", "lightgrey");
    if ($("#keep-history").is(":checked")) {
        $("#keep-history").css("background-color", "#0d6efd");
    }
    else {
        $("#keep-history").css("background-color", "dimgrey");
    }
}

function lightMode() {
    $("#light-dark").prop('checked', false);
    $("body").css("background-color", "white");
    $(".description").css("color", "black");
    $("#light-dark").css("background-color", "lightgrey");
    $("input.number-scroll").css({"background-color": "lightgrey"});
    $("input.number-input").css({"background-color": "lightgrey"});
    $("h3").css("color", "black");
    $("label").css("color", "black");
    $("#result").css("color", "black");
    $("p").css("color", "black");
    $("#keep-history").css("background-color", "lightgrey");
    if ($("#keep-history").is(":checked")) {
        $("#keep-history").css("background-color", "#0d6efd");
    }
    else {
        $("#keep-history").css("background-color", "lightgrey");
    }
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark').matches){
    darkMode()
}
else{
    lightMode()
}

$("#light-dark").click(function () {
    if ($("#light-dark").is(":checked")) {
        darkMode()
    }
    else {
        lightMode()
    }
})


document.addEventListener("DOMContentLoaded", function() {
    let scheme = localStorage.getItem('scheme')
    
    let totalSalary = 0
    let salaryPerSecond = 0
    let interval = null
    function countSalary() {
        let timeInterval = document.getElementById('time-interval').value
        let eachSalary = filter.value
        
        if (isNaN(hours) || hours === '') {
                hours = 8
            }
        if (isNaN(days) || days === '') {
            days = 5
        }
        
        if (interval !== null) {
            clearInterval(interval)
            totalSalary = 0
            salaryPerSecond = 0
            increment.textContent = `$0.00`
            hourlyNumber.textContent = `$0.00`
            dailyNumber.textContent = `$0.00`
            weeklyNumber.textContent = `$0.00`
            fortnightlyNumber.textContent = `$0.00`
            monthlyNumber.textContent = `$0.00`
        }
        if (timeInterval === 'hourly') {
            salaryPerSecond = eachSalary / 3600
        }
        else if (timeInterval === 'daily') {
            salaryPerSecond = eachSalary / (3600 * hours)
        }
        else if (timeInterval === 'weekly') {
            salaryPerSecond = eachSalary / (3600 * hours * days)
        }
        else if (timeInterval === 'fortnightly') {
            salaryPerSecond = eachSalary / (3600 * hours * days * 2)
        }
        else if (timeInterval === 'monthly') {
            salaryPerSecond = eachSalary / (3600 * hours * days * 4)
        }

        interval = setInterval(function() {
            totalSalary += salaryPerSecond
            console.log("start")
            console.log(totalSalary)
            console.log(salaryPerSecond)
            console.log("end")
            increment.textContent = `$${totalSalary.toFixed(2)}`
            hourlyNumber.textContent = `$${(salaryPerSecond * 3600).toFixed(2)}`
            dailyNumber.textContent = `$${(salaryPerSecond * 3600 * hours).toFixed(2)}`
            weeklyNumber.textContent = `$${(salaryPerSecond * 3600 * hours * days).toFixed(2)}`
            fortnightlyNumber.textContent = `$${(salaryPerSecond * 3600 * hours * days * 2).toFixed(2)}`
            monthlyNumber.textContent = `$${(salaryPerSecond * 3600 * hours * days * 4).toFixed(2)}`
        }, 1000)    
    }

    onoff.addEventListener('click', setOnOff)
    submit.addEventListener('click', countSalary)
    window.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            countSalary()
        };
    })


    if (scheme === null) {
        localStorage.setItem("scheme", "light")
        scheme = localStorage.getItem('scheme')
    }
})

