import * as React from 'react';
import * as styles from './App.less';
import ApplicationStore, { ApplicationStatus } from 'stores/ApplicationStore';
import AuthenticationPage from 'containers/AuthenticationPage';
import NotesPage from 'containers/NotesPage';
import { Route } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

interface IAppProps {
  applicationStore?: ApplicationStore
}

@inject('applicationStore')
@observer class App extends React.Component<IAppProps, any> {
  constructor(props: IAppProps) {
    super(props);

    props.applicationStore.initialize();
  }

  public render() {
    const { isAuthenticated, status } = this.props.applicationStore;

    if (status === ApplicationStatus.INITIALIZING) {
      return (
        <div className={ styles.app }>
        </div>
      );
    }

    return (
      <div className={ styles.app }>
        <Route exact path='/notes' render={ () => isAuthenticated ? <NotesPage /> : <AuthenticationPage /> } />
        { this.renderDevTool() }
      </div>
    )
  }

  private renderDevTool() {
    if (process.env.NODE_ENV !== 'production') {
      const DevTools = require('mobx-react-devtools').default;
      return (<DevTools />);
    }

    return '';
  }
}

export default App;

export {
  IAppProps
}