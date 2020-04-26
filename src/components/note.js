import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Draggable from 'react-draggable';
import TextareaAutosize from 'react-textarea-autosize';
import marked from 'marked';
import * as firebasedb from '../services/datastore';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dragEnabled: false,
      isEditing: false,
    };
    // id: props.id,
    // title: props.noteDetail.title,
    // content: props.noteDetail.content,
    // x: props.noteDetail.x,
    // y: props.noteDetail.y,
    this.onInputChange = this.onInputChange.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.enableDrag = this.enableDrag.bind(this);
    this.disableDrag = this.disableDrag.bind(this);
  }

  onInputChange = (source, event) => {
    if (source === 'content') {
      firebasedb.saveNoteKV(this.props.id, 'content', event.target.value);
    } else if (source === 'title') {
      firebasedb.saveNoteKV(this.props.id, 'title', event.target.value);
    }
  };


  handleDeleteClick = () => {
    this.props.onDeleteClicked(this.props.id);
  };

  handleDrag = (event, ui) => {
    if (this.state.dragEnabled) {
      firebasedb.saveNoteKV(this.props.id, 'x', ui.x);
      firebasedb.saveNoteKV(this.props.id, 'y', ui.y);
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
        grid={[10, 10]}
        defaultPosition={{ x: this.props.noteDetail.x, y: this.props.noteDetail.y }}
        position={{
          x: this.props.noteDetail.x, y: this.props.noteDetail.y,
        }}
        onDrag={this.handleDrag}
      >
        <Card className={cardClassName} id={this.props.id}>
          <Card.Body>
            <Card.Title>
              <span className={normalMode}>{this.props.noteDetail.title}
              </span>

              <input className={editMode} onChange={(e) => this.onInputChange('title', e)} value={this.props.noteDetail.title} />
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

            <TextareaAutosize className={editMode} onChange={(e) => this.onInputChange('content', e)} value={this.props.noteDetail.content} />

            <div className={`my-card-content ${normalMode}`} dangerouslySetInnerHTML={{ __html: marked(this.props.noteDetail.content || '') }} />


          </Card.Body>
        </Card>

      </Draggable>


    );
  }
}

export default Note;
