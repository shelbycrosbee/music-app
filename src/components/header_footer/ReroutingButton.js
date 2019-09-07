import React from 'react';
import { withRouter } from 'react-router-dom';
import { Nav } from 'react-bootstrap';


function ReroutingButton(props) {


  return (
    <Nav.Item>
      <Nav.Link eventKey={props.url}>{props.name}
      </Nav.Link>
    </Nav.Item>
  )
}

export default ReroutingButton;