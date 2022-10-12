import { createSimpleAction, Reducer } from "../_helpers/redux";
import { StateType } from "../state";

export const LOADING_STATUS = createSimpleAction<{
  key: string,
  status: StateType["loadingStatus"][""]
}, "LOADING_STATUS" >("LOADING_STATUS");

export const LOADING_STATUS_reducer: Reducer<StateType, ReturnType<typeof LOADING_STATUS>> = (state, action)  => {
  return {
    ...state,
    loadingStatus: {
      ...state.loadingStatus,
      [action.key]: action.status
    }
  };
}