import React from 'react'
import './OpenSource.css'
import FirebaseLogo from './Firebase_Logo.png'
import ArduinoLogo from './Arduino_Logo.png'
import {fadeIn} from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const styles = {
  animation_2: {
    animation: '0.4s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  },
  animation_2:{
      animation: 'x .8s',
      animationName: Radium.keyframes(fadeIn, 'fadeIn')
    },
  animation_3:{
      animation: 'x 1.3s',
      animationName: Radium.keyframes(fadeIn, 'fadeIn')
    },
}

export default class OpenSource extends React.Component{
  render(){
    return (
      <div className="OpenSource_Container">
        <OptionContainer 
          className="Software_Container"
          title="Software"
          imgsrc={FirebaseLogo}
          githubLink="https://github.com/albert-fung/Project-Bee">
        </OptionContainer>
        <OptionContainer 
          className="Hardware_Container"
          title="Hardware"
          imgsrc={ArduinoLogo}
          githubLink="https://github.com/YanuG/project-bee">
        </OptionContainer>
      </div>
    )
  }
}

class OptionContainer extends React.Component {
  render() {
    return(
    <StyleRoot>
      <div className={this.props.className}>
        <h3 style={styles.animation_1}>
          {this.props.title}
        </h3>
        <img
          className="Img_Option" 
          src={this.props.imgsrc}
          style={styles.animation_2}
        ></img>
        <a href={this.props.githubLink}>
          <button style={styles.animation_3} className="Option_Container_btn">
            {this.props.title} Github
          </button>
        </a>
      </div>
    </StyleRoot> 
    )
  }
}