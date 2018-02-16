import * as React from 'react';
import * as styles from './NotesList.less';
import { AutoSizer, List, ListRowProps } from 'react-virtualized';
import Note from 'models/Note';
import NotesListItem from 'components/NotesListItem';

interface INotesListProps {
  notes: Array<Note>;
}

class NotesList extends React.PureComponent<INotesListProps, any> {
  private _list: List;

  constructor(props: INotesListProps) {
    super(props);

    this.getRowRenderer = this.getRowRenderer.bind(this);
    this.getRowHeight = this.getRowHeight.bind(this);
  }

  public get list(): List {
    return this._list;
  }

  public render() {
    const { notes } = this.props;
    return (
      <div className={ styles.notesList }>
        <AutoSizer>
          {({width, height}) => {
            return (
              <List
                ref={ ref => this._list = ref }
                className={ styles.notesListView }
                height={ height }
                width={ width }
                rowCount={ notes.length }
                rowHeight={ this.getRowHeight }
                rowRenderer={ this.getRowRenderer } />
            );
          }}
        </AutoSizer>
      </div>
    );
  }

  private getRowHeight(): number {
    return 64;
  }

  private getRowRenderer(props: ListRowProps): React.ReactNode {
    const note = this.props.notes[props.index];

    return (
      <NotesListItem note={ note } />
    );
  }
}

export default NotesList;