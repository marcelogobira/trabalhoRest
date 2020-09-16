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
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";

class UserByCpf extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      cpf: '',
      street: '',
      number: ''
    };

    this.messages = [];

    this.handleCPFChange = this.handleCPFChange.bind(this);
    this.handleGetUser = this.handleGetUser.bind(this);
  }

  handleCPFChange(event) {
    this.setState({cpf: event.target.value});
  }

  async handleGetUser(cpf) {
console.log(cpf);
    const response = api.get("user/cpf/" + cpf)
    .then(response => {
      this.setState({ name: response.data.name });
      this.setState({ cpf: response.data.cpf });
      this.setState({ street: response.data.address.street });
      this.setState({ number: response.data.address.number });
    })
    .catch(err => {
      console.log(err);
      var errorMessage = "Ocorreu um erro ao buscar o usuário";

      if(err.status === 404){
        errorMessage = "Usuário não encontrado";
      }

      // options = {
      //   place: "tr",
      //   message: errorMessage,
      //   type: "warning",
      //   icon: "tim-icons icon-bell-55",
      //   autoDismiss: 7
      // };

      // this.refs.notificationAlert.notificationAlert(options);

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
                  <h5 className="title">Buscar Usuário</h5>
                </CardHeader>
                <CardBody>
                <Row>
                    <Col className="pl-md-1" md="12">
                      <FormGroup>
                      <InputGroup>
                          
                          <Input placeholder="CPF"
                          type="text"
                          onChange={this.handleCPFChange}/>
                          <InputGroupAddon addonType="append" className="py-0 border-0">
                          <Button onClick={() => this.handleGetUser(userCpf)} 
                          className="btn-fill mr-4 mt-0" color="primary" type="button">
                              Buscar
                            </Button>

                          </InputGroupAddon>
                        </InputGroup>                        
                      </FormGroup>
                    </Col>
                  </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                          <label>Nome</label>
                          <Input                          
                            placeholder="Nome"
                            type="text"
                            value={userName}
                            disabled="disabled"
                          />
                      </Col>
                      <Col className="pl-md-1" md="6">
                          <label>CPF</label>
                          <Input
                            placeholder="CPF"
                            type="text"
                            value={userCpf}
                            disabled="disabled"
                          />
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                          <label>Logradouro</label>
                          <Input
                            placeholder="Logradouro"
                            type="text"
                            value={userAddressStreet}
                            disabled="disabled"
                          />
                      </Col>
                      <Col className="pl-md-1" md="6">
                          <label>Número</label>
                          <Input
                            placeholder="Número"
                            type="text"
                            value={userAddressNumber}
                            disabled="disabled"
                          />
                      </Col>
                    </Row>
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

export default UserByCpf;
