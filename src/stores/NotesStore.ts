import Note from 'models/Note';
import User from 'models/User';
import * as firebase from 'firebase'
import { action, observable, IObservableArray } from 'mobx';

// Required for side-effects
require('firebase/firestore');

class NotesStore {
  @observable public notes: Array<Note> = [];

  @action public fetchNotes(db: firebase.firestore.Firestore, user: User): void {
    console.log('Fetching notes');
    db.collection('notes').where('owner_id', '==', user.userId).get().then(querySnapshot => {
      const observableNotes = this.notes as IObservableArray<Note>;
      observableNotes.replace(querySnapshot.docs.map(doc => Note.createFromDocument(doc)));
    });
  }
}

export default NotesStore;