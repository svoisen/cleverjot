import * as React from 'react';
import * as styles from './NotesList.less';
import { AutoSizer, List, ListRowProps } from 'react-virtualized';
import Note from 'models/Note';
import NotesListItem from 'components/NotesListItem';
import { IObservableArray, Lambda } from 'mobx';
import { observer } from 'mobx-react';

interface INotesListProps {
  notes: Array<Note>;
}

@observer class NotesList extends React.Component<INotesListProps, any> {
  private list: List;
  private observeDisposer: Lambda;

  constructor(props: INotesListProps) {
    super(props);

    this.getRowRenderer = this.getRowRenderer.bind(this);
    this.getRowHeight = this.getRowHeight.bind(this);
    this.observeNotes(props.notes);
  }

  componentWillReceiveProps(newProps: INotesListProps): void {
    if (newProps.notes != this.props.notes) {
      this.observeNotes(newProps.notes);
    }
  }

  componentWillUnmount(): void {
    if (this.observeDisposer) {
      this.observeDisposer();
    }
  }

  public render() {
    const { notes } = this.props;
    return (
      <div className={ styles.notesList }>
        <AutoSizer>
          {({width, height}) => {
            return (
              <List
                ref={ ref => this.list = ref }
                className={ styles.notesListView }
                height={ height }
                width={ width }
                rowCount={ notes.length }
                rowHeight={ this.getRowHeight }
                rowRenderer={ this.getRowRenderer } />
            );
          }}
        </AutoSizer>
        <div className={ styles.notesListCount }>
          { notes.length }
        </div>
      </div>
    );
  }

  private observeNotes(notes: Array<Note>): void {
    if (this.observeDisposer) {
      this.observeDisposer();
    }

    this.observeDisposer = (notes as IObservableArray<Note>).observe(() => {
      this.list.forceUpdateGrid();
    });
  }

  private getRowHeight(): number {
    return 64;
  }

  private getRowRenderer(props: ListRowProps): React.ReactNode {
    const note = this.props.notes[props.index];

    return (
      <NotesListItem key={ props.index } note={ note } />
    );
  }
}

export default NotesList;