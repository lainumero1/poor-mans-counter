let filter = document.getElementById('filter')
let hours = document.getElementById('hours').value
let days = document.getElementById('days').value
let submit = document.getElementById('submit')
let increment = document.getElementById('increment')
let hourlyNumber = document.getElementById('hourly-number')
let dailyNumber = document.getElementById('daily-number')
let weeklyNumber = document.getElementById('weekly-number')
let fortnightlyNumber = document.getElementById('fortnightly-number')
let monthlyNumber = document.getElementById('monthly-number')

document.addEventListener("DOMContentLoaded", function() {
    let scheme = localStorage.getItem('scheme')
    let totalSalary = 0
    let salaryPerSecond = 0
    let interval = null
    function countSalary() {
        let startTime = document.getElementById('start-time').value
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
            if (startTime !== '') {
                let startTimeDate = new Date()
                let [startHours, startMinutes] = startTime.split(':').map(Number)
                startTimeDate.setHours(startHours, startMinutes, 0, 0)
                let currentTime = new Date()
                let timeDifference = (currentTime - startTimeDate) / 1000 // in seconds
                totalSalary = salaryPerSecond * timeDifference
            }
            else {
                totalSalary = 0
            }
            salaryPerSecond = 0
            increment.textContent = `$${totalSalary.toFixed(2)}`
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
        console.log(startTime)

        if (startTime !== '') {
            let startTimeDate = new Date()
            let [startHours, startMinutes] = startTime.split(':').map(Number)
            startTimeDate.setHours(startHours, startMinutes, 0, 0)
            let currentTime = new Date()
            let timeDifference = (currentTime - startTimeDate) / 1000 // in seconds
            totalSalary = salaryPerSecond * timeDifference
            console.log(startTimeDate)
            console.log(currentTime)
            console.log(timeDifference)
            console.log(salaryPerSecond)
            console.log(totalSalary)
        }
        else {
            totalSalary = 0
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

