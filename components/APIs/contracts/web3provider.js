import Web3 from 'web3';

export default class Web3Provider{
    constructor(provider){
        this.web3 = new Web3(provider);
        this.utils = this.web3.utils
    }
    
    async checkIfWalletIsConnected() {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
      
          if (accounts.length > 0) {
            const account = accounts[0];
            return(account);
          }
        }
      }

    async getAccounts(){
        return await this.web3.eth.getAccounts()
    }
}
