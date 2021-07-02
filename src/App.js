import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent } from "@material-ui/core";
import { useState, useEffect } from 'react';
import InfoBox from './components/InfoBox';
import Table from './components/Table';
import covid from "./img/coronavirus.png";

function App() {
  const [Countries, setCountries] = useState([])
  const [Country, setCountry] = useState([])
  const [countryInfo, setcountryInfo] = useState({})
  const [TableData, setTableData] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => { // in this we will get the array of countries with some objects coming from map function  
          const Countries = data.map((country) => ({
            name: country.country,//map funtion here is providing the data in the form of objects
            value: country.countryInfo.iso2,
            flag: country.countryInfo.flag
          }));
          setCountries(Countries); //setting the value of the country
          setTableData(data);
        });
    }
    getCountriesData();//calling the  async function
  }, []);

  // to show the default content ie GLOBAL DATA---------first condition of URL if condition
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) => {
        setcountryInfo(data);
      })
  }, [])

  // updating data when country changes
  const onCountryChange = async (e) => {
    const CountryCode = e.target.value;
    // console.log('heyy', CountryCode)
    const url = CountryCode === ' '
      ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${CountryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(CountryCode);
        setcountryInfo(data);
      });
  };
  // console.log('country info',countryInfo)
  return (
    <div className="app">
      <marquee direction='right'>
        <ul className='precaution_banner'>
          <li>stay safe</li>
          <li>wear mask</li>
          <li>maintain social distance</li>
          <li>get vaccinated</li>
        </ul>
      </marquee>
      <div className="allInformations">
        {/* // page header */}
        <div className="header">
          <h1>C <img src={covid} alt="o" /> vid-19 Tracker</h1>
        </div>

        {/* info-boxes */}
        <div className='InfoBox-container'>
          <InfoBox
            title='infected'
            cases={countryInfo.todayCases}
            total={countryInfo.cases} />
          <InfoBox
            title='recovered'
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered} />
          <InfoBox
            title='deaths'
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths} />
        </div>


        {/*  // country-selector */}
        <div className="main-selector">
          <FormControl className='country-dropdown'>
            <Select style={{textAlign:'center'}} variant='standard' onChange={onCountryChange} value={Country}>
              {
                Countries.map((country) =>
                  <MenuItem  value={country.value}>{country.name} <img src={country.flag} alt="" style={{ width: '20px',marginLeft:'15px' }} /></MenuItem>
                )
              }
            </Select>
            {/* center image */}
            
          </FormControl>
        </div>

        {/* country wise data */}
        <div className="rightcard-countries">
          <Card>
            <CardContent>
              <h4>Countrywise Data</h4> <br />
              {/* TABLE */}
              <Table countries={TableData} />
            </CardContent>
          </Card>
        </div>


      </div>
    </div>
  );
}

export default App;
