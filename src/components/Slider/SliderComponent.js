import React from "react";
import { connect } from "react-redux";

//ACTIONS
import { filterRecords } from "../../actions";

//STYLE IMPORTS
import "rc-slider/assets/index.css";
import "../../assets/style.css";

//STYLE IMPORTS
import Tooltip from "rc-tooltip";
const Slider = require("rc-slider");

//SLIDER IMPORTS
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const { Handle } = Slider;

class SliderComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      min: 0,
      max: 0,
    };
  }

  componentDidMount() {
    this.getMinAndMax();
  }

  handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={value}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
  };

  getMinAndMax = () => {
    // min value will always be the first element in records arr
    const min = this.props.records.records[0].year;

    // max value will always be the last element in records arr
    const max = this.props.records.records.slice(0).reverse()[0].year;

    this.setState({ min: min, max: max });
  };

  handleChange = (e) => {
    // e: [selectedFromYear, selectedToYear]
    this.props.filterRecords(this.props.records, e);
  };

  render() {
    const min = this.props.records.records[0].year;
    const max = this.props.records.records.slice(0).reverse()[0].year;
    return (
      <div id="slider">
        <Range
          min={min}
          max={max}
          range={true}
          handle={this.handle}
          defaultValue={[min, max]}
          onChange={this.handleChange}
          tipFormatter={(value) => `${value}`}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    records: state.records,
  };
};

export default connect(mapStateToProps, { filterRecords })(SliderComponent);
