# Air Factories 2.0 - v0.1

## Descrizione

Vecchia versione della distributed application scritta tramite la libreria React.

Viene fatto uso di un server scritto in flask per la gestione degli account degli utenti.

## BackEnd

Prima di avviare il server è necessario avere installato SQL e creare un database con il nome "Dapp_login", all'interno del quale bisogna creare una tabella come specificato:

```sql
CREATE TABLE Dapp_login{
    id int auto_increment primary key,
    username varchar(100),
    password varchar(100),
    name varchar(100),
    surname varchar(100),
    email varchar(100),
    wallet varchar(100) unique,
    registrationType varchar(100)
}
```

Una volta creata la tabella, modificare il file api.py che contiene la definizione del server per riuscire a connettersi a mysql.

A questo punto andare nella cartella server e  avviarlo con il seguente comando

```bash
$ python3 api.py
```

## Deploy SmartContract

Scegliere una cartella e utilizzare il comando 

```bash
$ truffle init
```

Copiare i file presenti nelle cartelle migrate e contracts presenti nella cartella client e inserirle nelle nuove cartelle migrate e contracts create dopo l'utilizzo del precedente comando.

Prima di continuare avviare ganache e controllare che l'indirizzo della rete e l'id siano gli stessi presenti nel file truffle-config.js

```js
require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Controllare.
      port: 7546,        // Controllare.
      network_id: "*" // * significa qualsiasi ID.
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/', 
  compilers: {
    solc: {
      version: "0.7.0",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
```

Compilare i contratti e effettuare il deploy su ganache tramite 

```bash
$ truffle compile
$ truffle migrate
```



## FrontEnd

Per avviare il Frontend, dopo aver clonato la repository bisognerà eseguire i seguenti comandi nella cartella "client"

```bash
$ npm install 
```

Una volta installate le dipendenze sarà possibile avviare il progetto con

```bash
$ npm start
```
