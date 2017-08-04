import React, { Component } from 'react'
import PayrollContract from '../build/contracts/Payroll.json'
import getWeb3 from './utils/getWeb3'

import Accounts from './components/Accounts';
import Employer from './components/Employer';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const Payroll = contract(PayrollContract)
    Payroll.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on Payroll.
    var PayrollInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.setState({
        accounts
      });
      Payroll.deployed().then((instance) => {
        PayrollInstance = instance
        this.setState({
          payroll: instance
        });

        instance.NewEmployee(function(error, result){
            // result will contain various information
            // including the argumets given to the Deposit
            // call.
            console.log(error)
            if (!error)
                console.log(result);
        });
      })
    })
  }

  render() {
    const { accounts, payroll } = this.state;

    if (!accounts) {
      return <div>Loading</div>;
    }

    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Payroll</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <Accounts accounts={accounts} />
              <Employer owner={accounts[0]} payroll={payroll} />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
