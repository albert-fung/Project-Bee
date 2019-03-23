import React from "react";

export default class AddToHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deferredPrompt: null
    };
  }

  componentDidMount() {
    console.log("A2HS awaiting beforeInstallPrompt");
    window.addEventListener('beforeinstallprompt', event => {
      console.log("Got before install prompt event");
      event.preventDefault();
      this.setState({deferredPrompt: event});
    });
  }

  addToHomeScreen = async () => {
    this.state.deferredPrompt.prompt();
    const result = await this.state.deferredPrompt.userChoice;
    if (result.outcome === "accepted") {
      console.log("Accepted A2HS!");
    } else {
      console.log("Ignored A2HS");
    }
    this.setState({deferredPrompted: null});
  };

  render() {
    return this.state.deferredPrompt ?
      <button type="button"
              className="add-to-home-screen"
              onClick={this.addToHomeScreen}>
        Add to Home Screen?
      </button>
      : "";
  }
}