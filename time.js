const clockDisplay = document.querySelector('.clock_display')
const dateDisplay = document.querySelector('.date_display')
const days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
]

setInterval(function () {
    const date = new Date()
    const day = date.getDay()
    dateDisplay.innerHTML = `${days[day]} ${date.toLocaleDateString()}`
    clockDisplay.innerHTML = date.toLocaleTimeString()
}, 1000)

