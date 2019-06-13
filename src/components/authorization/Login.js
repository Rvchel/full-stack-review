import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirect: false
        }
        this.handleUsername = this.handleUsername.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.loginUser = this.loginUser.bind(this)
    }

    handlePassword(e) {
        this.setState({password: e.target.value})
    }

    handleUsername(e) {
        this.setState({username: e.target.value})
    }

    loginUser() {
        //call username and password because it is named that in the back, so if username is called here on front, must be on back too
        axios.post('/auth/login', {username: this.state.username, password: this.state.password})
        //redirects when true and works
        .then(() => this.setState({redirect: true}))
        .catch(() => {
            alert('Login unsuccesful, try again.')
        })
    }



    render() {
        //if sucessful then it'll redirect 
        if(this.state.redirect) {
                    alert('Login sucessful, welcome to our shop.')
                    return <Redirect to='/dashboard' />
        }

        return (
            <div>
                
                <h3>Login</h3>
                <div>
                    username:
                    <input placeholder='username' onChange={this.handleUsername} />
                    password:
                    <input placeholder='password' type='password' onChange={this.handlePassword} />
                </div>
                <button onClick={this.loginUser}>Log in</button>

            </div>
        )
    }
}

export default Login;