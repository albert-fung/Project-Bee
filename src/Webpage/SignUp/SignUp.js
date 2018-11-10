import React from 'react';
import './SignUp.css';
import ReactForm from "../../Shared/ReactForm";
import * as auth from "../../Authentication";
import {Link, Redirect} from "react-router-dom";

class SignUp extends ReactForm {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      accountCreated: false,
      error: null
    };
    this.signUp = this.signUp.bind(this);
  }

  async signUp(event) {
    event.preventDefault();
    try {
      await auth.doCreateUserWithEmailAndPassword(this.state.email, this.state.password);
      this.setState({accountCreated: true});
    } catch (error) {
      this.setState({error});
    }
  }

  render() {
    let signUpError;
    let accountCreatedMessage;
    if (this.state.error) {
      signUpError = <span> Invalid Account Details </span>
    }
    if (this.state.accountCreated) {
      accountCreatedMessage = <div>
        Account was created
        <Link to="/Log-in"> Click to Login </Link>
      </div>;
    }

    return (
      <div className="container">
        <form onSubmit={this.signUp}>
          <h1>Sign Up</h1>
          <div className="input-field">
            <input type="email" name="email" required value={this.state.email} onChange={this.handleInputChange}
                   placeholder="Email"/>
            <input type="password" name="password" required value={this.state.password}
                   onChange={this.handleInputChange} placeholder="Password"/>
            <input type="text" name="firstName" required value={this.state.firstName} onChange={this.handleInputChange}
                   placeholder="First Name"/>
            <input type="text" name="lastName" required value={this.state.lastName} onChange={this.handleInputChange}
                   placeholder="Last Name"/>
          </div>
          <div className="input-field">
            {signUpError}
            <input type="submit" disabled={this.state.accountCreated} value="Sign Up"/>
            {accountCreatedMessage}
          </div>
        </form>
      </div>
    )
  }
}

export default SignUp