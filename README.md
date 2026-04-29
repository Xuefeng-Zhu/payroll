# Payroll DApp

A lightweight Ethereum payroll system for small teams and contractors.

## Features

- Add, update, and remove employees
- Fund the payroll contract from an employer account
- Let employees withdraw salary on payday
- Show contract-level and account-level payroll metrics

## Project structure

- `contracts/`: Solidity contracts and payroll business rules
- `migrations/`: Truffle deployment scripts
- `src/`: React UI and web3 integration
- `test/`: Solidity and JavaScript tests

## Local development (recommended)

### Prerequisites

- Node.js 18+ (or the latest active LTS)
- npm 9+
- Ganache (GUI or CLI)
- MetaMask

### 1) Install dependencies

```bash
npm install
```

If your environment cannot access GitHub over SSH and `npm install` fails with `ssh://git@github.com/...`, force Git to use HTTPS:

```bash
git config --global url."https://github.com/".insteadOf ssh://git@github.com/
```

Then run `npm install` again.

### 2) Run a local chain

Start Ganache and keep it running on `http://localhost:8545`.

### 3) Deploy contracts

```bash
truffle compile
truffle migrate --reset
```

### 4) Start the app

```bash
npm run start
```

## Best-practice notes

- Use a dedicated wallet/account for local development.
- Never import production private keys into a local test wallet.
- Reset and re-migrate contracts after changing Solidity storage or constructor logic.
- Keep UI values in ETH for display, but persist contract values in wei.

## Testing

```bash
npm test -- --watch=false
```

For smart contract flows, also run Truffle tests:

```bash
truffle test
```
