import React from 'react';
import HiveGraphs from './HiveGraphs/HiveGraphs.js'
import NavBar from "./NavBar/NavBar";

export default class Webpage extends React.Component
{

    render()
    {
        return(
            <div>
                <NavBar/>
                <HiveGraphs/>
            </div>
        );
    }
};