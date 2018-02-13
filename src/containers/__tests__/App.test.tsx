import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import App from 'containers/App';
import ApplicationStore from 'stores/ApplicationStore';
import { mount, configure } from 'enzyme';

const firebasemock = require('firebase-mock');
const mockAuth = new firebasemock.MockFirebase();
const mockSdk = firebasemock.MockFirebaseSdk(null, () => mockAuth);
configure({ adapter: new Adapter() });

describe('App', () => {
  let mockApp: any;
  let store: ApplicationStore;

  beforeAll(() => {
    mockApp = mockSdk.initializeApp();
  });

  beforeEach(() => {
    store = new ApplicationStore(mockApp)
  });

  describe('constructor', () => {
    it('should initialize the ApplicationStore', () => {
      store.initialize = jest.fn();
      mount(<App applicationStore={ store } />);
      expect(store.initialize).toHaveBeenCalled();
    });
  });
});