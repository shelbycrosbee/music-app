import React, { Component } from 'react'
import {
  Card,
  Button
} from 'react-bootstrap'
import './index.css'

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


          <Card.Footer className='customBg'>Footer</Card.Footer>
     

    )
  }
}

export default Footer;