import { Dispatcher } from "flux";

class AppDispatcher extends Dispatcher {
  dispatch(action = {}) {
    super.dispatch(action);
  }
}

export default new AppDispatcher();
