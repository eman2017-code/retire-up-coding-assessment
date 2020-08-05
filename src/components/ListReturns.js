import React from "react";

//DATA IMPORT
import returns from "../api/sp500.json";

//STYLE IMPORT
import "../assets/style.css";

class ListReturns extends React.Component {
  constructor() {
    super();

    this.state = {
      records: [],
      cumulativeReturnArr: [],
      // headerNames: ["Year", "TotalReturn", ""]
    };
  }

  componentDidMount() {
    // set the records in ascending order
    returns.reverse();

    this.addCumulativeValues();
    this.createCumulativeKey();
  }

  // iterates through the json object and creates
  // a cumulativeKey key:value within each object
  createCumulativeKey = () => {
    const cumulativeValuesArr = this.state.cumulativeReturnArr;

    // // iterate through cumulativeReturnArr to grab each value
    // for (let i = 0; i < cumulativeValuesArr.length; i++) {
    //   // iterate through the returns array
    //   console.log("cumulativeValuesArr[i]", cumulativeValuesArr[i]);
    // }

    returns.map((record) => {
      record.cumulativeKey = "num";
      return record;
    });

    this.setState({ records: returns });
  };

  // sets the cumulative values for each record
  // in the returns array
  addCumulativeValues = () => {
    // list for totalReturns
    const totalReturnArr = [];

    // list for cumulative values
    const arr = [];

    // convert each totalReturn into a number
    returns.forEach((el) => {
      totalReturnArr.push(Number(el.totalReturn));
    });

    // create cumulative list of cumulative values
    totalReturnArr.reduce(function (a, b, i) {
      return (arr[i] = Math.round(a + b * 100) / 100);
    }, 0);

    // set cumulative returns array
    this.setState({ cumulativeReturnArr: arr });
    // this.state.cumulativeReturnArr.push(arr);
  };

  // renders elements out of records
  renderRecordsData = () => {
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
  };

  render() {
    // console.log("this.state in render", this.state);
    return (
      <div>
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
