import { SET_FILTER, SET_FILTER_reducer } from './_actions/SET_FILTER';
import { INITIALIZE_STATE, INITIALIZE_STATE_reducer } from './_actions/INITIALIZE_STATE';
import createRedux, { Reducer } from './_helpers/redux';
import { SET_TOKENLIST, SET_TOKENLIST_reducer } from './_actions/SET_TOKENLIST';
import debounce from "debounce"
import { LocalStorage } from 'react-xnft';
import { LOADING_STATUS, LOADING_STATUS_reducer } from './_actions/LOADING_STATUS';
import { array, nullable, boolean, Infer, number, object, string, type, record, union, literal } from "superstruct";
import { TokenListType } from './_types/TokenListType';



export type StateType = Infer<typeof StateType>;
export const StateType = type({
  initialized: boolean(),
  filter: string(),
  loadingStatus: record(
    string(),
    union([literal("LOADING"), literal("SUCCESS"), literal("ERROR")])
  ),
  tokenInfo: nullable(object({
    updated: number(),
    data: TokenListType
  }))
});


export type Actions =
  | ReturnType<typeof SET_FILTER>
  | ReturnType<typeof INITIALIZE_STATE>
  | ReturnType<typeof SET_TOKENLIST>
  | ReturnType<typeof LOADING_STATUS>;


const reducer: Reducer<StateType, Actions> = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_STATE": return INITIALIZE_STATE_reducer(state, action);
    case "SET_FILTER": return SET_FILTER_reducer(state, action);
    case "LOADING_STATUS": return LOADING_STATUS_reducer(state, action);
    case "SET_TOKENLIST": return SET_TOKENLIST_reducer(state, action);
    default: return state;
  }
}

const initialState: StateType = {
  initialized: false,
  filter: "",
  tokenInfo: null,
  loadingStatus: {}
};


const debouncedLocalstorageUpdate = debounce(async (state) => {
  await LocalStorage.set("PricesState", state)
}, 500, true);
const persistReducer: Reducer<StateType, Actions> = (state, action) => {
  const newState = reducer(state, action);
  if (newState !== state) {
    debouncedLocalstorageUpdate(newState);
  }
  return newState;
}

export const {
  useDispatch,
  ReduxProvider,
  connect
} = createRedux<StateType, Actions>(persistReducer, initialState);

