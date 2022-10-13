import React, { useEffect } from "react";
import ReactXnft, { Loading, LocalStorage, View } from "react-xnft";
import { connect, ReduxProvider, StateType, useDispatch } from "../state";
import { createSelector } from 'reselect';
import { INITIALIZE_STATE } from "./_actions/INITIALIZE_STATE";
import CenteredLoader from "./CenteredLoader";
import Navigation from "./Navigation";

// On connection to the host environment, warm the cache.
//
ReactXnft.events.on("connect", () => {
  // no-op
});

const defaultTokenList = ["bitcoin", "ethereum", "solana"];

type Props = {
}

type StateProps = {
  initialized: boolean
}

function _App({ initialized }: Props & StateProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!initialized) {
      LocalStorage.get("PricesState").then((state) => {
        if (StateType.is(state)) {
          dispatch(INITIALIZE_STATE({ state }))
        } else {
          dispatch(INITIALIZE_STATE({ state: null }))
        }
      })
    }
  }, [initialized])

  if (!initialized) {
    return (<CenteredLoader />)
  }

  return <View
    style={{
      position: "relative",
      height: "100%",
      background: "rgb(0,0,0, 0.87)"
    }}
  >
    <Navigation />
  </View>
}

const selector = createSelector(
  (state: StateType) => (state.initialized),
  (initialized) => ({ initialized })
)
const ConnectedApp = connect<Props, StateProps>(selector)(_App);

export function App() {
  return (
    <ReduxProvider>
      <ConnectedApp />
    </ReduxProvider>
  );
}
