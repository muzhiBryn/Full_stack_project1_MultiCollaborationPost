import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';


class CreateBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmitClicked = this.onSubmitClicked.bind(this);
  }


  // eslint-disable-next-line class-methods-use-this
  onInputChange(event) {
    this.setState({ title: event.target.value });
  }

  onSubmitClicked(event) {
    this.props.onSubmitClicked(this.state.title);
    console.log(this.state.title);
  }

  render() {
    return (
      <div id="create-bar">
        <input onChange={this.onInputChange} value={this.state.title} />
        <Button onClick={this.onSubmitClicked}>submit</Button>
      </div>
    );
  }
}

export default CreateBar;
