import * as React from 'react';
import ApplicationStore from 'stores/ApplicationStore';
import { inject } from 'mobx-react';

interface INotesPageProps {
  applicationStore?: ApplicationStore;
}

@inject('applicationStore')
class NotesPage extends React.Component<INotesPageProps, any> {
  public render() {
    return (
      <div>
        Notes
      </div>
    )
  }
}

export default NotesPage;