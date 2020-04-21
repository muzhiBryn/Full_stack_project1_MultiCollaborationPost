import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import { Map as factoryMap } from 'immutable';
import Note from './components/note';
import CreateBar from './components/create_bar';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextId: 2,
      notes: factoryMap({
        1: {
          title: 'cat',
          content: '![](http://i.giphy.com/gyRWkLSQVqlPi.gif)',
        },
      }),
    };
    this.createNewNote = this.createNewNote.bind(this);
  }

  createNewNote = (text) => {
    this.setState((prevState) => ({
      nextId: prevState.nextId + 1,
      notes: prevState.notes.update(prevState.nextId, () => { return { title: text, content: '' }; }),
    }));
    console.log(this.state.notes);
  };

  deleteNote = (id) => {
    console.log(id);
    this.setState((prevState) => ({
      notes: prevState.notes.delete(id),
    }));
  }

  render() {
    return (
      <div>
        <CreateBar onSubmitClicked={this.createNewNote} />
        { this.state.notes.entrySeq().map(([id, noteDetail]) => <Note id={id} noteDetail={noteDetail} onDeleteClicked={this.deleteNote} />) }
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('main'));
