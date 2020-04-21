import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Draggable from 'react-draggable';
import TextareaAutosize from 'react-textarea-autosize';
import marked from 'marked';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      title: props.noteDetail.title,
      content: props.noteDetail.content,
      x: 20,
      y: 20,
      dragEnabled: false,
      isEditing: false,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.enableDrag = this.enableDrag.bind(this);
    this.disableDrag = this.disableDrag.bind(this);
  }

  onInputChange = (event) => {
    this.setState({ content: event.target.value });
  };


  handleDeleteClick = () => {
    this.props.onDeleteClicked(this.state.id);
  };

  handleDrag = (event, ui) => {
    if (this.state.dragEnabled) {
      this.setState((prevState) => ({
        x: ui.x,
        y: ui.y,
      }));
    }
  }

  enableDrag = () => {
    this.setState((prevState) => ({
      dragEnabled: true,
    }));
  }

  disableDrag = () => {
    this.setState((prevState) => ({
      dragEnabled: false,
    }));
  }

  enableEditing = () => {
    this.setState((prevState) => ({
      isEditing: true,
    }));
  }

  disableEditing = () => {
    this.setState((prevState) => ({
      isEditing: false,
    }));
  }


  render() {
    const cardClassName = this.state.dragEnabled ? 'my-card handle' : 'my-card';
    const editMode = this.state.isEditing ? '' : 'hidden';
    const normalMode = this.state.isEditing ? 'hidden' : '';

    return (
      <Draggable
        handle=".handle"
        grid={[5, 5]}
        defaultPosition={{ x: this.state.x, y: this.state.y }}
        position={{
          x: this.state.x, y: this.state.y,
        }}
        onDrag={this.handleDrag}
      >
        <Card className={cardClassName}>
          <Card.Body>
            <Card.Title> {this.state.title}
              <span
                onClick={this.handleDeleteClick}
                role="button"
                tabIndex="0"
              ><i className="far fa-trash-alt" />
              </span>

              <span className={normalMode}
                role="button"
                tabIndex="0"
                onClick={this.enableEditing}
              ><i className="fas fa-pencil-alt" />
              </span>

              <span className={editMode}
                role="button"
                tabIndex="0"
                onClick={this.disableEditing}
              ><i className="fas fa-check" />
              </span>


              <span
                className="float-right"
                onMouseOver={this.enableDrag}
                onMouseOut={this.disableDrag}
                onFocus={() => {}}
                onBlur={() => {}}
                role="button"
                tabIndex="0"
              ><i className="fas fa-expand-arrows-alt" />
              </span>
            </Card.Title>

            <TextareaAutosize className={editMode} onChange={this.onInputChange} value={this.state.content} />

            <div className={`${normalMode} notebody`} dangerouslySetInnerHTML={{ __html: marked(this.state.content || '') }} />


          </Card.Body>
        </Card>

      </Draggable>


    );
  }
}

export default Note;
