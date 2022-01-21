import React from 'react'

function stringifyFormData(fd) {
    /*Function to stringify form data*/
    const data = {};
    for (let key of fd.keys()) {
        data[key] = fd.get(key);
    }
    return JSON.stringify(data, null, 2);
}

class DataForm extends React.Component {

    constructor() {
        super();
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        this.setState({
            res: stringifyFormData(data),
        });

        fetch('/api/form-submit-url', {
            method: 'POST',
            body: data,
          });
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
                        <label>Vakuutuksen vuosimaksu</label>
                        <input type='number' min='0' step='0.01' placeholder='€' name='yearly-insurance' />
                    </div>
                    <button>Laske kustannukset</button>
                </form>
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