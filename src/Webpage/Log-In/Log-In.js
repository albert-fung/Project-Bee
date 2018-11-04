import React from 'react';
import './Log-In.css';

export default class LogIn extends React.Component
{
    render()
    {return(
          <div id="Login-page">
            <div id="Input-Container">
              <h1>Log in</h1>
              <input id="Email" placeholder="Email"></input>
              <input id="Password" placeholder="Password"></input>  
              <button type="button" class="btn">Log in</button>
              <div id="other-login">
                <hr></hr>
                <div id="round-logingroup">
                  <RoundButton symbol="fa-google" name="G+"></RoundButton>
                  <RoundButton symbol="fa-facebook" name="FB"></RoundButton>
                  <RoundButton symbol="fa-twitter" name="Twitter"></RoundButton>
                  <RoundButton symbol="fa-github" name="GitHub"></RoundButton>
                </div>
              </div> 
            </div>        
          </div>
    )}
}
class RoundButton extends React.Component
{
  render()
  {
    return(
      <div class="btn-container">
      <button class={"round-loginbtn "+this.props.color}>
          <i class={"fab fa-2x "+this.props.symbol}></i>
      </button>
      <div class="name">{this.props.name}</div>
    </div>
    )
  }
}