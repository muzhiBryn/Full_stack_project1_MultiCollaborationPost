import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.noteDetail.title,
      content: props.noteDetail.content,
      inputPlaceHolder: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({ content: event.target.value });
  }

  render() {
    return (
      <div>
        <Card className="my-card">
          <Card.Body>
            <Card.Title> {this.state.title} </Card.Title>
            <Card.Text>
              {this.state.content}
            </Card.Text>
            <input onChange={this.onInputChange} value={this.state.inputPlaceHolder} />
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Note;
