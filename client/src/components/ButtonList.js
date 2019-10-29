import React from "react";
import Button from "./Button";
export default class ButtonList extends React.Component {
  render() {
    let elements = [];
    for (let i = 0; i <= this.props.gamesNumber; i++) elements.push(i);

    return (
      <div>
        {elements.map(x => (
          <Button
            gameCounter={this.props.gamesNumber}
            func={this.props.function}
            value={x}
            key={x}
          />
        ))}
      </div>
    );
  }
}
