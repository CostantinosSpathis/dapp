# dapp
server:
dowload the api.py file in server folder
use XAMPP to start a Mysql and Apache server
the database must be named "Dapp_login" and must have a table named "UserData" with these attributes:
id (primary key, auto increment)
username (unique)
password
name
surname
email
wallet (unique)
registrationType

run "python3 api.py" to start the server

client:
to start choose a folder
run "truffle unbox react"
replace all the files with the files in the client folder
run "truffle compile" to compile the contract (located in src/contracts)
run "truffle migrate" to deploy in ganache (i'm using ganache on HTTP://127.0.0.1:7546 network id 577898 mnemonic prova2)
run "npm start" to start the front end
