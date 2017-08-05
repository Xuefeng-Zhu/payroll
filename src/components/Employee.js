import React, { Component } from 'react'

class Employer extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  addFund = () => {
    const { payroll, owner, web3 } = this.props;
    payroll.addFund({
      from: owner,
      value: web3.toWei(this.fundInput.value)
    }).then((result) => {
      alert(`success`);
    });
  }

  updateEmployee = () => {
    const { payroll, owner } = this.props;
    console.log(this.employeeInput.value, this.salaryInput.val)
    payroll.updateEmployee(this.employeeInput.value, parseInt(this.salaryInput.value), {
      from: owner,
      gas: 1000000
    }).then((result) => {
      alert(`success`);
    });
  }

  render() {
    return (
      <div>
        <h2>Employee</h2>
        <form className="pure-form pure-form-stacked">
          <fieldset>
            <legend>Add fund</legend>

            <label>fund</label>
            <input
              id="fund"
              type="text"
              placeholder="fund"
              ref={(input) => { this.fundInput = input; }}/>

            <button type="button" className="pure-button" onClick={this.addFund}>Add</button>
          </fieldset>
        </form>

        <form className="pure-form pure-form-stacked">
          <fieldset>
            <legend>Update Employee</legend>

            <label>employee id</label>
            <input
              id="employee"
              type="text"
              placeholder="employee"
              ref={(input) => { this.employeeInput = input; }}/>

            <label>salary</label>
            <input
              id="salary"
              type="text"
              placeholder="salary"
              ref={(input) => { this.salaryInput = input; }}/>

            <button type="button" className="pure-button" onClick={this.updateEmployee}>Update</button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Employer
