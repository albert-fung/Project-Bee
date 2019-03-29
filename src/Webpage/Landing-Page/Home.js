import React from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import "./Hero.css";
import {fadeIn} from 'react-animations';
import Radium, {StyleRoot} from 'radium';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle,faArchive,faQuestion} from "@fortawesome/free-solid-svg-icons"
/* TODO 
  - Add animation to background and stutter so carosuel comes first. (Debating?)
*/
const styles = {
  /*Animation for paragraph over carosuel */
    heroSubtitleAnimation: {
    animation: '0.4s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  },
  /* Animation for stuttering about-elements */
   about_animation_1:{
      animation: 'x .8s',
      animationName: Radium.keyframes(fadeIn, 'fadeIn')
    },
    about_animation_2:{
      animation: 'x 1s',
      animationName: Radium.keyframes(fadeIn, 'fadeIn')
    },
    about_animation_3:{
      animation: 'x 1.2s',
      animationName: Radium.keyframes(fadeIn, 'fadeIn')
    }
}

export default class Landingpage extends React.Component
{
    render()
    {return(
    <div id="landing-page">
        <div id="hero">
          {/* Caption over carosuel & animation container */}
          <StyleRoot>
            {/* Animation */}
          <div style={styles.heroSubtitleAnimation} id="caption-container">
            <h1>Saving the world one bee at a time!</h1>

          </div>
          </StyleRoot>
          <HeroSlider></HeroSlider>
            {/* About me section */}
        <div id="about-container">
        {/* About me element-1 */}
        <StyleRoot>
           {/* Animation */}
          <div style={styles.about_animation_1} className="about-elements">
            <div className="icon-container">
              <span className="icon"><FontAwesomeIcon icon={faUserCircle} size="6x"/></span>
            </div>
            <h1>About Us!</h1>
            <p>
              We're a group of five engineering students at the University of Ottawa
              completing their honours projects while trying to save the world 
              one bee at a time! If you'd like to know more about us you're welcome to contact us anytime!
          
            </p>
          </div>
          </StyleRoot>
           {/* About me element-2 */}
          <StyleRoot>
             {/* Animation */}
          <div style={styles.about_animation_2}  className="about-elements">
            <div className="icon-container">
              <span className="icon"><FontAwesomeIcon icon={faArchive} size="6x"/></span>
            </div>
            <h1>Our Product.</h1>
            <p>
              We're creating a real-time system to monitor a beehives ecosystem to deteremine
              the causes or signs of Colony Collapse Disorder (CCD). We collect data on temperature, humiditiy, weight, sound
              and air quality to correlate this to CCD. 
            </p>
          </div>
          </StyleRoot>
           {/* About me element-3 */}
           <StyleRoot>
          <div style={styles.about_animation_3} className="about-elements">
            <div className="icon-container">
              <span className="icon"><FontAwesomeIcon icon={faQuestion}size="6x"/></span>
            </div>
            <h1>How we can help you?</h1>
            <p>
              If you're a research or a bee keeper we can help!
              Our public data page holds hours of collected data 
              provided in CSV format. We also provide all of our software and hardware to be 
              open source so you'll be able to create your own Project Bee as well!
            </p>
          </div>
           </StyleRoot>
          </div>
        </div>  
    </div>
    )}
}

class HeroSlider extends React.Component {
    render() {
      var settings = {
        arrows:false,
        infinite: true,
        speed: 500,
        autoplay:true,
        slidesToShow: 1,
        slidesToScroll: 1,
        useTransform: false,
      };
      return (
        <Slider  {...settings}>
          <div className="carosuel-container slide-1">
            <div className="gray-layer"></div>
          </div>
          <div className="carosuel-container slide-2">
            <div className="gray-layer"></div>
          </div>
          <div className="carosuel-container slide-3">
            <div className="gray-layer"></div>
          </div>
          <div className="carosuel-container slide-4">
            <div className="gray-layer"></div>
          </div>
        </Slider>
      );}}