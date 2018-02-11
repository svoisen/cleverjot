import * as React from 'react';
import * as styles from './App.less';
import ApplicationStore from 'stores/ApplicationStore';
import AuthenticationPage from 'containers/AuthenticationPage';
import NotesPage from 'containers/NotesPage';
import { Route } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

interface IAppProps {
  applicationStore?: ApplicationStore
}

@inject('applicationStore')
@observer class App extends React.Component<IAppProps, any> {
  public render() {
    const { isAuthenticated } = this.props.applicationStore;

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