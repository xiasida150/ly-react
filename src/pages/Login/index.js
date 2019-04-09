import React, { Component } from 'react';

import  { getData }  from './login-api.js';


export default class Login extends Component {

    async componentWillMount(){
            let  result  = await getData();
            console.log(result);

    }




    render() {
        return (
            <div>
                Login
            </div>
        )
    }
}
