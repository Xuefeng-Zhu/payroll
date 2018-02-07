import React, { Component } from 'react'
import { Card, Col, Row, Layout, Alert, message, Button } from 'antd';

import Common from './Common';

class Employer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.checkEmployee();
  }

  checkEmployee = () => {
    const { payroll, account, web3 } = this.props;
    payroll.employees.call(account, {
      from: account,
    }).then((result) => {
      this.setState({
        salary: web3.fromWei(result[1].toNumber()),
        lastPaidDate: new Date(result[2].toNumber() * 1000).toString()
      });
    });

    web3.eth.getBalance(account, (err, result) => {
      this.setState({
        balance: web3.fromWei(result.toNumber())
      });
    });
  }

  getPaid = () => {
    const { payroll, account } = this.props;
    payroll.getPaid({
      from: account,
    }).then((result) => {
      message.info(`You have been paid`);
    });
  }

  renderContent() {
    const { salary, lastPaidDate, balance } = this.state;

    if (!salary || salary === '0') {
      return   <Alert message="You are not employee" type="error" showIcon />;
    }

    return (
      <div>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Salary">{salary} Ether</Card>
          </Col>
          <Col span={8}>
            <Card title="Last paid date">{lastPaidDate}</Card>
          </Col>
          <Col span={8}>
            <Card title="Balance">{balance} Ether</Card>
          </Col>
        </Row>

        <Button
          type="primary"
          icon="bank"
          onClick={this.getPaid}
        >
          Get paid
        </Button>
      </div>
    );
  }

  render() {
    const { account, payroll, web3 } = this.props;

    return (
      <Layout style={{ padding: '0 24px', background: '#fff' }}>
        <Common account={account} payroll={payroll} web3={web3} />
        <h2>Personal info</h2>
        {this.renderContent()}
      </Layout >
    );
  }
}

export default Employer