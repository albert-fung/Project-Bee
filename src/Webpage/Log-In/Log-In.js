import React from 'react';
import './Log-In.css';
import ReactForm from "../../Shared/ReactForm";
const auth = require("../../Authentication");

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
}
const byPropKey = (propertyName, value) =>() =>({
  [propertyName]: value,
});

export default class LogIn extends ReactForm {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE};
    this.login = this.login.bind(this);
  }

  async login(event) {
    event.preventDefault();
    try {
      await auth.doSignInWithEmailAndPassword(this.state.email, this.state.password);
      this.setState({...INITIAL_STATE});
      alert("this is working!")
    } catch (error) {
      console.error("Failed to login", error);
      this.setState(byPropKey('error',error))
    }
  }

  render() {
    return (
      <div id="Login-page">
        <div id="Input-Container">
          <h1>Login</h1>
          <form onSubmit={this.login}>
            <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange}
                   placeholder="Email"/>
            <input type="password" name="password" value={this.state.password}
                   onChange={this.handleInputChange} placeholder="Password"/>
            <input type="submit" value="Login"/>
          </form>
          <div id="other-login">
            <hr/>
            <div id="round-login-group">
              <RoundButton symbol="fa-google" name="G+"/>
              <RoundButton symbol="fa-facebook" name="FB"/>
              <RoundButton symbol="fa-twitter" name="Twitter"/>
              <RoundButton symbol="fa-github" name="GitHub"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class RoundButton extends React.Component {
  render() {
    return (
      <div className="btn-container">
        <button className={"round-loginbtn " + this.props.color}>
          <i className={"fab fa-2x " + this.props.symbol}/>
        </button>
        <div className="name">{this.props.name}</div>
      </div>
    )
  }
}