# dapp
#### server:
1. Dowload the api.py file in server folder;
2. Use XAMPP to start a Mysql and Apache server;
3. The database must be named "Dapp_login" and must have a table named "UserData" with these attributes:
   - id (primary key, auto increment),
   - username (unique),
   - password,
   - name,
   - surname,
   - email,
   - wallet (unique),
   - registrationType;
4. Run "python3 api.py" to start the server;

#### client:
1. To start choose a folder;
2. Run "truffle unbox react";
3. Replace all the files with the files in the client folder;
4. Run "truffle compile" to compile the contract (located in src/contracts);
5. Run "truffle migrate" to deploy in ganache (i'm using ganache on HTTP://127.0.0.1:7546 network id 577898 mnemonic prova2);
6. Run "npm start" to start the front end;
