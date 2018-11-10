import React from 'react';
import './Log-In.css';
import { fadeInDown } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

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
}

export default class LogIn extends React.Component
{
    render()
    {return(
      <StyleRoot>
          <div id="Login-page">
            <div id="Input-Container">
              <h1>Log in</h1>
              <input style={styles.input_animation} id="Email" placeholder="Email"></input>
              <input style={styles.input_animation} id="Password" placeholder="Password"></input>  
              <button style={styles.logbtn_animation} type="button" class="btn">Log in</button>
              <div id="other-login">
                <hr></hr>
                <div style={styles.vendorbtn_animation} id="round-logingroup">
                  <RoundButton symbol="fa-google" name="G+"></RoundButton>
                  <RoundButton symbol="fa-facebook" name="FB"></RoundButton>
                  <RoundButton symbol="fa-twitter" name="Twitter"></RoundButton>
                  <RoundButton symbol="fa-github" name="GitHub"></RoundButton>
                </div>
              </div> 
            </div>        
          </div>
        </StyleRoot>
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