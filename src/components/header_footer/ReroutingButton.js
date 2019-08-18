import React from 'react';
import {withRouter} from 'react-router-dom';


function Button( props ){
  const redirect = (route) => {
    props.history.push(route)
  }

  return(
    <p onClick={() => redirect(props.redirectUrl)}> { props.name } </p>
  )
}

export default withRouter(Button);