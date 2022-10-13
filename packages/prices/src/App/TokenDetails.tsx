import React from "react";
import { Image, Text, View } from "react-xnft";
import { TokenInfoType } from "./_types/TokenInfoType";
import { green, red } from "./_helpers/color";
import formatPrice from "./_helpers/formatPrice";
import useSWR from "swr";
import CenteredLoader from "./CenteredLoader";
import Chart from "./Chart";

type Props = {
  token: TokenInfoType
}

const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) => fetch(input, init).then(res => res.json())

type DataPoint = [time: number, value: number];
type MarketChartData = {
  prices: DataPoint[]
}

const labelForTime = (time: number) => {
  const date = new Date(time);
  return `${date.getHours()}:${date.getMinutes()}`;
}

function TokenDetails(props: Props) {
  const { data } = useSWR<MarketChartData>(`https://api.coingecko.com/api/v3/coins/${props.token.id}/market_chart?vs_currency=usd&days=1`, fetcher, {
    revalidateOnMount: true
  });

  const currentPrice = formatPrice(props.token.current_price);
  const changePercent = formatPrice(props.token.price_change_percentage_24h);
  const changeCurrency = formatPrice(props.token.price_change_24h);
  const arrow = (props.token.price_change_percentage_24h ?? 0) + 0 > 0 ? "↗" : "↘";
  const color = (props.token.price_change_percentage_24h ?? 0) + 0 > 0 ? green : red;

  const hourlyData = data?.prices.filter((_,i,a)=>(i%6===0 || i===a.length))

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

      {hourlyData? (
        <Chart
          data={hourlyData}
          height={220}
          width={343}
          title={`${props.token.symbol.toUpperCase()} 1d / 30min`}
          ticks={[
            labelForTime(hourlyData[0][0]), 
            labelForTime(hourlyData[Math.floor(hourlyData.length/2)][0]), 
            labelForTime(hourlyData[hourlyData.length-1][0])]}
        />
      ) : (
        <View
          style={{
            margin: "0px 16px",
            position: "relative",
            width: "343px",
            height: "275px"
          }}
        >
          <CenteredLoader />
        </View>
      )}


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