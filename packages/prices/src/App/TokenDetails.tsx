import React from "react";
import { Loading, Image, Text, View, TextField } from "react-xnft";
import { connect, StateType, useDispatch } from "../state";
import { TokenInfoType } from "./_types/TokenInfoType";
import { green, red } from "./_helpers/color";
import formatPrice from "./_helpers/formatPrice";

type Props = {
  token: TokenInfoType
}

function TokenDetails(props: Props) {
  console.log(props);

  const currentPrice = formatPrice(props.token.current_price);
  const changePercent = formatPrice(props.token.price_change_percentage_24h);
  const changeCurrency = formatPrice(props.token.price_change_24h);
  const arrow = (props.token.price_change_percentage_24h ?? 0) + 0 > 0 ? "↗" : "↘";
  const color = (props.token.price_change_percentage_24h ?? 0) + 0 > 0 ? green : red;

  return (
    <>

      <View style={{
        display: "flex",
        padding: "16px"
      }}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: "16px"
          }}
        >
          <Image
            style={{
              width: "50px",
              // padding:"5px"
            }}
            src={props.token.image}
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: "Inter",
              fontSize: "30px",
              fontWeight: "700",
              lineHeight: "36px"
            }}
          >
            {`$${currentPrice}`}
          </Text>
          <Text
            style={{
              fontFamily: "Inter",
              fontSize: "16px",
              lineHeight: "24px",
              color: color
            }}
          >
            {`${arrow} ${changePercent}% ($${changeCurrency})`}
          </Text>
        </View>
      </View>
      <View
        style={{
          margin: "0px 16px",
          position: "relative",
          border: "1px solid rgb(255,255,255, 0.5)",
          height: "275px"
        }}
      ></View>
      <View
        style={{
          display: "flex",
          fontFamily: "Inter",
          fontSize: "14px",
          lineHeight: "16px",
          alignItems: "stretch",
          padding: "8px 8px" 
        }}
      >
        <View
          style={{
            display: "flex",
            flexGrow: "1",
            flexDirection: "column",
            flexStart: "start",
            padding: "8px",
          }}
        >
          <AssetFact label="Symbol" value={props.token.symbol.toLocaleUpperCase()} />
          <AssetFact label="Rank" value={formatPrice(props.token.market_cap_rank, true)} />
          <AssetFact label="Market Cap" value={formatPrice(props.token.market_cap, true)} />
        </View>
        <View
          style={{
            display: "flex",
            flexGrow: "1",
            flexDirection: "column",
            flexStart: "start",
            padding: "8px",
          }}
        >
          <AssetFact label="Volume" value={formatPrice(props.token.total_volume, true)} />
          <AssetFact label="Supply" value={formatPrice(props.token.total_supply, true)} />
          <AssetFact label="ATH" value={`$${formatPrice(props.token.ath)}`} />
        </View>
      </View>
    </>
  );
}

function AssetFact({ label, value }: { label: string, value: string }) {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "space-between"
      }}>
      <Text
        style={{
          opacity: "0.5"
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          textAlign: "right"
        }}
      >
        {value}
      </Text>
    </View>
  );
}

// const selector = createSelector(
//   // (state: StateType) => state.filter,
//   // (state: StateType) => state.tokenInfo,
//   // (filter, tokenInfo) => ({ filter, tokenInfo })
// )

// export default connect<Props, StateProps>(selector)(TokenDetails);

export default TokenDetails;