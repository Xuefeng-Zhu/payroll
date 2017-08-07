import React, { Component } from 'react'

class Employer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { payroll, web3 } = this.props;
    payroll.NewFund((error, result) => {
      if (!error) {
        console.log(result);
        this.setState({
          balance: web3.fromWei(result.args.value.toNumber())
        });
        this.calculateRunWay();
      }
    });
    this.calculateRunWay();
  }

  calculateRunWay = () => {
    const { payroll, account } = this.props;
    payroll.calculateRunWay.call({
      from: account,
    }).then((result) => {
      this.setState({
        runway: result.toNumber()
      })
    });
  }

  render() {
    const { runway, balance } = this.state;
    return (
      <div>
        <h2>Common Info</h2>
        {balance && <p>Balance: {balance}</p>}
        <p>Runway: {runway}</p>
        <p>Has Enough Fund: {(runway > 0).toString()}</p>
      </div>
    );
  }
}

export default Employer
