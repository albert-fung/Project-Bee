import React from 'react'
import Menu from './Menu/Menu.js'

export default class Webpage extends React.Component
{

    render()
    {
        return(
            <div>
            <Menu id="menu"></Menu>
            <i id="menu-icon" onClick={this.openMenu} className="fas fa-ellipsis-v"></i>
            <div className="bee-container"><img id="bee-mascot" src="images/Bee.png" alt="Bee picture"></img></div>
            <div id="subtitle">Buzz.</div>
            </div>
        );
    }
}