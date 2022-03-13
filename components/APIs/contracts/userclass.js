import Web3Provider from './web3provider';
import User from '../../../config/ABIs/User.json';
import abisAddress from '../../../config/ABIsAddr.json';

export default class IUser{
    constructor(){
        this.provider = new Web3Provider(window.ethereum)
        this.web3 = this.provider.web3
        this.utils = this.web3.utils

        //let ABIContract = JSON.parse(User);
        let ABIScheduling = User.abi;
        
        
        //*Prendi automaticamente l'ultimo address del contratto - SERVE SOLO NEI TEST
        let ContractNetworks = User.networks
        let ContractAddress = ContractNetworks[Object.keys(ContractNetworks)[Object.keys(ContractNetworks).length - 1]].address
        
        
        console.log(`Indirizzo Contratto----- `+ ContractAddress)
        //*Stampalo per check
        this.contract = new this.web3.eth.Contract(ABIScheduling, abisAddress["User"]);
    }
    async AddUser(name,maker) {
        let account = await this.provider.checkIfWalletIsConnected();
        if(!maker){
        await this.contract.methods.addCaller(
            this.utils.asciiToHex(name),       // Username
            {latitude:3,longitude:4},                // Posizione
            Date.now()  
        ).send({from:account}) //Non inserire i gas nel frontend(Se ne occupa metamask). - Sì nel mobile
        }else{
            await this.contract.methods.addMaker(
                this.utils.asciiToHex(name),        // Username 
                {latitude:33123,longitude:432131},  // Posizione
                15,                                 //Disponibilità oraria From
                19,      
                Date.now()                          //Timestamp creazione                //Disponibilità oraria TO
            ).send({from:account})

        }
    }

}