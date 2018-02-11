import { History } from 'history';
import { RouterStore as BaseRouterStore, syncHistoryWithStore } from 'mobx-react-router';

const ROUTER_STORE = 'routerStore';

class RouterStore extends BaseRouterStore {
  constructor(history: History) {
    super();
    this.history = syncHistoryWithStore(history, this);
  }
};

export default RouterStore;

export {
  ROUTER_STORE
};