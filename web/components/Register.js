import React, { Component }  from 'react';
import {connect} from 'react-redux';

class Signup extends Component {

  constructor (props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    const data = new FormData(event.target) ;
    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');
    console.log("form data :", email + " ---- " + password  + " ---- " + username);
    this.props.createUser(email,password,username);
  }

  render() {
    return (
      <div className="App">
         { this.props.accountStatus.status  ? this.props.accountStatus.message : '' }
        <h3>Register </h3>
        <form  onSubmit={this.handleSubmit} autoComplete="off">
            <label> Username  </label>
            <input type="text" name="username" id="username" />
            <br/><br/>
            <label> Email </label>
            <input type="text" name="email" id="email" />
            <br/><br/>
            <label> Password </label>
            <input type="password" name="password" id="password" />
            <br/><br/>
            <input type="submit" name="submit" id="submit" />
        </form>
      </div>
    );
  }
}
  function mapStateToProps(state) {
    console.log("state => ", state);
    return {
      accountStatus : state.user_reducer.accountStatus ?  state.user_reducer.accountStatus : ''
    };
  }


  const mapDispatchToProps = (dispatch) => ({
    createUser: (email, password,username) => {
      dispatch( { type:'ADD_USER' , payload : {email, password,username} } );
    },

  });
  export default connect(mapStateToProps, mapDispatchToProps)(Signup);