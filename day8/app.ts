//constant for api key
const API_KEY = "NFQZ0IVcHrzFsm1yAr7zG2qqHebLBUcB";
const CITY_CODE = "336877"; //Tempe
const CURRENT_TEMP_URL = `http://dataservice.accuweather.com/currentconditions/v1/${CITY_CODE}?apikey=${API_KEY}`;
const FIVE_DAY_FORECAST_URL = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${CITY_CODE}?apikey=${API_KEY}`;

//select temperature class
const currentTempEl = document.querySelector(".temperature") as HTMLDivElement;

//type definition for current temperature
type CurrentTemp = [
  {
    Temperature: {
      Metric: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
      Imperial: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
    };
  }
];

//type definition for Accuweather API response
type WeatherData = {
  Date: string;
  EpochDate: number;
  Temperature: {
    Minimum: {
      Unit: string;
      Value: number;
    };
    Maximum: {
      Unit: string;
      Value: number;
    };
  };
  Day: {
    HasPrecipitation: boolean;
    PrecipitationType: string;
    PrecipitationIntensity: string;
    Icon: number;
    IconPhrase: string;
  };
  Night: {
    HasPrecipitation: boolean;
    PrecipitationType: string;
    PrecipitationIntensity: string;
    Icon: number;
    IconPhrase: string;
  };
  Sources: Array<string>;
  MobileLink: string;
  Link: string;
};

type ForecastData = {
  DailyForecasts: WeatherData[];
};

type DaysOfWeekMap = {
  [key: string]: string;
};

const daysOfWeekMap: DaysOfWeekMap = {
  0: "SUN",
  1: "MON",
  2: "TUES",
  3: "WED",
  4: "THUR",
  5: "FRI",
  6: "SAT",
};

type IconNameToSizeMap = {
  name: string;
  icons: Array<string>;
  size: {
    width: number;
    height: number;
  };
};

//array with multiple keys for one value
const weatherIcons: IconNameToSizeMap[] = [
  {
    name: "cloudy",
    icons: ["cloudy", "mostly cloudy", "cloudy-windy", "fog", "dreary", "rain", "windy"],
    size: { width: 264, height: 166 },
  },
  {
    name: "sunny",
    icons: ["Sunny"],
    size: { width: 208, height: 213 },
  },
  {
    name: "stormy",
    icons: ["thunderstorm", "t-storms", "mostly cloudy w/ t-storms", "partly sunny w/ t-storms"],
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
    icons: ["showers", "rain", "sleet", "mostly cloudy w/ showers", "partly sunny w/ showers"],
    size: { width: 160, height: 222 },
  },
];

// get the weather data from accuweather api
async function getWeatherData(): Promise<ForecastData> {
  const response = await fetch(FIVE_DAY_FORECAST_URL);
  const data: ForecastData = await response.json();

  updateUI(data);

  return data;
}

function updateUI(forecastData: ForecastData) {
  //select all the elements with the class name of day-of-week
  const dayOfWeekEls = document.querySelectorAll(".day");

  //loop through and update each day
  dayOfWeekEls.forEach((dayEl, index) => {
    const dayOfWeekEl = dayEl.querySelector(".day-of-week") as HTMLDivElement;
    const dateEl = dayEl.querySelector(".date") as HTMLDivElement;
    const barEl = dayEl.querySelector(".bar") as HTMLDivElement;
    const weatherIconEl = barEl.querySelector(".weather") as HTMLDivElement;
    const temp = barEl.querySelector(".temperature") as HTMLDivElement;
    const description = barEl.querySelector(".description") as HTMLDivElement;
    const highEl = barEl.querySelector(".high") as HTMLDivElement;
    const lowEl = barEl.querySelector(".low") as HTMLDivElement;
    const precipitationEl = barEl.querySelector(".precipitation") as HTMLDivElement;

    // forecast data for the current day
    const curDayForecast = forecastData.DailyForecasts[index];

    // link to accuweather will open in a new tab
    dayEl.setAttribute("href", curDayForecast.Link);
    dayEl.setAttribute("target", "_blank");
    // prevent tab nabbing
    dayEl.setAttribute("rel", "noopener noreferrer");

    // set the day of the week for the current day
    const curDate = new Date(curDayForecast.Date);
    const dow = curDate.getDay();
    const dayOfWeek = daysOfWeekMap[dow];
    dayOfWeekEl.innerHTML = dayOfWeek;

    // set the date for the current day
    const date = curDate.getDate();
    dateEl.innerHTML = date.toString();

    // map the weather phrase to the correct icon
    const dayWeatherPhrase = curDayForecast.Day.IconPhrase.toLocaleLowerCase();
    const weatherIcon = weatherIcons.find((icon) => {
      if (icon.icons.includes(dayWeatherPhrase.toLowerCase())) {
        return icon.name;
      }
    });

    // if no icon found throw an error
    if (!weatherIcon) {
      throw new Error("Weather icon not found");
    }

    const width = weatherIcon.size.width;
    const height = weatherIcon.size.height;
    weatherIconEl.innerHTML = `<svg role="img"  width=${width} height=${height} viewBox="0 0 264 166">
                                  <use xlink:href="#${weatherIcon.name}"></use>
                                </svg>`;

    // add icon name to the bar div class list to it is styled correctly
    barEl.classList.add(weatherIcon.name);

    // set weather description
    description.innerHTML = dayWeatherPhrase;

    // set high and low temperatures
    const high = curDayForecast.Temperature.Maximum.Value;
    highEl.innerHTML = `&uarr;${high.toString()}&deg;`;

    // if not today then set current temp to high
    if (index !== 0) {
      temp.innerHTML = `${high.toString()}<span class="degrees">&deg;</span>`;
    }

    const low = curDayForecast.Temperature.Minimum.Value;
    lowEl.innerHTML = `&darr;${low.toString()}&deg;`;

    //set precipitation
    let precipitation = curDayForecast.Day.PrecipitationIntensity;
    if (precipitation === undefined) {
      precipitation = "None";
    }
    precipitationEl.innerHTML = ` <svg role="img" class="icon"> <use xlink:href="#precipitation"></use> </svg> ${precipitation}`;
  });
}

async function getCurrentTemp(): Promise<string> {
  const response = await fetch(CURRENT_TEMP_URL);
  const data: CurrentTemp = await response.json();
  return data[0].Temperature.Imperial.Value.toString();
}

function setCurrentTemp() {
  getCurrentTemp().then((temp) => {
    currentTempEl.innerHTML = `${temp}<span class="degrees">&deg;</span>`;
  });
}

getWeatherData().then((data) => updateUI(data));

setCurrentTemp();
