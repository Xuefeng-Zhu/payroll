import React, { Component } from 'react'

class Employer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps() {
    this.checkEmployee();
  }

  checkEmployee = () => {
    const { payroll, employee, web3 } = this.props;
    payroll.checkEmployee.call(employee, {
      from: employee,
      gas: 1000000
    }).then((result) => {
      console.log(result)
      this.setState({
        salary: web3.fromWei(result[0].toNumber()),
        lastPaidDate: new Date(result[1].toNumber() * 1000)
      });
    });
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
    const { salary, lastPaidDate } = this.state;
    const { employee } = this.props;

    return (
      <div>
        <h2>Employee {employee}</h2>
        { !salary || salary === '0' ?
          <p>You are currently not employed</p> :
          (
            <div>
              <p>Salary: {salary}</p>
               <p>Last Paid Date: {lastPaidDate.toString()}</p>
              <button type="button" className="pure-button" onClick={this.getPaid}>Get Paid</button>
            </div>
          )
        }
      </div>
    );
  }
}

export default Employer
