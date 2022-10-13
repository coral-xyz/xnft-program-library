import React from "react";
import { Loading, Text, View, Image, TextField, useNavigation, ScrollBar } from "react-xnft";
import { connect, StateType, useDispatch } from "../state";
import { createSelector } from 'reselect';
import { SET_FILTER } from "./_actions/SET_FILTER";
import useRefreshTokenList from "./_hooks/useRefreshTokenList";
import CenteredLoader from "./CenteredLoader";
import { green, red } from "./_helpers/color";
import formatPrice from "./_helpers/formatPrice";

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
  const filteredList = tokenList.data.filter((token) => regex.test(token.name) || regex.test(token.symbol) || regex.test(token.id));
  filteredList.length = 20;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding:"10px 0px",
        cursor:"pointer"
      }}
    >
      <View
        style={{
          display: "flex",
          padding:"0px 16px",
          paddingBottom: "10px"
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
          display: "flex",
          flexGrow: 1,
          position: "relative"
        }}
      >
        <ScrollBar>
          {filteredList.map((token) => {
            const changePercent = formatPrice(token.price_change_percentage_24h);
            const currentPrice = formatPrice(token.current_price);
            const arrow = (token.price_change_percentage_24h??0)+0>0?"↗":"↘";
            const color = (token.price_change_percentage_24h??0)+0>0?green:red; 
      
            return (
              <View
                style={{
                  padding: "8px 16px",
                  display: "flex"
                }}
                key={token.id}
                onClick={() => nav.push("details", {token})}
              >
                <View
                  style={{
                    padding:"5px",
                    paddingRight:"10px",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center"
                  }}
                  >
                  <Image 
                    style={{
                      width: "34px",
                      // padding:"5px"
                    }}
                    src={token.image}
                  />
                </View>
                <View
                  style={{
                    display: "flex",
                    flexGrow: 1,
                    flexDirection: "column"
                  }}
                >
                  <Text
                    style={{
                      lineHeight:"24px"
                    }}
                  >{`${token.name}`}</Text>
                  <Text
                    style={{
                      opacity:0.5
                    }}
                  >{`${token.symbol.toLocaleUpperCase()}`}</Text>
                </View>
                <View
                  style={{
                    // width: "100px"
                  }}
                >
                  <Text
                    style={{
                      textAlign:"right"
                    }}
                  >{`$${currentPrice}`}</Text>
                  <Text
                    style={{
                      font: "Inter",
                      fontSize: "16px",
                      textAlign:"right",
                      color: color
                    }}
                  >{`${arrow} ${changePercent}%`}</Text>
                </View>
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

