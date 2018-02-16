import * as React from 'react';
import * as styles from './NotesListItem.less';
import Note from 'models/Note';

interface INotesListItemProps {
  note: Note;
}

class NotesListItem extends React.PureComponent<INotesListItemProps, any> {
  public render() {
    const { note } = this.props;

    return (
      <div className={ styles.notesListItem }>
        { note.text }
      </div>
    )
  }
}

export default NotesListItem;