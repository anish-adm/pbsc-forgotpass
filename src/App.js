import React, { Component } from 'react';
import loading from './loading.gif';
import './App.css';
import API from './utils/API';
import styles from './styles/default.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {email:'',isLoading: false, hasError:false, isSuccess:false, successMessage:'', errorMessage:''};
    this.handleChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    this.setState({isLoading:true});
    let url = "http://myneighby.herokuapp.com/api/v2/forgot-password"; //TODO: move this to config file
    let formdata = {loginId:this.state.email};
    API.post(url,formdata)
      .then((data) => {
        console.log(data);
        if(data.error == 'undefined'){
          this.setState({
            isLoading:false,
            isSuccess:true,
            hasError:false,
            successMessage:data.message,
            email:''
          });
        }else{
          console.log(data);
          this.setState({
            isLoading:false,
            isSuccess:false,
            hasError:true,
            errorMessage:data.error.message
          });
        }

      }).catch((error) => {
        this.setState({
          isLoading:false,
          isSuccess:false,
          hasError:true,
          errorMessage:'Something went wrong!'
        });
      });
    event.preventDefault();
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  render() {
    let loadingElement,successElement,errorElement;

    if(this.state.isLoading){
      loadingElement = <img src={loading} style={loader} className="loading" alt="loading" />;
    }
    if(this.state.isSuccess){
      successElement = <p className="success" >{this.state.successMessage}</p>;
    }
    if(this.state.hasError){
      errorElement = <p className="error" >{this.state.errorMessage}</p>;
    }
    return (
      <div className="App">
      <h2>Forgot Password?</h2>
        <p className="App-intro">
          Please enter the email address registered on your account.
        </p>

        <form onSubmit={this.handleSubmit}>
        <label>
          Email address:
            <input required type="email" value={this.state.email} style={input_box} onChange={this.handleChange} />
        </label>
        <br/>
        <input type="submit" style={reset_pass_button} value="Reset Password" />
      </form>
      {loadingElement}
      {successElement}
      {errorElement}

      </div>
    );
  }
}

const input_box = {
  marginTop: '20px',
  width:'250px',
  height:'30px',
};

const loader = {
  height:100,
  width:100
}

const reset_pass_button = {
  marginTop: '40px',
  width:'150px',
  height:'45px',
  color:'white',
  borderRadius:'15px',
  backgroundColor:'pink',
  border: '5px solid pink'
};

export default App;
