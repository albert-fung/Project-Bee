import React from "react"
import './Menu.css'

export default class Menu extends React.Component
{
    closeMenu()
    {
        document.getElementById("menu-container").style.width = "0px";
    }
    render()
    {
        return(
            <div id="menu-container">
              <div onClick={this.closeMenu} id="close-menu">&times;</div>
              <div id="title"><span className="black">Project </span><span className="orange">Bee</span></div>
              <ul id="menu-list">
                <li><span><i className="fas fa-home"></i></span>Home</li>
                <li><span><i className="fas fa-flask"></i></span>Reseachers</li>
                <li><span><i className="fas fa-users"></i></span>Bee keepers</li>
              </ul>   
            </div>
        );
    }
}