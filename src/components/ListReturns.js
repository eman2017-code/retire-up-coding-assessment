import React from "react";
// import Slider, { Range } from "rc-slider";

//DATA IMPORT
import returns from "../api/sp500.json";

//STYLE IMPORT
import "../assets/style.css";
// import "rc-slider/assets/index.css";

class ListReturns extends React.Component {
  constructor() {
    super();

    this.state = {
      records: [],
      cumulativeReturnArr: [],
    };
  }

  componentDidMount() {
    // set the records in ascending order
    returns.reverse();

    this.addCumulativeValues();
  }

  // sets the cumulative values for each record
  addCumulativeValues() {
    // list for totalReturns
    const totalReturnArr = [];

    // list for cumulative values
    const cumaltiveValues = [];

    // converts each totalReturn into a number
    returns.forEach((el) => {
      totalReturnArr.push(Number(el.totalReturn));
    });

    // create cumulative list of cumulative values
    totalReturnArr.reduce(function (a, b, i) {
      return (cumaltiveValues[i] = Math.round((a + b) * 100) / 100);
    }, 0);

    // iterates through newly created cumulativeValues[]
    // and adds appropriate keys to returns array
    const addedKeys = cumaltiveValues.map((elem, index) => {
      const copyObj = { ...returns[index] };
      copyObj.cumulativeKey = elem;
      return copyObj;
    });

    this.setState({ records: addedKeys });
  }

  // renders elements out of records
  renderRecordsData() {
    return this.state.records.map((record, i) => {
      const { year, totalReturn, cumulativeKey } = record;
      return (
        <tr key={i}>
          <td>{year}</td>
          <td>{totalReturn}</td>
          <td>{cumulativeKey}</td>
        </tr>
      );
    });
  }

  render() {
    // console.log("this.state in render", this.state);
    return (
      <div>
        {/* <Slider /> */}
        <h4>Slider Component will be going here</h4>
        <table id="returns">
          <thead>
            <tr>
              <th>Year</th>
              <th>Total Return</th>
              <th>Cumulative Return</th>
            </tr>
          </thead>
          <tbody>{this.renderRecordsData()}</tbody>
        </table>
      </div>
    );
  }
}

export default ListReturns;
