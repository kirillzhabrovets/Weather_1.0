import { useEffect } from 'react';
import autumn from './assets/autumn.jpg';
import spring from './assets/spring.jpg';
import summer from './assets/summer.jpg';
import winter from './assets/winter.jpg'
import Descriptions from './components/descriptions';
import { getFormattedWeatherData } from './weatherService';
import { useState } from 'react';

function App() {
  const [city, setCity] = useState ("Moscow");
  const [weather, setWeather] = useState (null);
  const [units, setUnits] = useState ("metric");
  const [bg, setBg] = useState (spring)

  useEffect(()=>{
    const fetchWeatherData = async () => {
    const data = await getFormattedWeatherData(city, units);
    setWeather(data);

    //динамичный Задний Фон

    const threshold = units === 'metric' ? 5 : 60;
    if (data.temp <= threshold) setBg (autumn);
    else setBg(spring);
  };

  fetchWeatherData();
}, [units, city]);

  const handleUnitsClick = (e) => {
      const button = e.currentTarget;
      const currentUnit = button.innerText.slice(1);
      
      const isCelsius = currentUnit === "C";
      button.innerText = isCelsius ? '°F' : '°C'
      setUnits(isCelsius ? 'metric' : 'imperial');
  }


  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  }

  return (
    <div className='app' style={{backgroundImage: `url(${bg})`}}>
      <div className="overlay">
        {
          weather && (
          <div className="container">
            <div className="section section_inputs">
            <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder='Введите город...'/>
            <button onClick={(e) => handleUnitsClick(e)}>°C</button>
            </div>

            <div className="section section_temperature">
            <div className='icon'>
              <h3>{`${weather.name}, ${weather.country}`}</h3>
              <img src={weather.iconURL} alt="weatherIcon" />
              <h3>{weather.description}</h3>
            </div>

            <div className="temperature">
              <h1>
                {`${weather.temp.toFixed()}°${units === 'metric' ? 'C' : 'F'}`}
              </h1>
            </div>
          </div>

          {/* bottom description */}
          <Descriptions weather={weather} units={units}/>
        </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
