/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import NotificationAlert from "react-notification-alert";
import api from '../../services/api';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

class UpdateUser extends React.Component {

  constructor(props) {
    super(props);
    var urlSegment = this.props.location.pathname.split("/")

    if(isNaN(urlSegment[urlSegment.length - 1])){
      window.location.href = '/user/list'
    }

    this.state = {
      id: urlSegment[urlSegment.length - 1],
      name: '',
      cpf: '',
      street: '',
      number: ''
    };

    this.messages = [];

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCPFChange = this.handleCPFChange.bind(this);
    this.handleStreetChange = this.handleStreetChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    console.log(this.state);

  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleCPFChange(event) {
    this.setState({cpf: event.target.value});
  }

  handleStreetChange(event) {
    this.setState({street: event.target.value});
  }

  handleNumberChange(event) {
    this.setState({number: event.target.value});
  }
  
  validateUser(){
    this.messages = [];

    if(!this.state.name){
      this.messages.push("Nome não preenchido.");
    }

    if(!this.state.cpf){
      this.messages.push("CPF não preenchido.");
    }

    if(!this.state.street){
      this.messages.push("Logradouro não preenchido.");
    }

    if(!this.state.number){
      this.messages.push("Número não preenchido.");
    }


    if(this.messages.length > 0){
      return false;
    }

    return true;
  };

  async handleSubmit(event) {
    // add entity - POST
    event.preventDefault();


    if(!this.validateUser()){
      var options = {};
      var message = '';

      for(var i = 0; i < this.messages.length; i++){
        message = message +  this.messages[i] + '<br>';
        console.log(message);
      }

      options = {
        place: "tr",
        message: (message),
        type: "warning",
        icon: "tim-icons icon-bell-55",
        autoDismiss: 7
      };

      this.refs.notificationAlert.notificationAlert(options);

      return false;
    }

    const payload = {
      Name: this.state.name,
      CPF: this.state.cpf,
      Address: {
        Street: this.state.street,
        Number: this.state.number
      }
    };

    const response = await api.put("user/" + this.state.id, payload)    
    .then(response => {
      console.log(response)

      options = {
        place: "tr",
        message: "Usuário alterado com sucesso.",
        type: "success",
        icon: "tim-icons icon-bell-55",
        autoDismiss: 7
      };

      this.refs.notificationAlert.notificationAlert(options);
    })
    .catch(err => {
      console.log(err);
    });
  }

  componentDidMount() {

    var options = {};

    const response = api.get("user/" + this.state.id)
    .then(response => {
      this.setState({ name: response.data.name });
      this.setState({ cpf: response.data.cpf });
      this.setState({ street: response.data.address.street });
      this.setState({ number: response.data.address.number });

      console.log(this.state);

    })
    .catch(err => {
      console.log(err);
      var errorMessage = "Ocorreu um erro ao buscar o usuário";

      if(err.status === 404){
        errorMessage = "Usuário não encontrado";
      }

      options = {
        place: "tr",
        message: errorMessage,
        type: "warning",
        icon: "tim-icons icon-bell-55",
        autoDismiss: 7
      };

      this.refs.notificationAlert.notificationAlert(options);

    });
  }

  render() {
    let userName = this.state.name;
    let userCpf = this.state.cpf;
    let userAddressNumber = this.state.number;
    let userAddressStreet = this.state.street;

    return (
      <>
        <div className="content">
          <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
          <Row>
            <Col md="10">
              <Card>
                <CardHeader>
                  <h5 className="title">Atualizar perfil</h5>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleSubmit}>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Nome</label>
                          <Input                          
                            onChange={this.handleNameChange}
                            placeholder="Nome"
                            type="text"
                            value={userName}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>CPF</label>
                          <Input
                            onChange={this.handleCPFChange}
                            placeholder="CPF"
                            type="text"
                            value={userCpf}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Logradouro</label>
                          <Input                          
                            onChange={this.handleStreetChange}
                            placeholder="Logradouro"
                            type="text"
                            value={userAddressStreet}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Número</label>
                          <Input
                            onChange={this.handleNumberChange}
                            placeholder="Número"
                            type="text"
                            value={userAddressNumber}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12" className="text-center">
                        <Button className="btn-fill" color="primary" type="submit">
                          Salvar
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default UpdateUser;
