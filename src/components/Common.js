import React, { Component } from 'react'
import { Card, Col, Row, message } from 'antd';

class Common extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.watchers = [];
  }

  componentDidMount() {
    const { payroll } = this.props;
    const updateInfo = (error) => {
      if (!error) {
        this.checkInfo();
      }
    }

    this.watchers = [
      payroll.NewFund(updateInfo),
      payroll.GetPaid(updateInfo),
      payroll.NewEmployee(updateInfo),
      payroll.UpdateEmployee(updateInfo),
      payroll.RemoveEmployee(updateInfo)
    ];

    this.checkInfo();
  }

  componentWillUnmount() {
    this.watchers.forEach((watcher) => {
      if (watcher && watcher.stopWatching) {
        watcher.stopWatching();
      }
    });
  }

  checkInfo = () => {
    const { payroll, account, web3 } = this.props;
    payroll.checkInfo.call({
      from: account,
    }).then((result) => {
      this.setState({
        balance: web3.fromWei(result[0], 'ether').toString(10),
        runway: result[1].toNumber(),
        employeeCount: result[2].toNumber()
      })
    }).catch(() => {
      message.error('Unable to refresh contract info.');
    });
  }

  render() {
    const { runway, balance, employeeCount } = this.state;
    return (
      <div>
        <h2>Common info</h2>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Contract balance">{balance} Ether</Card>
          </Col>
          <Col span={8}>
            <Card title="Employee count">{employeeCount}</Card>
          </Col>
          <Col span={8}>
            <Card title="Runway">{runway}</Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Common
