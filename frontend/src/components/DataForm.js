
const DataForm = () => {

    var maxYear = new Date().getFullYear();

    return(
        
        <form className = "submit-form" action="#" method = "post">
            <div className = 'form-control'>
                <label>Ajoneuvotyyppi</label>
                <select id = 'vehicle-type' name = 'vehicle-type'>
                    <option value='henkiloauto'>Henkilöauto</option>
                    <option value='pakettiauto'>Pakettiauto</option>
                </select>
            </div>
            <div className = 'form-control'>
                <label>Käyttönottovuosi</label>
                <input type='number' min='1970' max = {maxYear} step='1' placeholder='' name = 'year-registered'/>
            </div>
            <div className = 'form-control'>
                <label>Kokonaismassa</label>
                <input type='number' min='0' max = '3500' step='1' placeholder='kg' name = 'mass'/>
            </div>
            <div className = 'form-control'>
                <label>Käyttövoima</label>
                <select id = 'motor-power' name = 'motor-power'>
                    <option value='gasoline'>Bensiini</option>
                    <option value='diesel'>Diesel</option>
                </select>
            </div>
            <div className = 'form-control'>
                <label>Ajoneuvon CO2 päästöt</label>
                <input type='number' min='0'step='1' placeholder='g/100km' name = 'emissions'/>
            </div>
            <div className = 'form-control'>
                <label>Ajoneuvon keskikulutus</label>
                <input type='number' min='0' step='0.1' placeholder='l/100km' name = 'consumption'/>
            </div>
            <div className = 'form-control'>
                <label>Vuosittaiset ajokilometrit</label>
                <input type='number' min='0' placeholder='km' name = 'yearly-kilometers'/>
            </div>
            <div className = 'form-control'>
                <label>Vakuutuksen vuosimaksu</label>
                <input type='number' min='0' step='0.01' placeholder='€' name = 'yearly-insurance'/>
            </div>
            <input type='button' value ='Laske kustannukset' />
        </form>
    )
}

export default DataForm