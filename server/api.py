import flask
from flask import request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
import json
connection = mysql.connector.connect(host='localhost',
                                        port=3306,
                                         database='Dapp_login',
                                         user='root',
                                         password='')


app = flask.Flask(__name__)
CORS(app)
app.config["DEBUG"] = True



@app.route('/', methods=['GET'])
def home():
    return '''<h1>Distant Reading Archive</h1>
<p>A prototype API for distant reading of science fiction novels.</p>'''


@app.route('/api/get1', methods=['GET'])
def api_all():
    sql_select_Query = "select * from UserData"
    cursor = connection.cursor()
    cursor.execute(sql_select_Query)
    records = cursor.fetchall()
    print("Total number of rows in UserData is: ", cursor.rowcount)
    print("\nPrinting each user record")
    response=jsonify(records)
    return response



@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404


@app.route('/api/post1', methods=['POST'])
def api_login():
     username = request.json['username']
     password = request.json['password']
     wallet = request.json['wallet']
     query = "SELECT * FROM UserData WHERE username=%s AND password=%s AND wallet=%s"
     args = username, password, wallet
     cursor = connection.cursor()
     cursor.execute(query, args)
     records = cursor.fetchall()
     response=jsonify(records)
     return response
@app.route('/api/post2', methods=['POST'])
def api_register():
     username = request.json['username']
     password = request.json['password']
     email = request.json['email']
     wallet = request.json['wallet']
     name = request.json['name']
     surname = request.json['surname']
     registrationType = request.json['registrationType']
     sql = "INSERT INTO UserData (username, password, name, surname, email, wallet, registrationType) VALUES (%s, %s, %s, %s, %s, %s, %s)"
     args = username, password, name, surname, email, wallet, registrationType
     cursor = connection.cursor()
     cursor.execute(sql, args)
     connection.commit()
#     records = cursor.fetchall()
#     response=jsonify(records)
     return "<h1>succes</h1>"
app.run()
