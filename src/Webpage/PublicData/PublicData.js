import React from 'react'
import "./PublicData.css"
import {firestore, auth} from "../../Firebase";

export default class PublicData extends React.Component {
  constructor() {
    super()
    this.state = {
      items:null,
      isLoading:true
    }
    this.getFirestoredata=this.getFirestoredata.bind(this);
    this.CreateDownloadCards=this.CreateDownloadCards.bind(this);
  }
  componentDidMount(){
   
  }
  getFirestoredata() {
    firestore.collection('clusters')
      .get()
      .then(snapshot=>{
      const items = {}
      snapshot.forEach(item =>{
        items[item.id] = item.data()
      })
      this.setState({
        items,
        isLoading:false,
      })
      console.log(items);
    })
  }

  CreateDownloadCards(){
    if(this.state.isLoading){
      return <div>Loading</div>
    }
    else{
    return(
      <DownloadCard
        title="hello"
        place="ottawa"
      >
      </DownloadCard>
    )
    }
  }

  render() {
    return(
      <div id="PublicData_container">
        <h2>Search Results</h2>
        <div class="card_rows">
          {this.CreateDownloadCards()}
        </div> 
      </div>
    )
  }
}

class DownloadCard extends React.Component { 
  render() { 
    return (
      <div id="DownloadCard_container">
        <h2>{this.props.title}</h2>
        <h4>{this.props.place}</h4>
        <button>Download</button>
      </div>
    )
  }
}