import React from "react";
import Axios from "axios";
import "./style.css"; 

class App extends React.Component{
    constructor(props){
        super(props);

        this.getCountryData = this.getCountryData.bind(this);
    }

    state = {
        Confirmed: 0,
        Recovered: 0,
        Deaths: 0,
        countries: []
    }
    componentDidMount(){
        this.getData();
    }    
 
    async getData(){
        const resApi = await Axios.get('https://api.covid19api.com/live/country/south-africa/status/confirmed/date/2020-03-21T13:13:30Z'); 
        const resCountries = await Axios.get('https://api.covid19api.com/countries'); 
       // const countries = Object.keys(resCountries.data[0]);
        const countries = resCountries.data.map( record => record.Country);
        const data = resApi.data[4]
        const value = resApi.data[6]
        const output = resApi.data[5]
        this.setState({
            Confirmed: data.Confirmed,
            Recovered: value.Recovered,
            Deaths: output.Deaths,
            countries     
        });
    }

    async getCountryData(e){
        try{
            const res = await Axios.get(`https://api.covid19api.com/live/country/${e.target.value}`);
            const data = res.data[4]
            const value = res.data[6]
            const output = res.data[5]
            this.setState({
                Confirmed: data.Confirmed,
                Recovered: value.Recovered,
                Deaths:output.Deaths
        });
        }
        catch(err){
            this.setState({
                Confirmed: 'No data availabele',
                Recovered: 'No data availabele',
                Deaths: 'No data availabele'
        });
        }
    }

    renderCountryOptions(){
        return this.state.countries.map((country, i ) => {
        return <option key={i}>{country}</option>
        });
    }

    render(){
        return(
            <div className="container">
                <h1>Corona Update</h1>

                <select className="dropdown" onChange={this.getCountryData}>
                    <option>Worldwide</option>
                    {this.renderCountryOptions()}
                </select>

                <div className="flex">
                    <div className="box confirmed">
                        <h3>Confirmed Cases</h3>
                        <h4>{this.state.Confirmed}</h4>
                    </div>
                    <div className="box recovered">
                        <h3>Recovered Cases</h3>
                        <h4>{this.state.Recovered}</h4>
                    </div>
                    <div className="box deaths">
                        <h3>Deaths</h3>    
                        <h4>{this.state.Deaths}</h4>
                    </div>
                </div>
            </div>
        );
    }
}


export default App;