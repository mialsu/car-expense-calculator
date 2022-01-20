const DataForm = () => {

    var maxYear = new Date().getFullYear();

    return(
        
        <form className = "submit-form">
            <div className = 'form-control'>
                <label>Ajoneuvotyyppi</label>
                <select id = 'vehicle-type'>
                    <option value='henkiloauto'>Henkilöauto</option>
                    <option value='pakettiauto'>Pakettiauto</option>
                </select>
            </div>
            <div className = 'form-control'>
                <label>Käyttönottovuosi</label>
                <input type='number' min='1970' max = {maxYear} step='1' placeholder='' />
            </div>
            <div className = 'form-control'>
                <label>Kokonaismassa</label>
                <input type='number' min='0' max = '3500' step='1' placeholder='kg' />
            </div>
            <div className = 'form-control'>
                <label>Käyttövoima</label>
                <select id = 'motor-power'>
                    <option value='gasoline'>Bensiini</option>
                    <option value='diesel'>Diesel</option>
                </select>
            </div>
            <div className = 'form-control'>
                <label>Ajoneuvon CO2 päästöt</label>
                <input type='number' min='0'step='1' placeholder='g/100km' />
            </div>
            <div className = 'form-control'>
                <label>Ajoneuvon keskikulutus</label>
                <input type='number' min='0' step='0.1' placeholder='l/100km' />
            </div>
            <div className = 'form-control'>
                <label>Vuosittaiset ajokilometrit</label>
                <input type='number' min='0' placeholder='km'/>
            </div>
            <div className = 'form-control'>
                <label>Vakuutuksen vuosimaksu</label>
                <input type='number' min='0' step='0.01' placeholder='€' />
            </div>
            <input type='button' value ='Laske kustannukset' />
        </form>
    )
}

export default DataForm