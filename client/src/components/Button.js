import React from "react";
export default class Button extends React.Component {
  render() {
    return (
      <button onClick={() => this.props.func(this.props.value)}>
        {this.props.value}{" "}
      </button>
    );
  }
}
