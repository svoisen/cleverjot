import * as React from 'react';
import ApplicationStore from 'stores/ApplicationStore';
import Header from 'components/Header';
import NotesStore from 'stores/NotesStore';
import { inject } from 'mobx-react';

interface INotesPageProps {
  applicationStore?: ApplicationStore;
  notesStore?: NotesStore;
}

@inject('applicationStore', 'notesStore')
class NotesPage extends React.Component<INotesPageProps, any> {
  public componentDidMount() {
    const { notesStore, applicationStore } = this.props;
    notesStore.fetchNotes(applicationStore.firestoreDB, applicationStore.currentUser);
  }

  public render() {
    return (
      <Header />
    );
  }
}

export default NotesPage;