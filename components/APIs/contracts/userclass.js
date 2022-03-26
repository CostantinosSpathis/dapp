import Web3Provider from './web3provider';
import User from '../../../config/ABIs/User.json';
import abisAddress from '../../../config/ABIsAddr.json';

//ACCOUNT 2 NOT MAKER
//ACCOUNT 3 MAKER



export default class IUser{
    constructor(){
        this.provider = new Web3Provider(window.ethereum)
        this.web3 = this.provider.web3
        this.utils = this.web3.utils
        this.maker = true

        //let ABIContract = JSON.parse(User);
        let ABIScheduling = User.abi;
        
        
        //*Prendi automaticamente l'ultimo address del contratto - SERVE SOLO NEI TEST
        let ContractNetworks = User.networks
        let ContractAddress = ContractNetworks[Object.keys(ContractNetworks)[Object.keys(ContractNetworks).length - 1]].address
        let addr = 0x327a71f629d0da0a0dde97ABa1540f70e2438E80
        console.log(`Indirizzo Contratto----- `+ ContractAddress)
        //*Stampalo per check
        this.contract = new this.web3.eth.Contract(ABIScheduling, abisAddress["User"]);
    }
    async AddUser(name,maker) {
        let account = await this.provider.checkIfWalletIsConnected();
        let accounts = await this.provider.getAccounts()
        console.log(account)
        for (let [i,account] of accounts.entries()){
            //Registrare un Caller
            if(!maker){
                await this.contract.methods.addCaller(
                    this.utils.asciiToHex(name),       // Username
                    this.utils.asciiToHex("prova1"),      // Posizione PROVVISORIAMENTE IN BYTES
                ).send({from:account}) //Non inserire i gas nel frontend(Se ne occupa metamask). - Sì nel mobile
                continue
            }else{
            //Registrare un Maker
            await this.contract.methods.addMaker(
                this.utils.asciiToHex(name),          // Username 
                this.utils.asciiToHex("prova1"),         // Posizione PROVVISORIAMENTE IN BYTES
                15,                                 //Disponibilità oraria From
                19,                                 //Disponibilità oraria TO
            ).send({from:account})
            }
            
        }
    }
    async Check(){
        let accounts = await this.provider.getAccounts()
        return await this.contract.methods.isMaker(accounts[0]).call();
        
    }
}