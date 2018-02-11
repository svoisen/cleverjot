import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from 'containers/App';
import ApplicationStore from 'stores/ApplicationStore';
import RouterStore from 'stores/RouterStore';
import { Provider } from 'mobx-react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useStrict } from 'mobx';

// Side-effect imports for loading HTML and root-level styles
// Ignore these for testing and code coverage numbers.
if (process.env.NODE_ENV !== 'test') {
  require('./index.html');
  require('./styles/main.less');
}

useStrict(true);

const history = createBrowserHistory();

const providerRoot = {
  routerStore: new RouterStore(history),
  applicationStore: new ApplicationStore()
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
