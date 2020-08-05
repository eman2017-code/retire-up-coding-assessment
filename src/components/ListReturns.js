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
    };
  }

  componentDidMount() {
    // set the records in ascending order
    returns.reverse();
    this.createCumulativeKey();
    this.addCumulativeValue();
  }

  // iterates through the json object and creates
  // a cumulativeKey key:value within each object
  createCumulativeKey() {
    returns.map(function (record) {
      record.cumulativeKey = "";
      return record;
    });
  }

  // sets the cumulative values for each record
  // in the returns array
  addCumulativeValue() {
    const totalReturnArr = [];
    const arr = [];

    returns.forEach((el) => {
      // convert each totalReturn into a number
      totalReturnArr.push(Number(el.totalReturn));
    });

    // create cumulative list of cumulative values
    totalReturnArr.reduce(function (a, b, i) {
      return (arr[i] = a + b);
    }, 0);

    this.state.cumulativeReturnArr.push(arr);
  }

  //   renderTableHeader() {
  //     let header = Object.keys(this.state.records[0]);
  //     console.log(header);
  //     return header.map((key, i) => {
  //       return <th key={i}>{key.toUpperCase()}</th>;
  //     });
  //   }

  //   renderRow() {
  //     return this.state.records.map((record, i) => {
  //       const { year, totalReturn, cumulativeReturn } = record;

  //       return (
  //         <tr key={i}>
  //           <td>{year}</td>
  //           <td>{totalReturn}</td>
  //           <td>{cumulativeReturn}</td>
  //         </tr>
  //       );
  //     });
  //   }

  render() {
    return (
      <div>
        {/* <table id="returns">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderRow()}
          </tbody>
        </table> */}
      </div>
    );
  }
}

export default ListReturns;
