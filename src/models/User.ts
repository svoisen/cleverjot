import * as firebase from 'firebase';

class User {
  private _firebaseUser: firebase.User;

  constructor(firebaseUser: firebase.User) {
    this._firebaseUser = firebaseUser;
  }

  public get userId(): string {
    return this._firebaseUser.uid;
  }

  public get firebaseUser(): firebase.User {
    return this._firebaseUser;
  }
}

export default User;