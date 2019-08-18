import React, { Component } from 'react'
import {
  Card,
  Button
} from 'react-bootstrap'
/*Required Local Props :
  --none
Required Global Props :
  --logout()
  --aboutUsRedirect()
  --
*/

class Footer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (


          <Card.Footer style={{bottom: 0, position: 'fixed', width: '100%'}}>Footer</Card.Footer>
     

    )
  }
}

export default Footer;