import * as React from 'react';
import * as styles from './App.less';
import ApplicationStore from 'stores/ApplicationStore';
import { observer, inject } from 'mobx-react';

interface IAppProps {
  applicationStore?: ApplicationStore
}

@inject('applicationStore')
@observer class App extends React.Component<IAppProps, any> {
  public render() {
    return (
      <div className={ styles.app }>
        { this.renderDevTool() }
      </div>
    )
  }

  public componentDidMount() {
    const { applicationStore } = this.props;
    applicationStore.initializeFirebase();
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