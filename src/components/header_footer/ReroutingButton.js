import React from 'react';
import {withRouter} from 'react-router-dom';


function Button( props ){
  const redirect = (route) => {
    props.history.push(route)
  }

  return(
    <button onClick={() => redirect(props.redirectUrl)}>{ props.name }</button>
  )
}

export default withRouter(Button);