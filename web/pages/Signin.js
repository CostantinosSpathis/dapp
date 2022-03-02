import React from 'react';



class Signin extends React.Component{

    constructor(props){
    super(props)
        this.state = {
            username:'',
            password:'',
            confirmPassword:'',
            privateKey:'',
            email:'',
            register : false,
            ethBrowser : false,
            invalidEmail : false,
            name : '',
            surname : '',
        }
    }


startApi2 = async (event) =>{
  event.preventDefault()
  console.log("sending data")
  //user data
  const username = this.state.username
  const password = this.state.password
  const hpassword = keccak256(password).toString('hex')
  const wallet = this.state.account
  //check if wallet is the manager's wallet.
  if(wallet == "0x9Dd667c5d811C0930Ca639673EC269e1113f15bd") {
                                          console.log("manager setting")
                                          this.setState({manager: true})
                                          Cookies.set('manager','true')
                                        }
  //database login request
  /*
  axios.post('http://127.0.0.1:5000/api/post1',{
    username : username,
    password : hpassword,
    wallet : wallet
  }).then(response => {*/
  if (response.data.length == 1) {
    const name = response.data[0][3]
    const surname = response.data[0][4]
    const email = response.data[0][6]
    const registrationType = response.data[0][7]
    //for all types of users, the statuses are changed to allow viewing of the components appropriate
    if(registrationType == "designer") {
      this.setState({designer : true})
      this.setState({player : false})
      console.log("logged as designer")
    }
    else if (registrationType == "player") {
      this.setState({player : true})
      this.setState({designer : false})
      console.log("logged as player")
    }
    else if (registrationType == "both") {
      this.setState({designer : true, player : true})
      console.log("logged as player and designer")
    }
    else {
      console.log("error")
      return
    }
    this.setState({isLogged : true ,name : name, surname : surname, email: email})
    this.setState({main : true})
    const designer = this.state.designer
    const player = this.state.player
    console.log(this.state.designer,this.state.player)
    Cookies.set('name', name)
    Cookies.set('surname', surname)
    Cookies.set('email', email)
    Cookies.set('log', 'true')
    Cookies.set('main','true')
    Cookies.set('designer', designer)
    Cookies.set('player', player)
    console.log(response.data[0])
  }
  else {
    this.setState({invalidLogin : true})
    console.log("invalid login")
  }

}

captureFileL = async (event)=> {
  event.preventDefault()
  console.log("charging username")
  const stri = event.target.value
  await this.setState({ username: stri })
  console.log(this.state.username)
}
captureFileL1 = async (event)=> {
  event.preventDefault()
  console.log("charging password")
  const stri = event.target.value
  await this.setState({ password: stri })
  console.log(this.state.password)
}
captureFileL2 = async (event)=> {
  event.preventDefault()
  console.log("charging email")
  const stri = event.target.value
  var check = stri.includes("@")
  var check1 = stri.includes(".")
  if(check && check1) {
  await this.setState({invalidEmail : false})
  await this.setState({ email: stri })
  console.log(this.state.email)}
  else {
    await this.setState({invalidEmail : true })
    console.log("invalidEmail")
  }
}

captureFileL3 = async (event)=> {
  event.preventDefault()
  console.log("charging name")
  const stri = event.target.value
  await this.setState({ name: stri })
  console.log(this.state.name)
}
captureFileL4 = async (event)=> {
  event.preventDefault()
  console.log("charging surname")
  const stri = event.target.value
  await this.setState({ surname: stri })
  console.log(this.state.surname)
}
captureFileL5 = async (event)=> {
  event.preventDefault()
  console.log("charging confirm password")
  const stri = event.target.value
  await this.setState({ confirmPassword: stri })
  console.log(this.state.confirmPassword)
}


render(){
    return(
    <div>
    <h1>login</h1>
    </div>
    )
}

}
export default Signin;