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

      //   <footer class="footer">
      //   <div class="container">
      //     <span class="text-muted">Place sticky footer content here.</span>
      //   </div>
      // </footer>
      <div>
        <div className='clear'></div>
        <footer className='footer'>&#9836; &emsp; &#9834; &emsp; &#9836;	</footer>
      </div>

    )
  }
}

export default Footer;