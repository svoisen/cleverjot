import * as React from 'react';
import * as firebase from 'firebase';
import { inject } from 'mobx-react';
import ApplicationStore from 'stores/ApplicationStore';

const { FirebaseAuth } = require('react-firebaseui');

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/notes',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
}

interface IAuthenticationPageProps {
  applicationStore?: ApplicationStore;
}

@inject('applicationStore')
class AuthenticationPage extends React.Component<IAuthenticationPageProps, any> {
  public render() {
    const { firebaseApp } = this.props.applicationStore;

    return (
      <FirebaseAuth uiConfig={ uiConfig } firebaseAuth={ firebaseApp.auth() } />
    )
  }
}

export default AuthenticationPage;