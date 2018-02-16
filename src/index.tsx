import * as React from 'react';
import * as firebase from 'firebase';
import * as ReactDOM from 'react-dom';
import App from 'containers/App';
import ApplicationStore from 'stores/ApplicationStore';
import RouterStore from 'stores/RouterStore';
import NotesStore from 'stores/NotesStore';
import IAppConfiguration from 'models/IAppConfiguration';
import { Provider } from 'mobx-react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useStrict } from 'mobx';

// Load configuration data JSON, which is exposed as export in webpack.
const config: IAppConfiguration = require('Configuration');

// Side-effect imports for loading HTML and root-level styles
// Ignore these for testing and code coverage numbers.
if (process.env.NODE_ENV !== 'test') {
  require('./styles/main.less');
  require('./index.html');
}

// Use MobX strict mode
useStrict(true);

const firebaseApp = firebase.initializeApp(config.firebaseConfig);
const history = createBrowserHistory();
const providerRoot = {
  routerStore: new RouterStore(history),
  applicationStore: new ApplicationStore(firebaseApp),
  notesStore: new NotesStore()
}

const renderRoot = () => {
  return (
    <Router history={ history }>
      <Provider {... providerRoot}>
        <App />
      </Provider>
    </Router>
  )
}

if (process.env.NODE_ENV !== 'test') {
  ReactDOM.render(renderRoot(), document.getElementById('root'));
}
