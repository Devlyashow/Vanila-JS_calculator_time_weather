
const clockDisplay = document.querySelector('.clock_display')
const dateDisplay = document.querySelector('.date_display')


setInterval(function () {
    const date = new Date()
    const day = date.getDay()
    console.log('day', day);
    
    if (day === 0) {
    dateDisplay.innerHTML = `Воскресенье ${date.toLocaleDateString()}`
    }
    if (day === 1) {
    dateDisplay.innerHTML = `Понедельник ${date.toLocaleDateString()}`
    }
    if (day === 2) {
    dateDisplay.innerHTML = `Вторник ${date.toLocaleDateString()}`
    }
    if (day === 3) {
    dateDisplay.innerHTML = `Среда ${date.toLocaleDateString()}`
    }
    if (day === 4) {
    dateDisplay.innerHTML = `Четверг ${date.toLocaleDateString()}`
    }
    if (day === 5) {
    dateDisplay.innerHTML = `Пятница ${date.toLocaleDateString()}`
    }
    if (day === 6) {
    dateDisplay.innerHTML = `Суббота ${date.toLocaleDateString()}`
    }
    clockDisplay.innerHTML = date.toLocaleTimeString()
}, 1000)

