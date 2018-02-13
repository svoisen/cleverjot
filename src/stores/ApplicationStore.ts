import * as firebase from 'firebase';
import User from 'models/User';
import { action, observable, runInAction } from 'mobx';

// Required for side-effects
require('firebase/firestore');

enum ApplicationStatus {
  INITIALIZING = 'INITIALIZING',
  INTIALIZED = 'INITIALIZED'
}

class ApplicationStore {
  @observable public status: ApplicationStatus = ApplicationStatus.INITIALIZING;

  private _firebaseApp: firebase.app.App;
  private _firebaseAuth: firebase.auth.Auth;
  private _firestoreDB: firebase.firestore.Firestore;
  private _currentUser: User;
  private authStatusUnsubscribe: firebase.Unsubscribe;

  constructor(app: firebase.app.App) {
    this._firebaseApp = app;
    this._firebaseAuth = app.auth();
    this._firestoreDB = app.firestore();
  }

  public get firebaseApp(): firebase.app.App {
    return this._firebaseApp;
  }

  public get firebaseAuth(): firebase.auth.Auth {
    return this._firebaseAuth;
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

  @action public initialize(): Promise<User | undefined> {
    return new Promise(resolve => {
      this.authStatusUnsubscribe = this.firebaseAuth.onAuthStateChanged(firebaseUser => {
        runInAction(() => {
          if (firebaseUser) {
            console.log(`Signed in as ${firebaseUser.email}`);
            this._currentUser = new User(firebaseUser);
          } else {
            console.log('User signed out');
            this._currentUser = undefined;
          }

          this.status = ApplicationStatus.INTIALIZED;
          resolve(this._currentUser);
        });
      });
    });
  }

  public destroy() {
    this.authStatusUnsubscribe();
  }
}

export default ApplicationStore;

export {
  ApplicationStatus
}