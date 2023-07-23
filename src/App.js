import React, { useEffect, useState } from "react";

function App() {
  const api = {
    key: "44df51f40318c861bac7f73939f8787b",
    base: "https://api.openweathermap.org/data/2.5/",
  };
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }, [lat, long]);
  const search = async (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const getLocation = async () => {
    await fetch(
      `${api.base}weather/?lat=${lat}&lon=${long}&units=metric&APPID=${api.key}`
    )
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
        console.log(result);
      });
  };

  return (
    <div>
      <input
        type="search.."
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={search}
      />
      <button onClick={getLocation}>Add you location automatically</button>
    </div>
  );
}

export default App;
