import React from 'react'
import Menu from './Menu/Menu.js'
import HiveGraphs from './HiveGraphs/HiveGraphs.js'

export default class Webpage extends React.Component
{

    render()
    {
        return(
            <div>
                <Menu id="menu"></Menu>
                <i id="menu-icon" onClick={this.openMenu} className="fas fa-ellipsis-v"></i>
                <div className="bee-container">
                    <HiveGraphs/>
                </div>
            </div>
        );
    }
};