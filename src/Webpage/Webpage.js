import React from 'react';
import HiveGraphs from '../HiveGraphs/HiveGraphs.js';
import './NavBar.css';
import LandingPage from "./Landing-Page/Home.js";
import LogIn from "./Log-In/Log-In.js";
import {BrowserRouter as Router, Link,Route} from 'react-router-dom';

/*TODO: MAKE NAVBAR RESPONSIVE  */
export default class WebpageContainer extends React.Component
{render()
    {return(
      <div id="front-page">
      <Router>
        <div id="Router-container">
        {/*Nav-bar using Routers to create Single page application*/}
         <nav className="nav-bar">
            <h1 className="text-center"><span className="black">Project</span><span className="orange">Bee</span></h1>
            <ul className="text-right">
              <li><Link className="nav-element" to="/"><span><i className="fas fa-home"/>Home</span></Link></li>
              <li><Link className="nav-element" to="/My-Hive"><span><i className="fas fa-flask"/>My Hives</span></Link></li>
              <li><Link className="nav-element" to="/Public-Data"><span><i className="fas fa-users"/>Public Data</span></Link></li>
              <li><Link className="nav-element" to="/Open-Source"><span><i className="fas fa-code"/>Open Source</span></Link></li>
              <li><Link className="nav-element" to="/Log-In"><span><i className="fas fa-lock"/>Log in</span></Link></li>
              <li className="displaynone nav-element"><span><i className="fas fa-lock-open"/>Log out</span></li>
            </ul>
          </nav>
        {/*Routes that the above links point to TODO complete three other pages and connect them */}
          <Route path="/" exact={true} render={()=><LandingPage></LandingPage>}></Route>  
          <Route path="/My-Hive" render={()=><h1>RESVERED FOR MY-HIVE PAGE</h1>}></Route>
          <Route path="/Public-Data" render={()=><h1>RESERVERED FOR PUBLIC DATA PAGE</h1>}></Route>  
          <Route path="/Open-Source" render={()=><h1>RESERVERED FOR OPEN SOURCE PAGE</h1>}></Route>    
          <Route path="/Log-In" render={()=><LogIn></LogIn>}></Route>    
        </div>
      </Router>

      </div>
    );
  }
}

