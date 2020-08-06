import React from "react";
import { connect } from "react-redux";

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
    const min = this.props.records[0].year;

    // max value will always be the last element in records arr
    const max = this.props.records.slice(0).reverse()[0].year;

    this.setState({ min: min, max: max });
  };

  handleChange = (e) => {
    console.log(e);
  };

  render() {
    return (
      <div id="slider">
        <Range
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

export default connect(mapStateToProps, {})(SliderComponent);
