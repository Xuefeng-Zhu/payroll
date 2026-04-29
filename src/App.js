import React, { Component } from 'react'
import PayrollContract from '../build/contracts/Payroll.json'
import getWeb3 from './utils/getWeb3'

import { Layout, Menu, Spin, Alert, message } from 'antd';

import Employer from './components/Employer';
import Employee from './components/Employee';

import 'antd/dist/antd.css';
import './App.css';

const { Header, Content, Footer } = Layout;

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      mode: 'employer',
      loadingContract: true
    }
  }

  componentDidMount() {
    getWeb3
      .then(results => {
        this.setState({ web3: results.web3 });
        this.instantiateContract(results.web3);
      })
      .catch(() => {
        message.error('Unable to initialize web3 provider.');
        this.setState({ loadingContract: false });
      })
  }

  async instantiateContract(web3) {
    if (window.ethereum && window.ethereum.request) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        message.error('Wallet access is required to continue.');
        this.setState({ loadingContract: false });
        return;
      }
    }

    const contract = require('truffle-contract')
    const Payroll = contract(PayrollContract)
    Payroll.setProvider(web3.currentProvider)

    web3.eth.getAccounts((error, accounts) => {
      if (error || !accounts || !accounts.length) {
        message.error('No Ethereum account is available.');
        this.setState({ loadingContract: false });
        return;
      }

      const account = accounts[0];
      this.setState({ account });

      Payroll.deployed().then((instance) => {
        this.setState({
          payroll: instance,
          loadingContract: false
        });
      }).catch(() => {
        message.error('Unable to connect to deployed Payroll contract.');
        this.setState({ loadingContract: false });
      });
    })
  }

  onSelectTab = ({ key }) => {
    this.setState({
      mode: key
    });
  }

  renderContent = () => {
    const { account, payroll, web3, mode, loadingContract } = this.state;

    if (loadingContract) {
      return <Spin tip="Loading..." />;
    }

    if (!payroll) {
      return <Alert message="Payroll contract is unavailable." type="error" showIcon />;
    }

    switch (mode) {
      case 'employer':
        return <Employer account={account} payroll={payroll} web3={web3} />
      case 'employee':
        return <Employee account={account} payroll={payroll} web3={web3} />
      default:
        return <Alert message="Please choose a mode" type="info" showIcon />
    }
  }

  render() {
    return (
      <Layout>
        <Header className="header">
          <div className="logo">老董区块链干货铺员工系统</div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['employer']}
            style={{ lineHeight: '64px' }}
            onSelect={this.onSelectTab}
          >
            <Menu.Item key="employer">Employer</Menu.Item>
            <Menu.Item key="employee">Employee</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Layout style={{ padding: '24px 0', background: '#fff', minHeight: '600px' }}>
            {this.renderContent()}
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Payroll ©2017 老董区块链干货铺
        </Footer>
      </Layout>
    );
  }
}

export default App
