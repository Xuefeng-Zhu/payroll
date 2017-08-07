import React, { Component } from 'react'

class Employer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getPaid = () => {
    const { payroll, employee } = this.props;
    payroll.getPaid({
      from: employee,
      gas: 1000000
    }).then((result) => {
      alert(`You have been paid`);
    });
  }

  render() {
    return (
      <div>
        <h2>Employee</h2>
        <button type="button" className="pure-button" onClick={this.getPaid}>Get Paid</button>
      </div>
    );
  }
}

export default Employer
