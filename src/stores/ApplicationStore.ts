import IAppConfiguration from 'models/IAppConfiguration';
import { action } from 'mobx';
import * as firebase from 'firebase';

// Load configuration data JSON, which is exposed as export in webpack.
const config: IAppConfiguration = require('Configuration');

class ApplicationStore {
  private _firebaseApp: firebase.app.App;

  public get firebaseApp(): firebase.app.App {
    return this._firebaseApp;
  }

  public get isAuthenticated(): boolean {
    return this.firebaseApp.auth().currentUser !== undefined;
  }

  @action public initializeFirebase() {
    this._firebaseApp = firebase.initializeApp(config.firebaseConfig);
  }
}

export default ApplicationStore;