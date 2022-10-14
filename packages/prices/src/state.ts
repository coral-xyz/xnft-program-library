import { INITIALIZE_STATE, INITIALIZE_STATE_reducer } from './App/_actions/INITIALIZE_STATE';
import createRedux, { Reducer } from './App/_helpers/redux';
import { SET_TOKENLIST, SET_TOKENLIST_reducer } from './App/_actions/SET_TOKENLIST';
import debounce from "debounce"
import { LocalStorage } from 'react-xnft';
import { nullable, boolean, Infer, number, object, string, type, record, union, literal } from "superstruct";
import { TokenListType } from './App/_types/TokenListType';
import persistentReducer from "./App/_helpers/persistentReducer";
import { FAVORITE, FAVORITE_reducer } from './App/_actions/FAVORITE';

export type StateType = Infer<typeof StateType>;
export const StateType = type({
  initialized: boolean(),
  loadingStatus: record(
    string(),
    union([literal("LOADING"), literal("SUCCESS"), literal("ERROR")])
  ),
  tokenInfo: nullable(object({
    updated: number(),
    data: TokenListType
  })),
  favorites: record(
    string(),
    boolean()
  )
});

export type Actions =
  | ReturnType<typeof INITIALIZE_STATE>
  | ReturnType<typeof SET_TOKENLIST>
  | ReturnType<typeof FAVORITE>


const reducer: Reducer<StateType, Actions> = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_STATE": return INITIALIZE_STATE_reducer(state, action);
    case "SET_TOKENLIST": return SET_TOKENLIST_reducer(state, action);
    case "FAVORITE": return FAVORITE_reducer(state, action);
    default: return state;
  }
}

const initialState: StateType = {
  initialized: false,
  tokenInfo: null,
  loadingStatus: {},
  favorites: {}
};

export const {
  useDispatch,
  ReduxProvider,
  connect
} = createRedux<StateType, Actions>(persistentReducer(reducer), initialState);

