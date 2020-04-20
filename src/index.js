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
      nextId: 1,
      notes: factoryMap({
        0: {
          title: 'hello',
          content: 'please give my an apple',
        },
        1: {
          title: 'hello1',
          content: 'please give my two apples',
        },
      }),
    };
    this.createNewNote = this.createNewNote.bind(this);
  }

  createNewNote = (text) => {
    console.log(this.state.notes);
    this.state.nextId += 1;
    this.setState((prevState) => ({
      notes: prevState.notes.update(prevState.nextId, () => { return { title: text, content: '' }; }),
    }));
    console.log(this.state.notes);
  };

  render() {
    return (
      <div>
        <CreateBar onSubmitClicked={this.createNewNote} />
        { this.state.notes.entrySeq().map(([id, noteDetail]) => <Note id={id} noteDetail={noteDetail} />) };
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('main'));
