import * as firebase from 'firebase';
import IAppConfiguration from 'models/IAppConfiguration';
import User from 'models/User';
import { action, observable, runInAction } from 'mobx';

// Required for side-effects
require('firebase/firestore');

// Load configuration data JSON, which is exposed as export in webpack.
const config: IAppConfiguration = require('Configuration');

enum ApplicationStatus {
  INITIALIZING = 'INITIALIZING',
  INTIALIZED = 'INITIALIZED'
}

class ApplicationStore {
  @observable public status: ApplicationStatus = ApplicationStatus.INITIALIZING;

  private _firebaseApp: firebase.app.App;
  private _firestoreDB: firebase.firestore.Firestore;
  private _currentUser: User;

  public get firebaseApp(): firebase.app.App {
    return this._firebaseApp;
  }

  public get firestoreDB(): firebase.firestore.Firestore {
    return this._firestoreDB;
  }

  public get isAuthenticated(): boolean {
    return this._currentUser !== undefined;
  }

  public get currentUser(): User {
    return this._currentUser;
  }

  @action public initialize() {
    this._firebaseApp = firebase.initializeApp(config.firebaseConfig);
    this._firestoreDB = firebase.firestore();

    const auth = this.firebaseApp.auth();
    auth.onAuthStateChanged(firebaseUser => {
      runInAction(() => {
        if (firebaseUser) {
          console.log(`Signed in as ${firebaseUser.email}`);
          this._currentUser = new User(firebaseUser);
        } else {
          console.log('User signed out');
          this._currentUser = undefined;
        }

        this.status = ApplicationStatus.INTIALIZED;
      });
    });
  }
}

export default ApplicationStore;

export {
  ApplicationStatus
}