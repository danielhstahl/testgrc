import {createStore} from 'redux'
import {setStep} from './ReduxActions'
import workflowApp from './ReduxReducers'
let store=createStore(workflowApp);
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

store.dispatch(setStep(1))
unsubscribe();