import React from "react";
import ReactForm from "../../Shared/ReactForm";
import {firestore} from "../../Firebase";


export default class LocationForm extends ReactForm {
  constructor(props) {
    super(props);
    if (props.initialLocation) {
      const {city, province, country} = props.initialLocation;
      this.state = {
        editing: false,
        city, province, country
      };
    } else {
      this.state = {
        editing: false,
        city: "",
        province: "",
        country: ""
      }
    }
  }

  onSubmit = async event => {
    event.preventDefault();
    const {clusterId} = this.props;
    const {city, province, country} = this.state;
    const location = {city, province, country};
    try {
      await firestore.collection("clusters")
        .doc(clusterId)
        .update({location});
    } catch (error) {
      console.error("Unable to update location", error);
    } finally {
      this.setState({editing: false});
    }
  };

  reset = () =>
    this.setState({
      editing: false,
      city: "",
      province: "",
      country: ""
    });

  render() {
    const {className, initialLocation} = this.props;
    if (this.state.editing) {
      const {city, province, country} = this.state;
      return <form className={className} onSubmit={this.onSubmit}>
        <label>
          City
          <input name="city"
                 value={city}
                 type="text"
                 maxLength="100"
                 onChange={this.handleInputChange}/>
        </label>
        <label>
          Province
          <input name="province"
                 value={province}
                 type="text"
                 maxLength="100"
                 onChange={this.handleInputChange}/>
        </label>
        <label>
          Country
          <input name="country"
                 value={country}
                 type="text"
                 maxLength="100"
                 onChange={this.handleInputChange}/>
        </label>
        <button type="submit" className="btn">
          Save
        </button>
        <button type="reset" className="btn" onClick={this.reset}>
          Cancel
        </button>
      </form>
    } else if (!initialLocation) {
      return <div className={className}>
        No location set
        <button type="button" className="btn" onClick={() => this.setState({editing: true})}>
          Add a location
        </button>
      </div>
    } else {
      const {city, province, country} = initialLocation;
      return <div className={className}>
        {city} {province} {country}
        <button type="button" className="btn" onClick={() => this.setState({editing: true})}>
          Edit Location
        </button>
      </div>
    }
  }
}