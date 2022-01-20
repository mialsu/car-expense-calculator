const DataForm = () => {
    return(
        <form className = "submit-form">
            <div className = 'form-control'>
                <label>Ajoneuvotyyppi</label>
                <select id = 'vehicle-type'>
                    <option value='henkiloauto' selected>Henkilöauto</option>
                    <option value='pakettiauto'>Pakettiauto</option>
                </select>
            </div>
            <div className = 'form-control'>
                <label>Käyttövoima</label>
                <select id = 'motor-power'>
                    <option value='gasoline' selected>Bensiini</option>
                    <option value='diesel'>Diesel</option>>
                </select>
            </div>
            <div className = 'form-control'>
                <label>Ajoneuvon CO2 päästöt</label>
                <input type='number' min='0'step='1' placeholder='Syötä ajoneuvon CO2 päästöt' />
            </div>
            <div className = 'form-control'>
                <label>Ajoneuvon keskikulutus</label>
                <input type='number' min='0' step='0.1' placeholder='Syötä ajoneuvon keskikulutus' />
            </div>
            <div className = 'form-control'>
                <label>Vuosittaiset ajokilometrit</label>
                <input type='number' min='0' placeholder='Syötä vuosittaiset ajokilometrit' />
            </div>
            <div className = 'form-control'>
                <label>Vakuutuksen vuosimaksu</label>
                <input type='number' min='0' placeholder='Syötä ajoneuvovakuutuksen vuosimaksu' />
            </div>
            <input type='button' value ='Laske kustannukset' />
        </form>
    )
}

export default DataForm