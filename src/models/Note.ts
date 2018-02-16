import * as firebase from 'firebase';

require('firebase/firestore');

class Note {
  public id: string;
  public text: string;

  public static createFromDocument(doc: firebase.firestore.DocumentSnapshot): Note {
    const note = new Note();
    note.id = doc.id;
    note.text = doc.data().text;

    return note;
  }
}

export default Note;