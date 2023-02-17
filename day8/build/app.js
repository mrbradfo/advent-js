"use strict";
//constant for api key
const API_KEY = "NFQZ0IVcHrzFsm1yAr7zG2qqHebLBUcB";
const CITY_CODE = "336877";
const CURRENT_TEMP_URL = `http://dataservice.accuweather.com/currentconditions/v1/${CITY_CODE}?apikey=${API_KEY}`;
const FORECAST_URL = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${CITY_CODE}?apikey=${API_KEY}`;
//select current class
const currentTempEl = document.querySelector(".temperature");
const daysOfWeekMap = {
    0: "SUN",
    1: "MON",
    2: "TUES",
    3: "WED",
    4: "THUR",
    5: "FRI",
    6: "SAT",
};
//array with multiple keys for one value
const weatherIcons = [
    {
        name: "cloudy",
        icons: ["cloudy", "mostly cloudy", "cloudy-windy", "fog", "dreary", "rain"],
        size: { width: 264, height: 166 },
    },
    {
        name: "sunny",
        icons: ["Sunny"],
        size: { width: 208, height: 213 },
    },
    {
        name: "stormy",
        icons: [
            "thunderstorm",
            "t-storms",
            "mostly cloudy w/ t-storms",
            "partly sunny w/ t-storms",
        ],
        size: { width: 246, height: 187 },
    },
    {
        name: "snowy",
        icons: ["snow", "snow-wind", "sleet", "flurries", "rain and snow"],
        size: { width: 230, height: 196 },
    },
    {
        name: "partly-cloudy",
        icons: [
            "mostly sunny",
            "partly sunny",
            "intermittent clouds",
            "hazy sunshine",
            "mostly cloudy",
        ],
        size: { width: 230, height: 209 },
    },
    {
        name: "rainy",
        icons: [
            "showers",
            "rain",
            "sleet",
            "mostly cloudy w/ showers",
            "partly sunny w/ showers",
        ],
        size: { width: 160, height: 222 },
    },
];
// function to get the weather data from accuweather api
async function getWeatherData() {
    const response = await fetch(FORECAST_URL);
    const data = await response.json();
    updateUI(data);
    return data;
}
function updateUI(forecastData) {
    //update day of week and date
    //select all the elements with the class name of day-of-week
    const dayOfWeekEls = document.querySelectorAll(".day");
    dayOfWeekEls.forEach((dayEl, index) => {
        const dayOfWeekEl = dayEl.querySelector(".day-of-week");
        const dateEl = dayEl.querySelector(".date");
        const barEl = dayEl.querySelector(".bar");
        const weatherIconEl = barEl.querySelector(".weather");
        const temp = barEl.querySelector(".temperature");
        const highEl = barEl.querySelector(".high");
        const lowEl = barEl.querySelector(".low");
        const precipitationEl = barEl.querySelector(".precipitation");
        //todo finish updating all elements
        const curDate = new Date(forecastData.DailyForecasts[index].Date);
        const dow = curDate.getDay();
        const dayOfWeek = daysOfWeekMap[dow];
        dayOfWeekEl.innerHTML = dayOfWeek;
        const date = curDate.getDate();
        dateEl.innerHTML = date.toString();
        const weatherText = forecastData.DailyForecasts[index].Day.IconPhrase.toLocaleLowerCase();
        const weatherIcon = weatherIcons.find((icon) => {
            if (icon.icons.includes(weatherText.toLowerCase())) {
                return icon.name;
            }
        });
        if (!weatherIcon) {
            throw new Error("Weather icon not found");
        }
        const width = weatherIcon.size.width;
        const height = weatherIcon.size.height;
        weatherIconEl.innerHTML = `<svg role="img"  width=${width} height=${height} viewBox="0 0 264 166">
                                  <use xlink:href="#${weatherIcon.name}"></use>
                                </svg>`;
        //add icon name to the bar div class list
        barEl.classList.add(weatherIcon.name);
        const high = forecastData.DailyForecasts[index].Temperature.Maximum.Value;
        highEl.innerHTML = `&uarr;${high.toString()}&deg;`;
        //if not today then set current temp to high
        if (index !== 0) {
            temp.innerHTML = `${high.toString()}<span class="degrees">&deg;</span>`;
        }
        const low = forecastData.DailyForecasts[index].Temperature.Minimum.Value;
        lowEl.innerHTML = `&darr;${low.toString()}&deg;`;
        let precipitation = forecastData.DailyForecasts[index].Day.PrecipitationIntensity;
        //if precipitation is undefined, set it to 0
        if (precipitation === undefined) {
            precipitation = "0";
        }
        precipitationEl.innerHTML = ` <svg role="img" class="icon"> <use xlink:href="#precipitation"></use> </svg> ${precipitation}%`;
    });
}
//function to get the weather icon
function getWeatherIcon(iconName) {
    return `https://openweathermap.org/img/wn/${iconName}.png`;
}
async function getCurrentTemp() {
    const response = await fetch(CURRENT_TEMP_URL);
    const data = await response.json();
    console.log("Current Temp: " + data[0].Temperature.Imperial.Value + "°F");
    return data[0].Temperature.Imperial.Value.toString();
}
function setCurrentTemp() {
    getCurrentTemp().then((temp) => {
        currentTempEl.innerHTML = `${temp}<span class="degrees">&deg;</span>`;
    });
}
getWeatherData().then((data) => updateUI(data));
getCurrentTemp();
setCurrentTemp();
