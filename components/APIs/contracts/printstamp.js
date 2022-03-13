import Web3Provider from './web3provider'
import OnBoarding from '../../../config/ABIs/OnBoarding.json'

export default class printstamp {

    constructor(){
        this.provider = new Web3Provider(window.ethereum)
        this.web3 = this.provider.web3
        this.utils = this.web3.utils
        this.printers = {}

        //let ABIContract = JSON.parse(User);
        let ABIScheduling = OnBoarding.abi;
        
        
        //*Prendi automaticamente l'ultimo address del contratto - SERVE SOLO NEI TEST
        let ContractNetworks = OnBoarding.networks
        let ContractAddress = ContractNetworks[Object.keys(ContractNetworks)[Object.keys(ContractNetworks).length - 1]].address
        
        
        console.log(`Indirizzo Contratto----- `+ ContractAddress)
        //*Stampalo per check
        this.contract = new this.web3.eth.Contract(ABIScheduling, ContractAddress);
    }

    async printPrinters(){
        let account = await this.provider.checkIfWalletIsConnected();
        return await this.contract.methods.getMakerPrinters().call({from:account})
    }
}