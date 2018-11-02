import React from 'react';
import Slider from "react-slick";
import HiveGraphs from '../HiveGraphs/HiveGraphs.js'
import NavBar from "../NavBar/NavBar";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import "./Hero.css"

export default class Webpage extends React.Component
{render()
    {return(
      <div id="front-page">
       <NavBar/>
        <div id="hero">
          <HeroSlider></HeroSlider>
        </div>
                {/* Will re-add later
                <HiveGraphs/>
                */}
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
          <div className="layer"></div>
        </div>
        <div className="carosuel-container slide-2">
          <div className="layer"></div>
        </div>
        <div className="carosuel-container slide-3">
          <div className="layer"></div>
        </div>
        <div className="carosuel-container slide-4">
          <div className="layer"></div>
        </div>
      </Slider>
    );
  }
}