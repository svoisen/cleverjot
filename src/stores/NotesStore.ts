import Note from 'models/Note';
import User from 'models/User';
import * as firebase from 'firebase'
import { action, observable } from 'mobx';

class NotesStore {
  @observable public notes: Array<Note> = [];

  @action public fetchNotes(db: firebase.firestore.Firestore, user: User): void {
    console.log('Fetching notes');
    db.collection('notes').where('owner_id', '==', user.userId).get().then(querySnapshot => {
      querySnapshot.forEach(note => {
        console.log(`${note.id} ${note.data().text}`);
      });
    });
  }
}

export default NotesStore;