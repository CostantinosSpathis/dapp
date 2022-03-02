import React from 'react'
import Web3 from 'web3';
import Scheduling from '../blockchain/src/abis/Scheduling.json';


const interaction = () => {

    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    },[])
    
    const [currentaccount,setCurrentaccount] = useState("");
    const[loader,setloader]= useState(true);
    const[Sche,SetSche] = useState();
    
    const loadWeb3 = async() => {
        if(window.ethereum){
            window.web3=new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if(window.web3){
        window.web3=new Web3(window.web3.currentProvider)
        }
        else{
        window.alert('Scarica Metamask')
        }
    }
    //INTERACT WITH BLOCKCHAIN
    const loadBlockchaindata = async ()=>{
        setloader(true); //così fino a quando non verifico che il wallet metamask è ok resto in loading
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        setCurrentaccount(account);
        const networkId = await web3.eth.net.getId();
    
        const networkData = Scheduling.networks[networkId]; //se non è presente il contract non è deployato
    
        if(networkData){
            const Sche = new web3.eth.Contract(Scheduling.abi,networkData.address);// dal file migration.json
            /*interaction test
            const players1 = await design.methods.players(1).call();
            const player2 = await design.methods.players(1).call();
            console.log(players1);
            console.log(players2);
            Setdesign(design);
            */
            setloader(false); // se tutto è andato a buon fine con il wallet metamask appo vado avanti
        }else{
            window.alert('the smart contract is not deployed')
        }
        return (account);
    }
        
    
  return (
    <div>interaction</div>
  )
}

export default interaction