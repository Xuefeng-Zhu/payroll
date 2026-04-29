import React, { Component } from 'react'
import { Form, InputNumber, Button, message } from 'antd';

import Common from './Common';

const FormItem = Form.Item;

class Fund extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fund: undefined,
      submitting: false
    };
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { payroll, account, web3 } = this.props;
    const { fund } = this.state;

    this.setState({ submitting: true });
    payroll.addFund({
      from: account,
      value: web3.toWei(fund)
    }).then(() => {
      message.success('Fund added successfully.');
      this.setState({ fund: undefined, submitting: false });
    }).catch(() => {
      message.error('Unable to add fund.');
      this.setState({ submitting: false });
    });
  }

  render() {
    const { account, payroll, web3 } = this.props;
    const { fund, submitting } = this.state;

    return (
      <div>
        <Common account={account} payroll={payroll} web3={web3} />

        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem>
            <InputNumber
              min={1}
              value={fund}
              onChange={nextFund => this.setState({ fund: nextFund })}
            />
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              disabled={!fund || submitting}
            >
              Add fund
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Fund
