import React from 'react';
import Slider from "react-slick";
import HiveGraphs from '../HiveGraphs/HiveGraphs.js'
import NavBar from "../NavBar/NavBar";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import "./Hero.css"

/*TODO 
  -Add animations to about-element icons 
  -Add animations to subtitle
*/

export default class Webpage extends React.Component
{render()
    {return(
      <div id="front-page">
       <NavBar/>
        <div id="hero">
          {/* Caption over carosuel */}
          <div id="caption-container">
            <h1>HELLO</h1>
            <p>Lorem ipsum dolor sit amet, consectetur 
              adipiscing elit. Nulla dignissim arcu sed 
              volutpat aliquet. Phasellus eget mi ac orci 
              malesuada faucibus. Morbi congue tortor eu 
              augue posuere, nec cursus velit vestibulum. 
              Nunc condimentum nulla in nisl eleifend, a </p>
          </div>
            <HeroSlider></HeroSlider>
        </div>
        {/* About me section */}
        <div id="about-container">
        {/* About me element-1 */}
          <div className="about-elements">
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
           {/* About me element-2 */}
          <div className="about-elements">
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
           {/* About me element-3 */}
          <div className="about-elements">
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