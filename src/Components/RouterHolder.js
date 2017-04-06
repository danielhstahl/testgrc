import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import LandingPageContainer from '../Containers/LandingPageContainer'
import LoginContainer from '../Containers/LoginContainer'
import ValidationAppContainer from '../Containers/ValidationAppContainer'



const RouterHolder=({userObj, arrowColor})=>{
    const ValidationCurried=({step, match})=><ValidationAppContainer step={step} match={match} arrowColor={arrowColor}/>
    const {user}=userObj
    console.log("This should only be called once after login");
    return(
    <Router>
      {user?
        <div>
          <Route exact path="/" component={LandingPageContainer}/>
          <Route path={`/validation/:validationId`} component={ValidationCurried}/>
        </div>:<LoginContainer/>
      }
    </Router>)
}
export default RouterHolder