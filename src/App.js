import './App.css';
import { useState, useEffect } from "react"

/* 
Create a simple react application that displays a list of countries and their capitals
(AKA Api with 2 values)
Fetch this data
display in countries page
Each country should be displayed in a separate component
User should be able to filter the list by the capital
To filter by capital city, use /capital/(capital) endpoint
*/

// End point for all countries: /all
// Endpoint for all capitals: /capital/{capital}
// Base endpoint: https://restcountries.com/v3.1
// Filterable capitals: "tallinn", "Helnsinki", "Stockholm", "Oslo", "Copenhagen", "Reykjavik"


function App() {
  return (
    <div className="App">
      Main App
      <AllCountries />
    </div>
  );
}

export default App;

function AllCountries() {

  const [countries, setCountries] = useState([])

  const [filtered, setFiltered] = useState([])

  const [filter, setFilter] = useState("")

  const filterable = [
    "tallinn",
    "Helnsinki",
    "Stockholm",
    "Oslo",
    "Copenhagen",
    "Reykjavik"
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        const data = await res.json();
        setCountries(data);
        setFiltered(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFiltered(countries.filter(filter1))
  }, [filter]);

  function filter1(country) {
      if (country.capital === undefined) {
        return false
      } else if (country.capital[0] === filter){
        return true
      }
      else {
        return false
      }
  }

  function handleChange(capital) {
    if (capital === filter) {
      setFiltered(countries)
      return
    }
    setFilter(capital)
  }

  return (
    <div>
      <h1>
        ALL COUNTRIES
      </h1>
      {filtered.map((country, index) => (
        <span key={index}>{country.name.common}</span>
      ))}
      <div className="filter">
        <button onClick={() => handleChange("Tallinn")}>Tallin</button>
        <button onClick={() => handleChange("Helsinki")}>Helnsinki</button>
        <button onClick={() => handleChange("Stockholm")}>Stockholm</button>
        <button onClick={() => handleChange("Oslo")}>Oslo</button>
        <button onClick={() => handleChange("Copenhagen")}>Copenhagen</button>
        <button onClick={() => handleChange("Reykjavik")}>Reykjavik</button>
      </div>
      FILTER:
      {filter}
    </div>
  )
}


