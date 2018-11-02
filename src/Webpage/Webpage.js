import React from 'react';
import Slider from "react-slick";
import HiveGraphs from '../HiveGraphs/HiveGraphs.js'
import NavBar from "../NavBar/NavBar";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import "./Hero.css"
import { fadeInDown ,fadeIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';


const styles = {
    heroSubtitleAnimation: {
    animation: '2s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  },
   about_animation_1:{
      animation: 'x 1.5s',
      animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
    },
    about_animation_2:{
      animation: 'x 2s',
      animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
    },
    about_animation_3:{
      animation: 'x 2.5s',
      animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
    }

}

export default class Webpage extends React.Component
{render()
    {return(
      <div id="front-page">
       <NavBar/>
        <div id="hero">
          {/* Caption over carosuel */}
          <StyleRoot>
          <div style={styles.heroSubtitleAnimation} id="caption-container">
            <h1>HELLO</h1>
            <p>Lorem ipsum dolor sit amet, consectetur 
              adipiscing elit. Nulla dignissim arcu sed 
              volutpat aliquet. Phasellus eget mi ac orci 
              malesuada faucibus. Morbi congue tortor eu 
              augue posuere, nec cursus velit vestibulum. 
              Nunc condimentum nulla in nisl eleifend, a </p>
          </div>
          </StyleRoot>
            <HeroSlider></HeroSlider>
        </div>
        {/* About me section */}
        <div id="about-container">
        {/* About me element-1 */}
        <StyleRoot>
          <div style={styles.about_animation_1} className="about-elements">
            <div className="icon-container">
              <span className="icon fa fa-user-circle fa-4x"></span>
            </div>
            <h1>About Us!</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur 
              adipiscing elit. Nulla dignissim arcu sed 
              volutpat aliquet. Phasellus eget mi ac orci 
              malesuada faucibus. Morbi congue tortor eu 
              augue posuere, nec cursus velit vestibulum. 
              Nunc condimentum nulla in nisl eleifend, a 
            </p>
          </div>
          </StyleRoot>
           {/* About me element-2 */}
          <StyleRoot>
          <div style={styles.about_animation_2}  className="about-elements">
            <div className="icon-container">
              <span className="icon fas fa-archive fa-4x"></span>
            </div>
            <h1>Our Product.</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur 
              adipiscing elit. Nulla dignissim arcu sed 
              volutpat aliquet. Phasellus eget mi ac orci 
              malesuada faucibus. Morbi congue tortor eu 
              augue posuere, nec cursus velit vestibulum. 
              Nunc condimentum nulla in nisl eleifend, a 
            </p>
          </div>
          </StyleRoot>
           {/* About me element-3 */}
           <StyleRoot>
          <div style={styles.about_animation_3} className="about-elements">
            <div className="icon-container">
              <span className="icon fas fa-question fa-4x"></span>
            </div>
            <h1>How we can help you?</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur 
              adipiscing elit. Nulla dignissim arcu sed 
              volutpat aliquet. Phasellus eget mi ac orci 
              malesuada faucibus. Morbi congue tortor eu 
              augue posuere, nec cursus velit vestibulum. 
              Nunc condimentum nulla in nisl eleifend, a 
            </p>
          </div>
          </StyleRoot>
        </div>
        
        {/* Will re-add later <HiveGraphs/>*/}
      </div>
        );
    }
};

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
    );
  }
}