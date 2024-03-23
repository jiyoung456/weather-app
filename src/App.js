import logo from "./logo.svg";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";

import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";

// 1. 앱이 실행되자마다 현재 위치 기반의 날씨가 보인다
// 2. 도시, 섭씨, 화씨, 날씨 상태가 보인다
// 3. 5개의 버튼이 있다(현재위치와 4개의 다른 도시)
// 4. 도시 버튼을 클릭할 때마다 도시별 날씨가 나온다
// 5. 현재위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 나온다
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다
function App() {
  const [weather, setWeather]=useState(null);

  const getCurrentLocation=() => {
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      getWeatherByCurrentLocation(lat, lon)
    });
  }

  const getWeatherByCurrentLocation = async(lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0a27d63393c0cdac2761b8ec5eacd616&units=metric`
    let response = await fetch(url)
    let data = await response.json();
    setWeather(data);
  }

  useEffect(()=>{
    getCurrentLocation()
  }, [])
  return <div>
    <div className="container">
    <WeatherBox weather={weather}/>
    <WeatherButton/>
    </div>
  </div>;
}

export default App;
