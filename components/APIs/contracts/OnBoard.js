import Web3Provider from './web3provider';
import OnBoarding from '../../../config/ABIs/OnBoarding.json';

export default class OnBoardin{
    constructor(){
        this.provider = new Web3Provider(window.ethereum)
        this.web3 = this.provider.web3
        this.utils = this.web3.utils

        //let ABIContract = JSON.parse(User);
        let ABIScheduling = OnBoarding.abi;
        
        
        //*Prendi automaticamente l'ultimo address del contratto - SERVE SOLO NEI TEST
        let ContractNetworks = OnBoarding.networks
        let ContractAddress = ContractNetworks[Object.keys(ContractNetworks)[Object.keys(ContractNetworks).length - 1]].address
        
        
        console.log(`Indirizzo Contratto----- `+ ContractAddress)
        //*Stampalo per check
        this.contract = new this.web3.eth.Contract(ABIScheduling, ContractAddress);
    }
    async registerPrinter(printerAddress){
        let account = await this.provider.checkIfWalletIsConnected();
                await this.contract.methods.addPrinter(
                    printerAddress,                     //Indirizzo Stampante
                    this.utils.asciiToHex("test"),      //Nome
                    [0,1],                              //Array of supportedMaterial - 1= 2= 3=
                    [0,1,2],                            //Array of supportedNozzles
                    2,                                  //Nozzle mounted 
                    100,                                //Max print temperature
                    100,                                //Max bed temperature
                    40,                                 //Volume L
                    false,                              //soluble
                    true                                //food safety
                ).send({from:account}) //Non inserire i gas nell frontend ma sì nel mobile

    }
}