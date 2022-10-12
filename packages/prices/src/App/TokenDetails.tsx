import React from "react";
import { Loading, Text, View, TextField } from "react-xnft";
import 'react-virtualized/styles.css'; // only needs to be imported once
import { connect, StateType, useDispatch } from "../state";

type Props = {
}

type StateProps = {
  filter: string
  tokenInfo: StateType["tokenInfo"];
}

function TokenDetails( props: Props & StateProps) {
  console.log(props);

  return (<Text>
    {JSON.stringify(props, null, 2)}
  </Text>);
}

// const selector = createSelector(
//   // (state: StateType) => state.filter,
//   // (state: StateType) => state.tokenInfo,
//   // (filter, tokenInfo) => ({ filter, tokenInfo })
// )

// export default connect<Props, StateProps>(selector)(TokenDetails);

export default TokenDetails;