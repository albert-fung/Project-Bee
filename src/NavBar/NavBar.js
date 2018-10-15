import React from 'react';
import './NavBar.css';


export default class NavBar extends React.Component {
    render() {
        return (
            <nav className="nav-bar">
                <h1 className="text-center"><span className="black">Project </span><span className="orange">Bee</span></h1>
                <ul className="text-right">
                    <li><i className="fas fa-home"/>About</li>
                    <li><i className="fas fa-flask"/>My Hives</li>
                    <li><i className="fas fa-users"/>Public Data</li>
                </ul>
            </nav>
        );
    };
}