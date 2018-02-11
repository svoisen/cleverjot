import IAppConfiguration from 'models/IAppConfiguration';
import { action } from 'mobx';
import * as firebase from 'firebase';

// Load configuration data JSON, which is exposed as export in webpack.
const config: IAppConfiguration = require('Configuration');

class ApplicationStore {
  @action public initializeFirebase() {
    firebase.initializeApp(config.firebaseConfig)
  }
}

export default ApplicationStore;