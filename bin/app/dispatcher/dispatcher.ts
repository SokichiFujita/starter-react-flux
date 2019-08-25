import { Dispatcher } from "flux";
import { Actions } from "../constants/AppConstants";

class AppDispatcher extends Dispatcher<Actions> {
  dispatch(action: Actions) {
    super.dispatch(action);
  }
}

export default new AppDispatcher();
