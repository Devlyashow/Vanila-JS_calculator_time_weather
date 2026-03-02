
const fetchWeatherData = async () => {
    const apiKey = 'QPCWKJ8ZXH4TFJD2W6WQQCU73'; // API из www.visualcrossing.com
    const location = '57.152985,65.541224'; // Локация - Тюмень
    const unitGroup = 'metric'; 
    const startDate = new Date().toISOString().split('T')[0]; // Формат даты YYYY-MM-DD
    const contentType = 'json';
    const weatherIcon = document.querySelector('.weather_icon') // Иконка погоды
    const weatherDisplay = document.querySelector('.weather_display') // Экран температуры
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}?unitGroup=${unitGroup}&key=${apiKey}&contentType=${contentType}`; 

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const weatherData = await response.json();
        const temp = weatherData.days[0].temp; 
        const iconName = weatherData.days[0].icon; 
        const iconUrl = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/3rd%20Set%20-%20Color/${iconName}.png`
        weatherIcon.src = iconUrl
        weatherDisplay.innerHTML = temp
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
    }
};

fetchWeatherData()
// Обновлять каждые 10 минут
setInterval(()=>{
fetchWeatherData()
}, 600000)


