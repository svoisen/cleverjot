import ApplicationStore, { ApplicationStatus } from 'stores/ApplicationStore';

const firebasemock = require('firebase-mock');
const mockAuth = new firebasemock.MockFirebase();
const mockSdk = firebasemock.MockFirebaseSdk(null, () => mockAuth);

describe('ApplicationStore', () => {
  let mockApp: any;
  let store: ApplicationStore;

  beforeAll(() => {
    mockAuth.autoFlush();
    mockApp = mockSdk.initializeApp();
  });

  beforeEach(() => {
    store = new ApplicationStore(mockApp);
  });

  describe('constructor', () => {
    it('should have a default status of INITIALIZING', () => {
      expect(store.status).toEqual(ApplicationStatus.INITIALIZING);
    });
  });

  describe('initialize', () => {
    it('should set the user if the user is authenticated', done => {
      store.initialize().then(user => {
        expect(store.currentUser).toBeDefined();
        expect(user).toBe(store.currentUser);
        done();
      });

      mockAuth.changeAuthState({
        uid: 'foo'
      });
    });

    it('should set the application status to INITIALIZED', done => {
      store.initialize().then(() => {
        expect(store.status).toEqual(ApplicationStatus.INTIALIZED)
        done();
      });

      mockAuth.changeAuthState();
    });
  });
});