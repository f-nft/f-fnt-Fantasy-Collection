import React, { Component } from "react";
import ReactDOM from "react-dom";

class Maticprice extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  componentDidMount() {
    fetch(`https://api.binance.com/api/v3/avgPrice?symbol=MATICUSDT`)
      .then(res => res.json())
      .then(json => this.setState({ data: json }));
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.data.map(el => (
            <li>
              {el.price}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Maticprice;

ReactDOM.render(<Maticprice />, document.getElementById("maticprice"));