import React from 'react'

function stringifyFormData(fd) {
    /*Function to convert form data to JSON*/
    const data = {};
    for (let key of fd.keys()) {
        data[key] = fd.get(key);
    }
    return JSON.stringify(data, null, 2);
}

class DataForm extends React.Component {

    constructor() {
        super();
        this.state = {'yearly': 0, 'monthly': 0};
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        const axios = require('axios');
        const FormData = require('form-data');

        event.preventDefault();
        const form = new FormData(event.target);
        const api_url = 'http://127.0.0.1:8000/api/calculate/'

        axios.post(api_url, form)
        .then(response => this.setState({'yearly':response.data.yearly, 'monthly':response.data.monthly}));

    }

    render() {

        var maxYear = new Date().getFullYear();

        return (
            <div>
                <form className="submit-form" onSubmit={this.handleSubmit}>
                    <div className='form-control'>
                        <label htmlFor='vehicle-type'>Ajoneuvotyyppi</label>
                        <select name='vehicle-type'>
                            <option value='henkiloauto'>Henkilöauto</option>
                            <option value='pakettiauto'>Pakettiauto</option>
                        </select>
                    </div>
                    <div className='form-control'>
                        <label>Käyttönottovuosi</label>
                        <input type='number' min='1970' max={maxYear} step='1' placeholder='' name='year-registered' />
                    </div>
                    <div className='form-control'>
                        <label>Kokonaismassa</label>
                        <input type='number' min='0' max='3500' step='1' placeholder='kg' name='mass' />
                    </div>
                    <div className='form-control'>
                        <label>Käyttövoima</label>
                        <select name='motor-power'>
                            <option value='gasoline'>Bensiini</option>
                            <option value='diesel'>Diesel</option>
                        </select>
                    </div>
                    <div className='form-control'>
                        <label>Ajoneuvon CO2 päästöt</label>
                        <input type='number' min='0' step='1' placeholder='g/100km' name='emissions' />
                    </div>
                    <div className='form-control'>
                        <label>Ajoneuvon keskikulutus</label>
                        <input type='number' min='0' step='0.1' placeholder='l/100km' name='consumption' />
                    </div>
                    <div className='form-control'>
                        <label>Vuosittaiset ajokilometrit</label>
                        <input type='number' min='0' placeholder='km' name='yearly-kilometers' />
                    </div>
                    <div className='form-control'>
                        <label>Polttoaineen litrahinta</label>
                        <input type='number' min='0' step='0.001' placeholder='€/l' name='fuel-price' />
                    </div>
                    <div className='form-control'>
                        <label>Vakuutuksen vuosimaksu</label>
                        <input type='number' min='0' step='0.01' placeholder='€' name='yearly-insurance' />
                    </div>
                    <button>Laske kustannukset</button>
                </form>

                <div className='results'>
                    <h2>Tulokset</h2>
                    <p>Vuodessa: {this.state.yearly} €</p>
                    <p>Kuukaudessa: {this.state.monthly} €</p>
                </div>

                {this.state.res && (
                    <div className="res-block">
                        <h3>Data to be sent:</h3>
                        <pre>FormData {this.state.res}</pre>
                    </div>
                )}
            </div>
        );
    }
}

export default DataForm