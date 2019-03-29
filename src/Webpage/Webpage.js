import React,{lazy,Suspense} from 'react';
import './NavBar.css';
import LandingPage from "./Landing-Page/Home";
import MyClusters from "./MyClusters/MyClusters";
import MyHives from "./MyHives/MyHives";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import {auth, firestore} from "../Firebase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUsers,faCode,faLock,faUnlock,faBars, faProjectDiagram, faPager} from "@fortawesome/free-solid-svg-icons";

const LogIn= lazy(()=>import("./Log-In/Log-In"));
const SignUp= lazy(()=>import("./SignUp/SignUp"));

export default class WebpageContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded:false,
      user: "",
      clusters: []
    };
    this.logOut = this.logOut.bind(this);
    this.onClustersUpdated = this.onClustersUpdated.bind(this);
    this.HandleDropdown= this.HandleDropdown.bind(this);
    this.LoginLogoutIcon = this.LoginLogoutIcon.bind(this);
  }

  async logOut() {
    await auth.signOut();
    //redirect to home screen after logging out
    setTimeout(function(){document.location.href = "/"},500);
  }

  onClustersUpdated(snapshot) {
    // Sets IDs and parses all cluster data
    const clusters = snapshot.docs.map(snap => ({
      id: snap.id,
      ...snap.data()
    }));
    // Converts hive objects to lists that have an ID
    clusters.forEach(cluster => {
      cluster.hives = Object.entries(cluster.hives)
        .map(([id, hive]) => ({
          id,
          ...hive
        }));
    });
    console.log("Updated clusters");
    this.setState({clusters});
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user,
          isLoaded:true
        });
        firestore.collection("clusters")
          .where("owners", "array-contains", user.email)
          .onSnapshot(this.onClustersUpdated);
      } else {
        this.setState({user: null,
        isLoaded:true})
      }
    });
  }
  //Checks if user is logged in and will present respective icon (log in or log out)
  LoginLogoutIcon() {
  if (!this.state.isLoaded){
    return null;
  }
  return this.state.user == null ? 
    <li>
      <Link className="nav-element white" to="/Log-In">
        <FontAwesomeIcon icon={faLock}/><span>Login</span>
      </Link>
    </li> 
    :
    //if user is logged in 
    <span>
      <li>
        <Link className="nav-element white" to="/My-Hive">
          <FontAwesomeIcon icon={faPager}/><span>My Hives</span>
        </Link>
      </li>
      <li>
      <Link className="nav-element white" to="/My-Clusters">
      {/* Todo: unique icon for clusters */}
        <FontAwesomeIcon icon={faProjectDiagram}/><span>My Clusters</span>
      </Link>
    </li>
      <li>
        <button className="nav-element logout-btn white" onClick={this.logOut}>
          <FontAwesomeIcon icon={faUnlock}/><span>Logout</span>
        </button>
      </li> 
    </span>
  }

  // Toggling dropdown in mobile mode vs desktop mode 
  HandleDropdown(){
  var navbar=document.getElementById('nav-menu');
  navbar.classList === 'nav-menu' ?
  navbar.classList.add('displaymenumobile'):
  navbar.classList.remove('displaymenumobile');
  }

  render() {
    return (
      <div id="front-page">
        <Router>
          <div id="Router-container">
            {/*Nav-bar using Routers to create Single page application*/}
            <nav className="nav-bar">
            <Link to="/">
              <h1 className="header text-center">
                <span className="white">Project</span>
                <span className="orange">Bee</span>
              </h1>
            </Link>
              <span onClick={this.HandleDropdown} className="dropdown-btn"><FontAwesomeIcon size={"2x"} icon={faBars}/></span>
              <ul id="nav-menu" className="nav-menu">

                <li>
                  <Link className="nav-element white" to="/Public-Data">
                    <FontAwesomeIcon icon={faUsers}/><span>Public Data</span>
                  </Link>
                </li>
                <li>
                  <Link className="nav-element white" to="/Open-Source">
                    <FontAwesomeIcon icon={faCode}/><span>Open Source</span>
                  </Link>
                </li>
                {this.LoginLogoutIcon()}
              </ul>
             
            </nav>
            {/*Routes that the above links point to TODO complete three other pages and connect them */}
            <Route path="/" exact={true} component={LandingPage}/>
            <Route path="/My-Hive" render={() => <MyHives clusters={this.state.clusters}/>}/>
            <Route path="/My-Clusters" render={() => <MyClusters clusters={this.state.clusters}/>}/>
            <Route path="/Public-Data" render={() => <h1>RESERVERED FOR PUBLIC DATA PAGE </h1>}/>
            <Route path="/Open-Source" render={() => <h1>RESERVERED FOR OPEN SOURCE PAGE</h1>}/>
            <Suspense fallback={<div>loading</div>}>
              <Route path="/Log-In" component={LogIn}/>
              <Route path="/Sign-Up" component={SignUp}/>
            </Suspense>
          </div>
        </Router>
      </div>
    );
  }
}

