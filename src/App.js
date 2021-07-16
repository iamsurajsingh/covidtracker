import './App.css';
import React, { useEffect, useState } from 'react';
import InfoBox from './Components/InfoBox/InfoBox';
import Table from './Components/Table/Table';
import { sortData } from './Utility';
import { Card, CardContent, FormControl, Select, MenuItem } from '@material-ui/core';
import Linegraph from './Components/LineGraph/Linegraph';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      });
      // console.log('setCountryInfo::', setCountryInfo);
      }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso3,
            }
          ));

          const sortedData = sortData(data);
          //console.log(sortedData);
          setTableData(sortedData);
          setCountries(countries);
        
        });
    };

    getCountriesData();
  }, []);



  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    //console.log(countryCode);

    const url = countryCode === "worldwide" ?
      "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`

     await fetch(url)
      .then(response => response.json())
      .then(data => {
        //console.log("countryCode::", countryCode)
        //console.log("countryInfo::", countryInfo);
        setCountry(countryCode);
        setCountryInfo(data);
        
      });
  };



  return (
    <div className="App">
      <div className="app_left">
        {/* Header */}
          <div className="app_header">
            <h2>Covid-19 Tracker</h2>
            <FormControl className="country_dropdown">
              <Select variant="outlined" onChange ={onCountryChange} value={country} >
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map((country) => (

                  //console.log(country.value),
                  <MenuItem value={country.value}>{country.name}</MenuItem>

                ))};

              </Select>
            </FormControl>
          </div>
        {/* Cases Cards */}
        <div className="app_stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered Cases" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        {/* Map */}
      </div>

      <div className="app_right">
       <div className = "card1">
       <Card>
          <CardContent>
            <h3> Live Cases by Country</h3>
            <Table countries = {tableData} />
          </CardContent>
        </Card>
       </div>
        
        <div className = "card2">
        <Card>
          <CardContent>
            <h3> Worldwise new cases</h3>
            <Linegraph />
          </CardContent>
        </Card>
        </div>
        

        {/* Graph */}
      </div>
    </div>
  );
}

export default App;
