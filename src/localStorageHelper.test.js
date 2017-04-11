import React from 'react';
import ReactDOM from 'react-dom';
import {setStorage, checkLogin} from './localStorageHelper';


it('correctly sets storage', () => {
    const user={obj:"somobj"}
    setStorage(user)
    expect(localStorage.getItem('token')).toEqual(JSON.stringify(user))
});
it('correctly checks login after login', () => {
    const user={obj:"somobj"}
    setStorage(user)
    const store={
        dispatch:(val)=>{
            expect(val).toEqual(user)
        }
    }
    const attemptLogin= (dispatch, parsedUser)=>{
        dispatch(parsedUser)
    }
    checkLogin(store, attemptLogin, ()=>{
        console.log("shouldn't get here")
    })
    
});

it('correctly checks login when not logged in', () => {
    const thingToCheck="Not Logged In"
    const store={
        dispatch:(val)=>{
            expect(val).toEqual(thingToCheck)
        }
    }
    const attemptLogin= (dispatch, parsedUser)=>{
        dispatch(parsedUser)
    }
    checkLogin(store, attemptLogin, ()=>{
        return thingToCheck
    })
});