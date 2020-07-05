import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom'

class SignUp extends Component {
    constructor(props){
        super(props)
        this.state = {
            name : '',
            email : '',
            password : '',
            confirmPassword : '',
            isMatch : true,
            message : [],
            user : {},
            loading : false
        }
        this.postSignUpUser = this.postSignUpUser.bind(this)
        this.onHandleSubmit = this.onHandleSubmit.bind(this)
        this.onNameChange = this.onNameChange.bind(this)
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onConfirmPassChange = this.onConfirmPassChange.bind(this)

    }

    postSignUpUser = async()=>{
        console.log(this.state.user)
        const userRes = await fetch('/signup', {
            method : 'POST',
            body : JSON.stringify(this.state.user),
            headers : {
                'Content-Type' : 'application/json'
            }
        })

        if(userRes.status === 201){
            this.setState({
                name : '',
                email : '',
                password : '',
                confirmPassword : '',
                message : ['Sign Up Successful', 'green'],
                loading : false
            },
            ()=> {
                setTimeout(()=>{
                    this.props.history.push('/')
                }, 500)
                }
            )
            
        }else{
            this.setState({
                ...this.state,
                loading : false,
                message : ['Unable to Sign Up, try later', 'red']
            })
        }
    }

    onNameChange = (e)=>{
        this.setState({
            ...this.state, 
            name : e.target.value
        })
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

    onConfirmPassChange = (e)=>{
        this.setState({
            ...this.state, 
            confirmPassword : e.target.value
        })
    }

    onHandleSubmit = (e)=>{
        e.preventDefault();
        if(this.state.password !== this.state.confirmPassword){
            this.setState({
                ...this.state,
                isMatch : false,
                message : [],
                loading : false
            })
        }else{
            const data = {name : this.state.name, email : this.state.email, password : this.state.password}
            console.log(data)
            this.setState({
                isMatch : true,
                user : data,
                message : [],
                loading : true
            },
            ()=>this.postSignUpUser()
            )
        } 
    }


    render() {
        return (
            <div className="container-fluid">
                <div className="col-md-5 signup">
                <h2 className="text-center">Sign Up</h2>
                <form className="credential-form" onSubmit={this.onHandleSubmit}>
                    <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" 
                    onChange={this.onNameChange}
                    value={this.state.name} required/>
                    </div>

                    <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" 
                    onChange={this.onEmailChange}
                    value={this.state.email} required/>
                    </div>

                    <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" 
                    onChange={this.onPasswordChange}
                    value={this.state.password} required/>
                    {!this.state.isMatch ? <small style={{color:'red'}}>Password missmatch</small> : ''}
                    </div>

                    <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" className="form-control" id="confirm-password" 
                    onChange={this.onConfirmPassChange}
                    value={this.state.confirmPassword} required/>
                    {!this.state.isMatch ? <small style={{color:'red'}}>Password missmatch</small> : ''}
                    </div>

                    <p>Already Registered ?
                        <Link className="signup-link" to="/">Login</Link>
                    </p>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    {this.state.loading ? <h6 style={{color:'blue',marginTop:'10px'}}>Please Wait....</h6> : 
                    <h6 style={{color:this.state.message[1], marginTop:'10px'}}>{this.state.message[0]}</h6>}
                </form>
                </div>
            </div>
        );
    }
}

export default withRouter(SignUp);