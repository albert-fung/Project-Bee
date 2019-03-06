import React from "react";
import firebase from "../Firebase";

export default class Messages extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      messages: [{title: "Sample", body: "Sample message"}]
    };
    firebase.messaging().onMessage(payload => this.addMessage(payload.notification));
  }

  addMessage = message => this.setState(state => ({
    messages: [
      message,
      ...state.messages
    ]
  }));

  render() {
    return <ol>
      {this.state.messages.map((message, index) =>
        <li key={index}>{JSON.stringify(message)}</li>
      )}
    </ol>
  }
}