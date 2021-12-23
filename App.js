import React, { Component } from 'react';
import type {Node} from 'react';
import Header from './shared/components/Header';
import Web3 from 'web3';
import './shim'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class App extends Component{

async loadBlockchain(){
const web3 = new Web3('http://localhost:7545');
const newWallet = web3.eth.accounts.wallet.create(1);
const newAccount = newWallet[0];
}
render(){
  return (
  <Text style={{ color: '#e74c3c', fontSize: 36, paddingLeft: 5 }}>
    FUNZIONA
  </Text>
  );
};
}
export default App;