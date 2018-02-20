import * as React from 'react';
import * as styles from './NotesPage.less';
import ApplicationStore from 'stores/ApplicationStore';
import Header from 'components/Header';
import NotesStore from 'stores/NotesStore';
import { inject, observer } from 'mobx-react';
import NotesList from 'components/NotesList';

interface INotesPageProps {
  applicationStore?: ApplicationStore;
  notesStore?: NotesStore;
}

@inject('applicationStore', 'notesStore')
@observer class NotesPage extends React.Component<INotesPageProps, any> {
  private notesList: NotesList;

  public componentDidMount() {
    const { notesStore, applicationStore } = this.props;
    const { firestoreDB, currentUser } = applicationStore;

    notesStore.fetchNotes(firestoreDB, currentUser);
  }

  public render() {
    const { notesStore } = this.props;

    return (
      <div className={ styles.notesPage }>
        <Header />
        <section className={ styles.notesPageContent }>
          <NotesList ref={ ref => this.notesList = ref } notes={ notesStore.notes } />
        </section>
      </div>
    );
  }
}

export default NotesPage;