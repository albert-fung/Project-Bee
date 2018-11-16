import React from 'react';
import './NavBar.css';
import LandingPage from "./Landing-Page/Home";
import LogIn from "./Log-In/Log-In";
import SignUp from "./SignUp/SignUp";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import MyClusters from "./MyClusters/MyClusters";
import {auth, firestore} from "../Firebase";
import MyHives from "./MyHives/MyHives";

/*TODO: MAKE NAVBAR RESPONSIVE  */
export default class WebpageContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      user: null,
      clusters: []
    };
    this.logOut = this.logOut.bind(this);
    this.onClustersUpdated = this.onClustersUpdated.bind(this);
  }

  async logOut() {
    await auth.signOut();
  }

  onClustersUpdated(snapshot) {
    const clusters = snapshot.docs.map(snap => ({
      id: snap.id,
      ...snap.data()
    }));
    this.setState({clusters});
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({user});
        firestore.collection("clusters")
          .where("owners", "array-contains", user.email)
          .onSnapshot(this.onClustersUpdated);
      } else {
        this.setState({user: null})
      }
    });
  }

  render() {
    return (
      <div id="front-page">
        <Router>
          <div id="Router-container">
            {/*Nav-bar using Routers to create Single page application*/}
            <nav className="nav-bar">
              <h1 className="text-center"><span className="black">Project</span><span className="orange">Bee</span></h1>
              <ul className="text-right">
                <li><Link className="nav-element" to="/"><span><i className="fas fa-home"/>Home</span></Link></li>
                <li>
                  <Link className="nav-element" to="/My-Hive">
                    <span><i className="fas fa-flask"/>My Hives</span>
                  </Link>
                </li>
                <li>
                  <Link className="nav-element" to="/My-Clusters">
                    {/* Todo: unique icon for clusters */}
                    <span><i className="fas fa-flask"/>My Clusters</span>
                  </Link>
                </li>
                <li>
                  <Link className="nav-element" to="/Public-Data">
                    <span><i className="fas fa-users"/>Public Data</span>
                  </Link>
                </li>
                <li>
                  <Link className="nav-element" to="/Open-Source">
                    <span><i className="fas fa-code"/>Open Source</span>
                  </Link>
                </li>
                <li>
                  <Link className="nav-element" to="/Log-In">
                    <span><i className="fas fa-lock"/>Login</span>
                  </Link>
                </li>
                <li>
                  <button className="nav-element" onClick={this.logOut}>
                    <span><i className="fas fa-lock"/>Logout</span>
                  </button>
                </li>
                <li className="displaynone nav-element"><span><i className="fas fa-lock-open"/>Log out</span></li>
              </ul>
            </nav>
            {/*Routes that the above links point to TODO complete three other pages and connect them */}
            <Route path="/" exact={true} component={LandingPage}/>
            <Route path="/My-Hive" render={() => <MyHives clusters={this.state.clusters}/>}/>
            <Route path="/My-Clusters" render={() => <MyClusters clusters={this.state.clusters}/>}/>
            <Route path="/Public-Data" render={() => <h1>RESERVERED FOR PUBLIC DATA PAGE</h1>}/>
            <Route path="/Open-Source" render={() => <h1>RESERVERED FOR OPEN SOURCE PAGE</h1>}/>
            <Route path="/Log-In" component={LogIn}/>
            <Route path="/Sign-Up" component={SignUp}/>
          </div>
        </Router>

      </div>
    );
  }
}

