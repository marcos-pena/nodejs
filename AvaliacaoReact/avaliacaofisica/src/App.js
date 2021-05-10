import logo from './logo.svg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';

class App extends React.Component {

  constructor(props){
    
    super(props);

    this.state = {
      genero: 'm',
      peso: 0,
      altura: 0,
      idade: 0,
      tmb: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event){
    
    if(this.state.peso > 0 && this.state.altura >0 && this.state.idade > 0){
      
      //Calcular TMB com os dados informados
      var tmb;

      if(this.state.genero == 'm'){
          tmb = 66 + (13.7 * this.state.peso) + (5 * this.state.altura) - (6.8 * this.state.idade)
      }else{
          tmb = 655 + (9.6 * this.state.peso) + (1.8 * this.state.altura) - (4.7 * this.state.idade);
      }

      this.setState({tmb: tmb});

    }else{
      alert('Favor preencher todos os campos com valores válidos!');
    }

    event.preventDefault();
  }

  render (){
    return (
      
        <Container>
          <Row>
            <Col xs={12}>
              <h1>Cálculo de Taxa Metabólica Basal</h1>
            </Col>
            <Col xs={12}> 
              <form onSubmit={this.handleSubmit}>
                <Container fluid>
                  <Row>
                    <Col xs={12}>
                      Sexo:
                    </Col>
                    <Col xs={12}>
                      <input 
                        type="radio" 
                        id="masculino" 
                        name="genero" 
                        value="m" 
                        onChange={this.handleChange} 
                        checked={this.state.genero === 'm'}/>
                      <label for="masculino">Masculino</label>
                      <input 
                        type="radio" 
                        id="feminino" 
                        name="genero" 
                        value="f" 
                        onChange={this.handleChange}
                        checked={this.state.genero === 'f'}/>
                      <label for="feminino">Feminino</label>
                    </Col>
                    <Col xs={12}>
                      <label for="peso">Peso</label>
                    </Col>
                    <Col xs={12}>
                      <input 
                        type="number" 
                        name="peso" 
                        value={this.state.peso} 
                        onChange={this.handleChange}/>
                    </Col>
                    <Col xs={12}>
                      <label for="altura">Altura</label>
                    </Col>
                    <Col xs={12}>
                      <input 
                        type="number"
                        name="altura" 
                        value={this.state.altura} 
                        onChange={this.handleChange}/>
                    </Col>
                    <Col xs={12}>
                      <label for="idade">Idade</label>
                    </Col>
                    <Col xs={12}>
                      <input 
                        type="number" 
                        name="idade"
                        value={this.state.idade} 
                        onChange={this.handleChange}/>
                    </Col>
                    <Col xs={12}>
                      <br/>
                      <input type="submit" value="Calcular"/>
                    </Col>
                  </Row>
                </Container>
              </form>
            </Col>
            <Col xs={12}>
              <span>Sua TMB é: {this.state.tmb}</span>
            </Col>
          </Row>
        </Container>
    );
  }
}

export default App;
