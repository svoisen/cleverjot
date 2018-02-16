import NotesStore from 'stores/NotesStore';

// const firebasemock = require('firebase-mock');
// const mockFirestore = new firebasemock.MockFirestore();

describe('NotesStore', () => {
  let store: NotesStore;

  beforeEach(() => {
    store = new NotesStore();
  });

  describe('constructor', () => {
    it('should have an empty notes array', () => {
      expect(store.notes).toBeDefined();
      expect(store.notes).toHaveLength(0);
    });
  })
});