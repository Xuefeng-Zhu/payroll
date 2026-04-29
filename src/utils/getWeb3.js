import Web3 from 'web3'

const getInjectedWeb3 = () => {
  if (typeof window === 'undefined') {
    throw new Error('Window object is unavailable.');
  }

  if (window.ethereum) {
    return new Web3(window.ethereum);
  }

  if (window.web3 && window.web3.currentProvider) {
    return new Web3(window.web3.currentProvider);
  }

  return new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
};

const getWeb3 = new Promise((resolve, reject) => {
  const initializeWeb3 = () => {
    try {
      resolve({ web3: getInjectedWeb3() });
    } catch (error) {
      reject(error);
    }
  };

  if (document.readyState === 'complete') {
    initializeWeb3();
    return;
  }

  const onLoad = () => {
    window.removeEventListener('load', onLoad);
    initializeWeb3();
  };

  window.addEventListener('load', onLoad);
});

export default getWeb3
