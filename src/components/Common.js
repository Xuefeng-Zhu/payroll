import React, { Component } from 'react'

class Employer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  calculateRunWay = () => {
    const { payroll, account } = this.props;
    payroll.calculateRunWay.call({
      from: account,
    }).then((result) => {
      alert(`The run way is ${result.c[0]} rounds`);
    });
  }

  hasEnoughfund = () => {
    const { payroll, account } = this.props;
    payroll.hasEnoughFund.call({
      from: account,
    }).then((result) => {
      alert(result);
    });
  }

  render() {
    return (
      <div>
        <h2>Common Actions</h2>
        <div className="pure-button-group" role="group">
          <button type="button" className="pure-button" onClick={this.calculateRunWay}>Calculate Run Way</button>
          <button type="button" className="pure-button" onClick={this.hasEnoughfund}>Has Enough Fund</button>
        </div>
      </div>
    );
  }
}

export default Employer
