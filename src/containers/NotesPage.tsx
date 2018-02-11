import * as React from 'react';
import ApplicationStore from 'stores/ApplicationStore';
import Header from 'components/Header';
import { inject } from 'mobx-react';

interface INotesPageProps {
  applicationStore?: ApplicationStore;
}

@inject('applicationStore')
class NotesPage extends React.Component<INotesPageProps, any> {
  public render() {
    return (
      <Header />
    );
  }
}

export default NotesPage;