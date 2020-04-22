import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import { Map as factoryMap } from 'immutable';
import Note from './components/note';
import CreateBar from './components/create_bar';
import * as firebasedb from './services/datastore';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // nextId: 2,
      notes: factoryMap({
        // 1: {
        //   title: 'cat',
        //   content: '![](http://i.giphy.com/gyRWkLSQVqlPi.gif)',
        // },
      }),
    };
    this.createNewNote = this.createNewNote.bind(this);
  }

  componentDidMount() {
    console.log('I want to render again');

    firebasedb.fetchNotes((dbnotes) => {
      this.setState({ notes: factoryMap(dbnotes) });
    });
  }

  // // part1 create new note
  // createNewNote = (text) => {
  //   this.setState((prevState) => ({
  //     nextId: prevState.nextId + 1,
  //     notes: prevState.notes.update(prevState.nextId, () => { return { title: text, content: '' }; }),
  //   }));
  //   console.log(this.state.notes);
  // };

  // firebase create new note
  createNewNote = (text) => {
    firebasedb.newNote(
      {
        title: text, content: '', x: 20, y: 20,
      },
    );
  };

  // // part1 delete note
  // deleteNote = (id) => {
  //   console.log(id);
  //   this.setState((prevState) => ({
  //     notes: prevState.notes.delete(id),
  //   }));
  // }

  // firebase delete note
  deleteNote = (id) => {
    firebasedb.deleteNote(id);
  }

  render() {
    return (
      <div>
        <CreateBar onSubmitClicked={this.createNewNote} />
        { this.state.notes.entrySeq().map(([id, noteDetail]) => <Note key={id} id={id} noteDetail={noteDetail} onDeleteClicked={this.deleteNote} />) }
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('main'));
