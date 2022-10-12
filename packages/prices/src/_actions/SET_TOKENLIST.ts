import { createSimpleAction, Reducer } from "../_helpers/redux";
import { StateType } from "../state";

export const SET_TOKENLIST = createSimpleAction<{
  tokenInfo: StateType["tokenInfo"],
}, "SET_TOKENLIST">("SET_TOKENLIST");

export const SET_TOKENLIST_reducer: Reducer<StateType, ReturnType<typeof SET_TOKENLIST>> = (state, action)  => {
  return {
    ...state,
    tokenInfo: action.tokenInfo 
  };
}