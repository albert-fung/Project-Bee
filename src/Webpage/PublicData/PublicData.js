import React from 'react'
import "./PublicData.css"
import {firestore, auth} from "../../Firebase";

const dateTimeOptions = {month: "numeric", day: "numeric" , hour: "numeric", minute: "2-digit"};
const DateFormatter = new Intl.DateTimeFormat("en-GB", dateTimeOptions);

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
    this.getFirestoredata()
  }
  /**
   * Getting firestore data for each cluster that is 
   * public and creating it into objects to put into 
   * this.state
   */
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
    })
  }

  /**
   * If data is still loading from firebase put loading 
   * Else 
   * create cards through this.state.items for each public cluster
   */
  CreateDownloadCards(){
    if(this.state.isLoading){
      return <div>Loading...</div>
    }
    else{
      let data = Object.values(this.state.items)
      let keys = Object.keys(this.state.items);

      return(
        data.map((data,i)=>
        <DownloadCard 
          id={keys[i]}
          hives = {data.hives}
          title={data.name} 
          place="ottawa"
        >
        </DownloadCard>
    ))
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

/**
 * Single download card 
 */
class DownloadCard extends React.Component { 
  constructor(){
    super()
    this.state={hiveSelected:null}
    this.getHivedata=this.getHivedata.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.createCSV = this.createCSV.bind(this);
  }
  /**
   * Gets measurment data from firebase 
   * @param {string} id ID provided by firebase for respective hive
   */
  getMeasurementData(id){
    firestore.collection("measurements")
      .doc(id)
      .collection("hives")
      .doc(this.state.hiveSelected)
      .collection("measurements")
      .orderBy("date","desc")
      .limit(31*24*4)
      .get()
      .then(snapshot=>{
        let data = snapshot.docs.map(snap =>({
          id:snap.id,
          ...snap.data()
        })).reverse();

        const times = data.map(measurement=>this.formatDate(measurement.date))
        console.log(data[0]);
        console.log(times[0]);
        this.createCSV(data,times)
      })
  }
  /**
   * 
   * @param {Object} data 
   * Data provided through firebase for specific 
   * cluster of a hive  
   * @param {Object} time 
   * Times for the respective data points 
   */
  createCSV(data,time){
    const datafields = ['Date','Rime','Air Quality','Number of Bees','Frequency','Humidity','Temperature']
    const datapoints = Object.values(data);
    const timepoints = Object.values(time);
    //Creating csv content using .join(",");
    let csvContent = 
    "data:text/csv;charset=utf-8," + 
    datafields.join(",")+"\n"+
    timepoints.map((time,i)=>{return(
      time+","+
      datapoints[i].air_quality+","+
      datapoints[i].bees+","+
      datapoints[i].frequency+","+
      datapoints[i].humidity+","+
      datapoints[i].temperature)
    }).join("\n")

    //creating downloadable file for CSV and auto downloads
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Data.csv");
    document.body.appendChild(link); // Required for FF
    link.click();

  }
  /**
   * Changes date format
   * @param {string} data 
   */
  formatDate(data) {
    const date = new Date(data.seconds * 1000);
    return DateFormatter.format(date);
  }
  /**
   * Provides hive option for each cluster 
   */
  getHivedata() {
    let hives = Object.values(this.props.hives);
    let hivesID = Object.keys(this.props.hives);
    return hives.map((data,i)=>
      <option value={hivesID[i]}>
        {data.name}
      </option>)
  }
  /**
   * Sets this.state.hiveSelect to its currently selected value
   * @param {DOM element} e 
   */
  HandleSelect(e){
    let hiveSelected = e.target.options[e.target.selectedIndex].value
    this.setState({hiveSelected});
  }
  render() { 
    return (
      <div id="DownloadCard_container">
        <h2>{this.props.title}</h2>
        <h4>{this.props.place}</h4>
          <select onChange={(e)=>this.HandleSelect(e)} class="Hive-select" >
            <option value={null} disabled selected>Choose a Hive</option>
            {this.getHivedata()}
          </select>
        <button onClick={()=>this.getMeasurementData(this.props.id)}>Download</button>
      </div>
    )
  }
}