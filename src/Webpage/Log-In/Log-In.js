import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Log-In.css';
import { fadeInDown } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import ReactForm from "../../Shared/ReactForm";
import SignIn from '../SignUp/SignUp';
import * as auth from "../../Authentication";

const styles = {
  /* Animation for stuttering Log-in-elements */
   input_animation:{
    animation: 'x 1.5s',
    animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
  },
  logbtn_animation:{
    animation: 'x 2s',
    animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
  },
  vendorbtn_animation:{
    animation: 'x 2.5s',
    animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
  }
};


export default class LogIn extends ReactForm {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loggedIn: false,
      error: null
    };
    this.login = this.login.bind(this);
  }

  async login(event) {
    event.preventDefault();
    try {
      await auth.doSignInWithEmailAndPassword(this.state.email, this.state.password);
      this.setState({loggedIn: true});
    } catch (error) {
      this.setState({error});
    }
  }

  render() {
    let loginError;
    let redirect;
    if (this.state.error) {
      loginError = <div className="error-msg">Invalid username/password</div>
    }
    if (this.state.loggedIn) {
      redirect = <Redirect to="My-Hive"/>
    }
    return (
      <StyleRoot>
        <div id="Login-page">
          {redirect}
          <div id="Input-Container">
            <h1>Login</h1>
            <form className="login-form" onSubmit={this.login}>
              <div className="input-wrapper">
                <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange}
                     placeholder="email" style={styles.input_animation}/>
              <input type="password" name="password" value={this.state.password}
                     onChange={this.handleInputChange}
                     style={styles.input_animation}
                     placeholder="password"/>
              {loginError}
              </div>
              <input className="login-btn" type="submit" value="Login"
                     style={styles.logbtn_animation}/>
            </form>
            <hr/>
              <div style={styles.vendorbtn_animation} id="round-vendorgroup">
                <RoundButton symbol="fa-google" name="G+"/>
                <RoundButton symbol="fa-facebook" name="FB"/>
                <RoundButton symbol="fa-twitter" name="Twitter"/>
                <RoundButton symbol="fa-github" name="GitHub"/>
              </div>
            <div className="signup">
              Don't have an account?
              <Link to="/Sign-Up"> Create one </Link>
            </div>
          </div>
        </div>
      </StyleRoot>
    )
  }
}

class RoundButton extends React.Component {
  render() {
    return (
      <div className="roundbtn-container">
        <button className={"round-vendorbtn " + this.props.color}>
          <i className={"fab fa-2x " + this.props.symbol}/>
        </button>
        <div className="vendor-name">{this.props.name}</div>
      </div>
    )
  }
}