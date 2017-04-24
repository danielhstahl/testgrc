import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import LandingPageContainer from '../Containers/LandingPageContainer'
import LoginContainer from '../Containers/LoginContainer'
import ValidationAppContainer from '../Containers/ValidationAppContainer'
import CustomAppBar from './CustomAppBar'
import {backgroundPrimary} from '../Styles/ThemeStyles'

import PageLoad from './PageLoad'


const ConditionRoutes=({isLoading, user, children})=>{
  if(isLoading){
    return <PageLoad/>
  }
  else if(user){
    return <div style={backgroundPrimary}>{children}</div>
  }
  else{
    return <LoginContainer/>
  }
}

const routes=[
  {
    path:"/",
    name:"Home",
    component:LandingPageContainer,
    nav:true,
    exact:true
  },
  {
    path:"/validation/:validationId",
    name:"",
    component:ValidationAppContainer,
    nav:false,
    exact:false
  }
]
const filteredRoutes=routes.filter(val=>val.nav)
const RouterHolder=({userObj, isLoading})=>{
    const {user}=userObj
    console.log("This should only be called once after login");
    return(
    <Router>
      <ConditionRoutes isLoading={isLoading} user={user}>
        <CustomAppBar routes={filteredRoutes}/> 
        {routes.map(route=>(
           <Route key={route.path} exact={route.exact} path={route.path} component={route.component}/>
        ))}
      </ConditionRoutes>
    </Router>)
}
RouterHolder.propTypes={
  userObj:React.PropTypes.shape({
    user:React.PropTypes.shape({
      policyGroups:React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
      cn:React.PropTypes.string.isRequired
    }),
    err:React.PropTypes.object
  }).isRequired,
  isLoading:React.PropTypes.bool.isRequired
}
export default RouterHolder