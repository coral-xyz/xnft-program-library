import { createSimpleAction, Reducer } from "../_helpers/redux";
import { StateType } from "../../state";

export const SET_FILTER = createSimpleAction<{
  filter: string,
}, "SET_FILTER">("SET_FILTER");

export const SET_FILTER_reducer: Reducer<StateType, ReturnType<typeof SET_FILTER>> = (state, action)  => {
  return {
    ...state,
    filter: action.filter 
  };
}