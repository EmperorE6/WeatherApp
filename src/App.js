import React from 'react';
import './App.css';
import { useState } from 'react';
import mnoguOblacno from "./LotCloudy.png";
import poluOblacno from "./partly-cloudy.png";
import soncevoSlika from "./sun.png";


function App() {

 const [city,setCity]=useState("");
 const [ime,setIme]=useState("");
 const [oblak,setOblak]=useState();
 const[temp,setTemp]=useState("");
 const[opis,setOpis]=useState("");
const [drzava,setDrzava]=useState("");
const [wind,setWind]=useState("");

 const HandleCitySearch = async (e) => {
  const cityName = e.target.value;
  setCity(cityName); 
    const API_KEY = "21b17ce1518a5be6b1097495053cb5eb";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);
      const data = await response.json();
      setOblak("");
      setIme("");
      setTemp("");
      setOpis("");
      setDrzava("");
      setWind("");
   if (data.clouds && data.name ) {
    setOblak(data.clouds.all);
    setIme(data.name);
    setTemp(Math.floor(data.main.temp-273.15)+"°C");
    setOpis(data.weather[0].description);
    setDrzava(data.sys.country);
    setWind("Wind speed is: "+ data.wind.speed + " mph");
   }
console.log(data);
};
const currentDate = new Date().toDateString();

  return (
    <div className="container">
      <div className="vnes">
      <input type="text" placeholder='Please enter the city name..' value={city} onChange={HandleCitySearch}></input>
      </div>
      <div className='info'>
      <h2>{currentDate}</h2>
        <h2>{ime} <span>{drzava}</span></h2>
        <h2>{temp}</h2>
        <div className='slikata'>
        {city.toLowerCase() !== ime.toLowerCase() || city === "" ? (
  <img src="" alt="" />
) : oblak > 80 ? (
  <img src={mnoguOblacno} alt="verryCloudy" />
) : oblak > 30 ? (
  <img src={poluOblacno} alt="cloudy" />
) : (
  <img src={soncevoSlika} alt="Sunny" />
)}
        </div>
        <div className="opis"><h3>{opis}</h3></div>
        <div className='sun'>
          <h3>{wind}</h3>
        </div>
      </div>
        

    </div>
  );
  
}

export default App;