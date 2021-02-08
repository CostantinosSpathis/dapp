# dapp
server: 
1)dowload the api.py file in server folder; 
2)use XAMPP to start a Mysql and Apache server; 
3)the database must be named "Dapp_login" and must have a table named "UserData" with these attributes: 
                id (primary key, auto increment)
                username (unique) 
                password 
                name
                surname
                email
               wallet (unique)
               registrationType;
4)run "python3 api.py" to start the server;
client: 
1)choose a folder; 
2)run "truffle init"; 
3)replace all the files with the files in the client folder; 
4)run "truffle compile" to compile the contract (located in src/contracts); 
5)run "truffle migrate" to deploy in ganache (i'm using ganache on HTTP://127.0.0.1:7546 network     id 5778 mnemonic Workspace); 
6)run "npm start" to start the front end;
