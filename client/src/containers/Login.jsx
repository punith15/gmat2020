import React, { Component } from 'react';
import '../containers/Login.css'
import { Link, withRouter} from 'react-router-dom'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email : '',
            password : '',
            user : {},
            message : '',
            loading : false
        }

        this.postUserLogin = this.postUserLogin.bind(this)
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onHandleSubmit = this.onHandleSubmit.bind(this)
    }

    postUserLogin = async()=>{
        console.log(this.state.user)
        const userRes = await fetch('/login', {
            method : 'POST',
            body : JSON.stringify(this.state.user),
            headers : {
                'Content-Type' : 'application/json'
            }
        })

        if(userRes.status === 200){
            this.setState({
                email : '',
                password : '',
                user : {},
                message : 'Login Successful',
                loading : false
            })
            try {
                const userObj = await userRes.json()
                await sessionStorage.setItem('user', JSON.stringify(userObj))
                await sessionStorage.setItem('userName', userObj.user.name)
                sessionStorage.setItem('userToken', userObj.token)
                this.props.history.push('/home')
            } catch (error) {
                console.log(error.message)
                this.props.history.push('/home')
            }
            
        }else{
            this.setState({
                ...this.state,
                message : 'Unable to login',
                loading : false
            })
        }
    }

    onEmailChange = (e)=>{
        this.setState({
            ...this.state,
            email : e.target.value
        })
    }

    onPasswordChange = (e)=>{
        this.setState({
            ...this.state,
            password : e.target.value
        })
    }

    onHandleSubmit = (e)=>{
        e.preventDefault()
        const data = {email : this.state.email, password : this.state.password}
        this.setState({
            ...this.state,
            user : data,
            loading : true,
            message : ''
        },
        ()=> this.postUserLogin()
        )
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="col-md-5 login">
                <h2 className="text-center">Login</h2>
                <form className="credential-form" onSubmit={this.onHandleSubmit}>
                    <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email"
                    onChange={this.onEmailChange} required/>
                    </div>
                    <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password"
                    onChange={this.onPasswordChange} required/>
                    </div>
                    <p>New User ?
                        <Link className="signup-link" to="/signup">Sign Up</Link>
                    </p>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    {this.state.loading ? <h6 style={{color:'blue',marginTop:'10px'}}>Please Wait...</h6> : 
                    <h6 style={{color:"green", marginTop:'10px'}}>{this.state.message}</h6>}
                </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);