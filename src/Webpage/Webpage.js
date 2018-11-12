import React from 'react';
import HiveGraphs from '../HiveGraphs/HiveGraphs.js';
import './NavBar.css';
import LandingPage from "./Landing-Page/Home.js";
import LogIn from "./Log-In/Log-In.js";
import MyHive from "./My-Hive/My-Hive.js";
import {BrowserRouter as Router, Link,Route} from 'react-router-dom';

/*TODO: MAKE NAVBAR RESPONSIVE  */


export default class WebpageContainer extends React.Component
{
  /*Open and close menu when in responsive mode */
  menuclick(){
  
    var nav=document.getElementById('nav-list');
    nav.style.display = (nav.style.display == '') ? 'block' : ''; 
  }

  render(){return(
    <div id="front-page"><Router>
      <div id="Router-container">
      {/*Nav-bar using Routers to create Single page application*/}
        <div id="HeaderNav-container">
          <div id="header" className="text-center">
            <span className="black">Project</span><span className="orange">Bee</span>
          </div>
          <div className="nav-bar">       
            <div id="dropdown-btn" onClick={this.menuclick.bind(this)}><i class="fas fa-bars fa-2x"></i></div>
              <div id="nav-list">
                <div className="nav-container"><Link className="nav-element" to="/"><span>
                  <i className="fas fa-home"/>Home</span></Link>
                </div>
                <div className="nav-container"><Link className="nav-element" to="/My-Hive"><span>
                  <i className="fas fa-flask"/>My Hives</span></Link>
                </div>
                <div className="nav-container"><Link className="nav-element" to="/Public-Data"><span>
                  <i className="fas fa-users"/>Public Data</span></Link>
                </div>
                <div className="nav-container"><Link className="nav-element" to="/Open-Source"><span>
                  <i className="fas fa-code"/>Open Source</span></Link>
                </div>
                <div className="nav-container"><Link className="nav-element" to="/Log-In"><span>
                  <i className="fas fa-lock"/>Log in</span></Link>
                </div>
                <div className="nav-container nav-element displaynone"><span>
                  <i className="fas fa-lock-open"/>Log out</span>
                </div>      
              </div>
            </div>
          </div>
        {/*Routes that the above links point to TODO complete other pages */}
          <Route path="/" exact={true} render={()=><LandingPage></LandingPage>}></Route>  
          <Route path="/My-Hive" render={()=><MyHive></MyHive>}></Route>
          <Route path="/Public-Data" render={()=><h1>RESERVERED FOR PUBLIC DATA PAGE</h1>}></Route>  
          <Route path="/Open-Source" render={()=><h1>RESERVERED FOR OPEN SOURCE PAGE</h1>}></Route>    
          <Route path="/Log-In" render={()=><LogIn></LogIn>}></Route>    
        </div>
      </Router>
      </div>
    );
  }
}

