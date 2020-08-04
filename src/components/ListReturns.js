import React from "react";

//DATA IMPORT
import returns from "../api/sp500.json";

//STYLE IMPORT
import "../assets/style.css";

class ListReturns extends React.Component {
  constructor() {
    super();

    this.state = {
      records: returns,
    };
  }

  listReturns() {
    return this.state.records.map((record, i) => {
      const { year, totalReturn, cummulativeReturn } = record;
      return (
        <div>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Total Return</th>
                <th>Cummulative Return</th>
              </tr>
            </thead>
            <tbody>
              <tr key={i}>
                <td>{year}</td>
                <td>{totalReturn}</td>
                <td>{cummulativeReturn}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });
  }

  render() {
    return (
      <section>
        <table>
          <tbody>
            <tbody id="returns">
              <tr>{this.listReturns()}</tr>
            </tbody>
          </tbody>
        </table>
      </section>
    );
  }
}

export default ListReturns;
