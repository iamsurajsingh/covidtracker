import './App.css';
import React, { useEffect, useState } from 'react';
import InfoBox from './Components/InfoBox/InfoBox';
import Table from './Components/Table/Table';
import { sortData, prettyPrintStat } from './Utility';
import { Card, CardContent, FormControl, Select, MenuItem } from '@material-ui/core';
import Linegraph from './Components/LineGraph/Linegraph';
import Maps from './Components/Maps/Maps';
import "../node_modules/leaflet/dist/leaflet.css";
import numeral from 'numeral';


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [map, setMap] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      });

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

          setTableData(sortedData);
          setMapCountries(data);
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
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {

        setCountry(countryCode);
        setCountryInfo(data);
        // setMap([data.countryInfo.lat, data.countryInfo.long]);

        if (countryCode === "worldwide") {

          setMap({ lat: 34.80746, lng: -40.4796 });
          setMapZoom(3);

        }

        else {
          setMap([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
        }

      });

  };



  return (
    <div className="App">
      <div className="app_left">
        {/* Header */}
        <div className="app_header">
          <h2>Covid-19 Tracker</h2>
          <FormControl className="country_dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country} >
              <MenuItem value="worldwide">Worldwide</MenuItem>

              {countries.map((country, i) => (
                <MenuItem key={i} value={country.value}>{country.name}</MenuItem>
              ))};


            </Select>
          </FormControl>
        </div>
        {/* Cases Cards */}
        <div className="app_stats">
          <InfoBox title="Cases"
            active = {casesType === 'cases'}
            isRed
            onClick={(e) => setCasesType("cases")}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBox title="Recovered"
            onClick={(e) => setCasesType("recovered")}
            active = {casesType === 'recovered'}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total = {numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBox title="Deaths"
            onClick={(e) => setCasesType("deaths")}
            active = {casesType === 'deaths'}
            isRed
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </div>

        {/* Map */}

        <Maps countries={mapCountries} casesType={casesType} center={map} zoom={mapZoom} />
      </div>

      <div className="app_right">
        <div className="card1">
          <Card>
            <CardContent>
              <h3> Total Cases by Country</h3>
              <Table countries={tableData} />
            </CardContent>
          </Card>
        </div>

        <div className="card2">
          <Card>
            <CardContent>
              <h3> Worldwide New {casesType}</h3>
              <Linegraph casesType={casesType} />
            </CardContent>
          </Card>
        </div>


        {/* Graph */}
      </div>
    </div>
  );
}

export default App;
