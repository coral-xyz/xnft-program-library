import React from "react";
import { Loading, Text, View, TextField } from "react-xnft";
import 'react-virtualized/styles.css'; // only needs to be imported once
import { connect, StateType, useDispatch } from "./state";
import { createSelector } from 'reselect';
import { SET_FILTER } from "./_actions/SET_FILTER";
import useTokenList from "./_hooks/useTokenList";


type Props = {
}

type StateProps = {
  filter: string
  tokenInfo: StateType["tokenInfo"];
}

function TokenList({ filter, tokenInfo: tokenList }: Props&StateProps) {
  useTokenList(tokenList);
  const dispatch = useDispatch();

  if (!tokenList) {
    return (
      <Loading>Loading</Loading>
    )
  }
  const regex = new RegExp(filter, "i");
  const filteredList = tokenList.data.filter((token) => regex.test(token.name));
  // filteredList.sort();
  // filteredList.length = 30;

  // const list = tokenList;

  return <>
    <TextField onChange={(e) => dispatch(SET_FILTER({ filter: e.data.value}))} value={filter} />
    {filteredList.map((token) => {
      return (
        <View key={token.id} >
          <Text>{`${token.name} (${token.symbol}) ${token.id}`}</Text>
        </View>
      )
    })}
  </>
}

const selector = createSelector(
  (state:StateType) => state.filter,
  (state:StateType) => state.tokenInfo,
  (filter, tokenInfo) => ({ filter, tokenInfo })
)

export default connect<Props, StateProps>(selector)(TokenList);

