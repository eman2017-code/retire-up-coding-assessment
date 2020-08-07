import React from "react";
import { connect } from "react-redux";
import { listAllRecords } from "../../actions";

//COMPONENT IMPORTS
import SliderComponent from "../Slider/SliderComponent";

//STYLE IMPORT
import "../../assets/style.css";

class ListReturns extends React.Component {
  componentDidMount() {
    this.props.listAllRecords();
  }

  renderFilteredRecordsData = () => {
    return this.props.records.filteredRecords.map((filteredRecord, i) => {
      const { year, totalReturn, cumulativeKey } = filteredRecord;
      return (
        <tr key={i}>
          <td>{year}</td>
          <td>{totalReturn}</td>
          <td>{cumulativeKey}</td>
        </tr>
      );
    });
  };

  // renders elements out of records
  renderRecordsData = () => {
    return this.props.records.records.map((record, i) => {
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
    return (
      <div>
        {/* Makes sure state is set before passes empty props to next component */}
        {this.props.records.records.length === 0 ? (
          "Loading..."
        ) : (
          <SliderComponent records={this.props.records} />
        )}
        <table id="returns">
          <thead>
            <tr>
              <th>Year</th>
              <th>Total Return</th>
              <th>Cumulative Return</th>
            </tr>
          </thead>
          {!this.props.records.isFiltering ? (
            <tbody>{this.renderRecordsData()}</tbody>
          ) : (
            <tbody>{this.renderFilteredRecordsData()}</tbody>
          )}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    records: state.records,
    filteredRecords: state.records.filteredRecords,
    isFiltering: state.records.isFiltering,
  };
};

// export default ListReturns;
export default connect(mapStateToProps, {
  listAllRecords,
})(ListReturns);
