import React from "react";
import { connect } from "react-redux";
import { filterRecords } from "../../actions";

//COMPONENT IMPORTS
import Slider, { Range } from "rc-slider";
import Tooltip from "rc-tooltip";

//STYLE IMPORTS
import "rc-slider/assets/index.css";
import "../../assets/style.css";

const { Handle } = Slider;

class SliderComponent extends React.Component {
  constructor(props) {
    super(props);

    // console.log(this.props);

    this.state = {
      min: 0,
      max: 0,
      marks: {},
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

  // componentDidMount() {
  //   this.setMarks();
  // }

  // setMarks = () => {
  //   const marks = {
  //     0: this.state.min,
  //     1: this.state.max,
  //   };

  //   // console.log(marks);

  //   this.setState({ marks: marks });
  // };

  getMinAndMax = () => {
    // min value will always be the first element in records arr
    const min = this.props.records.records[0].year;

    // max value will always be the last element in records arr
    const max = this.props.records.records.slice(0).reverse()[0].year;

    this.setState({ min: min, max: max });
  };

  handleChange = (e) => {
    console.log(e);
    // console.log(this.props.records);
    // this.props.filterRecords(this.props.records);
  };

  render() {
    // console.log(this.state.marks);
    return (
      <div id="slider">
        <Slider.Range
          // marks={this.state.marks}
          min={this.state.min}
          max={this.state.max}
          handle={this.handle}
          onChange={this.handleChange}
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
