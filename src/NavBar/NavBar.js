import React from 'react';
import './NavBar.css';
/* TODO
   Make Responsive
*/

export default class NavBar extends React.Component {
    render() {
        return (
            <nav className="nav-bar">
                <h1 className="text-center"><span className="black">Project </span><span className="orange">Bee</span></h1>
                <ul className="text-right">
                    <li><i className="fas fa-home"/>Home</li>
                    <li><i className="fas fa-flask"/>My Hives</li>
                    <li><i className="fas fa-users"/>Public Data</li>
                    <li><i className="fas fa-code"/>Open Source</li>
                </ul>
            </nav>
        );
    };
}