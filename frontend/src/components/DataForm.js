import React from 'react'
import { Container, Button, Form, FormGroup, Card } from 'react-bootstrap'
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

        const maxYear = new Date().getFullYear();

        return (
            <Container fluid='md'>
                <Form className="submit-form" onSubmit={this.handleSubmit}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Ajoneuvotyyppi</Form.Label>
                        <Form.Select name='vehicle-type'>
                            <option value='henkiloauto'>Henkilöauto</option>
                            <option value='pakettiauto'>Pakettiauto</option>
                        </Form.Select>
                        <Form.Text className="text-muted">
                            Valitse ajoneuvon tyyppi
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Käyttönottovuosi</Form.Label>
                        <Form.Control type='number' min='1970' max={maxYear} step='1' name='year-registered' required/>
                        <Form.Text className="text-muted">
                            Syötä ajoneuvon käyttöönottovuosi
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Kokonaismassa</Form.Label>
                        <Form.Control type='number' min='0' max='3500' step='1' name='mass' required/>
                        <Form.Text className="text-muted">
                            Syötä ajoneuvon suurin sallittu kokonaismassa (kg)
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Käyttövoima</Form.Label>
                        <Form.Select name='motor-power'>
                            <option value='gasoline'>Bensiini</option>
                            <option value='diesel'>Diesel</option>
                        </Form.Select>
                        <Form.Text className="text-muted">
                            Valitse ajoneuvon käyttövoima
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Ajoneuvon CO2 päästöt</Form.Label>
                        <Form.Control type='number' min='0' step='1' name='emissions' required/>
                        <Form.Text className="text-muted">
                            Syötä ajoneuvon CO2-päästöt (g/km)
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Ajoneuvon yhdistetty kulutus</Form.Label>
                        <Form.Control type='number' min='0' step='0.1' name='consumption' defaultValue={0}/>
                        <Form.Text className="text-muted">
                            Syötä ajoneuvon yhdistetty kulutus litroina (valinnainen)
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Vuosittaiset ajokilometrit</Form.Label>
                        <Form.Control type='number' min='0' name='yearly-kilometers' defaultValue={0}/>
                        <Form.Text className="text-muted">
                            Syötä vuosittaiset ajokilometrit (valinnainen)
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Polttoaineen litrahinta</Form.Label>
                        <Form.Control type='number' min='0' step='0.001' name='fuel-price' defaultValue={0}/>
                        <Form.Text className="text-muted">
                            Syötä polttoaineen litrahinta (valinnainen)
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Vakuutuksen vuosimaksu: </Form.Label>
                        <Form.Control type='number' min='0' step='0.01' name='yearly-insurance' defaultValue={0}/>
                        <Form.Text className="text-muted">
                            Syötä ajoneuvovakuutuksen vuosimaksu (valinnainen)
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className='d-grid gap-2'>
                        <Button variant = 'success' type = 'submit'>Laske kustannukset</Button>
                    </Form.Group>
                </Form>

                <Card className='mb-3'>
                    <Card.Body>
                        <Card.Title>Tulokset</Card.Title>
                        <Card.Text>Vuodessa: {this.state.yearly} €</Card.Text>
                        <Card.Text>Kuukaudessa: {this.state.monthly} €</Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default DataForm