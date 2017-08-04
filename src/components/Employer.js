import React, { Component } from 'react'

class Employer extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  addFund = () => {
    const { payroll, owner } = this.props;
    payroll.addFund({
      from: owner,
      value: this.fundInput.value
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

  calculateRunWay = () => {
    const { payroll, owner } = this.props;
    payroll.calculateRunWay.call({
      from: owner,
    }).then((result) => {
      alert(`The run way is ${result.c[0]} rounds`);
    });
  }

  hasEnoughfund = () => {
    const { payroll, owner } = this.props;
    payroll.hasEnoughFund.call({
      from: owner,
    }).then((result) => {
      alert(result);
    });
  }

  render() {
    return (
      <div>
        <form className="pure-form pure-form-stacked">
            <fieldset>
                <legend>Add fund</legend>

                <label>fund</label>
                <input
                  id="fund"
                  type="text"
                  placeholder="fund"
                  ref={(input) => { this.fundInput = input; }}/>

                <button type="button" className="pure-button pure-button-primary" onClick={this.addFund}>Add</button>
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

                <button type="button" className="pure-button pure-button-primary" onClick={this.updateEmployee}>Update</button>
                <button type="button" className="pure-button pure-button-primary" onClick={this.calculateRunWay}>Calculate Run Way</button>
                <button type="button" className="pure-button pure-button-primary" onClick={this.hasEnoughfund}>Has Enough Fund</button>
            </fieldset>
        </form>
      </div>
    );
  }
}

export default Employer
