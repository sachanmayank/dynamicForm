import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DynamicForm from './components/form'

let API = "https://cdn.contentful.com/spaces/u9ouo3pa7275/environments/master/entries/1OxrmyrvKEwS2auIqy648a?access_token=a311288a846f95ad126fd913fcb0a03a21770c86372a83e6b86eb9efa994c886&locale=en-US";

class App extends Component {
  constructor() {
    super();
    this.state = {
      current: {}
    };
  }

  componentDidMount() {
    let thisVal = this;
    fetch(API)
      .then(response => response.json())
      .then(function(myJson) {
        thisVal.setState({ current: myJson.fields });
      })
      .catch(error => console.log(error));
  }
  
  
  render() {
    return (
      <div className="App">
        <DynamicForm
          className="form"
          title={this.state.current.registrationPage}
          defaultValues={this.state.current}
          model={this.state.current.formFields}
        />
      </div>
    );
  }
}

export default App;
