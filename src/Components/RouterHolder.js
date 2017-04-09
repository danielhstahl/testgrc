import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import LandingPageContainer from '../Containers/LandingPageContainer'
import LoginContainer from '../Containers/LoginContainer'
import ValidationAppContainer from '../Containers/ValidationAppContainer'


import PageLoad from './PageLoad'


const conditionRoutes=(isLoading, user, children)=>{
  if(isLoading){
    return <PageLoad/>
  }
  else if(user){
    return children
  }
  else{
    return <LoginContainer/>
  }
}
const RouterHolder=({userObj, isLoading})=>{
    const {user}=userObj
    console.log("This should only be called once after login");
    return(
    <Router>
      {conditionRoutes(isLoading, user, 
        <div>
          <Route exact path="/" component={LandingPageContainer}/>
          <Route path={`/validation/:validationId`} component={ValidationAppContainer}/>
        </div>
      )}
    </Router>)
}
export default RouterHolder