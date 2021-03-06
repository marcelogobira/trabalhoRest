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
import React, { Component } from "react";

// reactstrap components
import { Button } from "reactstrap";

class NotFound extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="fixed-plugin">
        <h1>Página não encontrada</h1>
      </div>
    );
  }
}

export default NotFound;
