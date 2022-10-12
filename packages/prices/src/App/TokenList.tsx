import React from "react";
import { Loading, Text, View, TextField, useNavigation, ScrollBar } from "react-xnft";
import 'react-virtualized/styles.css'; // only needs to be imported once
import { connect, StateType, useDispatch } from "../state";
import { createSelector } from 'reselect';
import { SET_FILTER } from "./_actions/SET_FILTER";
import useRefreshTokenList from "./_hooks/useRefreshTokenList";
import CenteredLoader from "./CenteredLoader";


type Props = {
}

type StateProps = {
  filter: string
  tokenInfo: StateType["tokenInfo"];
}

function TokenList({ filter, tokenInfo: tokenList }: Props & StateProps) {
  useRefreshTokenList(tokenList);
  const dispatch = useDispatch();
  const nav = useNavigation();

  if (!tokenList) {
    return (
      <CenteredLoader />
    )
  }
  const regex = new RegExp(filter, "i");
  const filteredList = tokenList.data.filter((token) => regex.test(token.name)||regex.test(token.symbol)||regex.test(token.id));
  filteredList.length = 50;
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        height:"100%"
      }}
    >
      <View
        style={{
          display:"flex",
          padding: "0px 10px"
        }}
      >
        <TextField
          placeholder="Filter Assets..."
          onChange={(e) => dispatch(SET_FILTER({ filter: e.data.value }))}
          value={filter}
        />
      </View>
      <View
      style={{
        display:"flex",
        flexGrow:1,
        position:"relative"
      }}
      >
      <ScrollBar>
        {filteredList.map((token) => {
          return (
            <View
              style={{
                padding: "10px"
              }}
              key={token.id}
              onClick={() => nav.push("details", token)}
            >
              <Text>{`${token.name} (${token.symbol}) ${token.id}`}</Text>
            </View>
          )
        })}
      </ScrollBar>
      </View>
      
    </View>
  )
}

const selector = createSelector(
  (state: StateType) => state.filter,
  (state: StateType) => state.tokenInfo,
  (filter, tokenInfo) => ({ filter, tokenInfo })
)

export default connect<Props, StateProps>(selector)(TokenList);

