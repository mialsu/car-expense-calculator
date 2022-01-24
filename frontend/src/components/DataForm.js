import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'

class DataForm extends React.Component {

    constructor() {
        super();
        this.state = {yearly: 0, monthly: 0};
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const api_url = 'http://127.0.0.1:8000/api/calculate/'

        axios.post(api_url, form)
        .then(response => this.setState({'yearly':response.data.yearly, 'monthly':response.data.monthly}))
        .catch(err => console.error(err));

    }

    render() {

        var maxYear = new Date().getFullYear();

        return (
            <div>
                <Form className="submit-form" onSubmit={this.handleSubmit}>
                    <div className='form-control'>
                        <label htmlFor='vehicle-type'>Ajoneuvotyyppi: </label>
                        <select name='vehicle-type'>
                            <option value='henkiloauto'>Henkilöauto</option>
                            <option value='pakettiauto'>Pakettiauto</option>
                        </select>
                    </div>
                    <div className='form-control'>
                        <label>Käyttönottovuosi: </label>
                        <input type='number' min='1970' max={maxYear} step='1' name='year-registered' required/>
                    </div>
                    <div className='form-control'>
                        <label>Kokonaismassa (kg): </label>
                        <input type='number' min='0' max='3500' step='1' name='mass' required/>
                    </div>
                    <div className='form-control'>
                        <label>Käyttövoima: </label>
                        <select name='motor-power'>
                            <option value='gasoline'>Bensiini</option>
                            <option value='diesel'>Diesel</option>
                        </select>
                    </div>
                    <div className='form-control'>
                        <label>Ajoneuvon CO2 päästöt (g/km): </label>
                        <input type='number' min='0' step='1' name='emissions' required/>
                    </div>
                    <div className='form-control'>
                        <label>Ajoneuvon keskikulutus (l/100km): </label>
                        <input type='number' min='0' step='0.1' name='consumption' defaultValue={0}/>
                    </div>
                    <div className='form-control'>
                        <label>Vuosittaiset ajokilometrit (km): </label>
                        <input type='number' min='0' name='yearly-kilometers' defaultValue={0}/>
                    </div>
                    <div className='form-control'>
                        <label>Polttoaineen litrahinta (€/l): </label>
                        <input type='number' min='0' step='0.001' name='fuel-price' defaultValue={0}/>
                    </div>
                    <div className='form-control'>
                        <label>Vakuutuksen vuosimaksu: </label>
                        <input type='number' min='0' step='0.01' name='yearly-insurance' defaultValue={0}/>
                    </div>
                    <Button variant = 'primary' type = 'submit'>Laske kustannukset</Button>
                </Form>

                <div className='results'>
                    <h3>Tulokset</h3>
                    <p>Vuodessa: {this.state.yearly} €</p>
                    <p>Kuukaudessa: {this.state.monthly} €</p>
                </div>
            </div>
        );
    }
}

export default DataForm