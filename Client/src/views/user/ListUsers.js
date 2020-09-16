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
  Table,
  Row,
  Col
} from "reactstrap";

class ListUsers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      nextPage: '',
      previousPage: '',
      currentPage: ''
    };

    this.messages = [];

    this.handleDeleteUser = this.handleDeleteUser.bind(this);
  }

  async handleDeleteUser(id) {
    const response = await api.delete("user/" + id)
    .then(response => window.location.reload(false))
    .then(response => {
      window.location.reload(false);
    })
    .catch(err => {
      console.log(err);
    });
  }

  async handleNextPage() {
    const response = await api.get(this.state.nextPage)
    .then(response => {
      console.log(response);
      this.setState({users: response.data.items});
      this.setState({ nextPage: response.data.nextPage });
      this.setState({ previousPage: response.data.previousPage });
      this.setState({ currentPage: response.data.currentPageNumber });
    })
    .catch(err => {
      console.log(err);
    });
  }

  async handlePreviousPage() {
    const response = await api.get(this.state.previousPage)
    .then(response => {
      this.setState({users: response.data.items});
      this.setState({ nextPage: response.data.nextPage });
      this.setState({ previousPage: response.data.previousPage });
      this.setState({ currentPage: response.data.currentPageNumber });
    })
    .catch(err => {
      console.log(err);
    });
  }

  async handleUpdateUser(id) {
    window.location.href = '/user/update/' + id;
  }

  componentDidMount() {

    var options = {};

    const response = api.get("user")
    .then(response => {
      this.setState({ users: response.data.items });
      this.setState({ nextPage: response.data.nextPage });
      this.setState({ previousPage: response.data.previousPage });
      this.setState({ currentPage: response.data.currentPageNumber });

      if(this.state.users.length === 0){
        options = {
          place: "tr",
          message: "Não existem usuários cadastrados.",
          type: "warning",
          icon: "tim-icons icon-bell-55",
          autoDismiss: 7
        };
  
        this.refs.notificationAlert.notificationAlert(options);
      }

    })
    .catch(err => {
      console.log(err);

      // options = {
      //   place: "tr",
      //   message: "Não existem usuários cadastrados.",
      //   type: "warning",
      //   icon: "tim-icons icon-bell-55",
      //   autoDismiss: 7
      // };

      // this.refs.notificationAlert.notificationAlert(options);

    });
  }

  render() {
    let currentPage = this.state.currentPage;
    let nextPage = this.state.nextPage;
    let previousPage = this.state.previousPage;

    let contents = this.state.users.forEach(item => {
      // change the title and location key based on your API
      return <tr>
        <td>{item.name}</td> 
        <td>{item.cpf}</td>
      </tr>
    })

    return (
      <>
        <div className="content">
          <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Usuários</h5>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      this.state.users.map((user) =>
                        <tr className="trow" key={user.id}> 
                          <td>{user.name}</td>
                          <td> {user.cpf} </td>
                          <td> 
                            <Button onClick={() => this.handleUpdateUser(user.id)} className="btn-fill mr-4" color="primary" type="button">
                              Atualizar
                            </Button> 

                            <Button onClick={() => this.handleDeleteUser(user.id)} className="btn-fill" color="primary" type="button">
                              Excluir
                            </Button> 
                          </td>
                        </tr>
                    )}
                    </tbody>
                  </Table>
                </CardBody>
                <CardFooter>
                  <Row>
                    <Col md="4" className="text-left">
                    <Button onClick={() => this.handlePreviousPage()} className="btn-link" color="primary" type="button">
                              Anterior
                            </Button>
                    </Col>
                    <Col md="4"  className="text-center">
                      <div class="py-2 font-weight-bold">{currentPage}</div>
                    </Col>
                    <Col md="4"  className="text-right">
                    <Button onClick={() => this.handleNextPage()} className="btn-link" color="primary" type="button">
                              Próxima
                            </Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default ListUsers;
