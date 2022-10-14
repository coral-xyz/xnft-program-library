import React, { useState } from "react";
import { Button, Image, Text, View } from "react-xnft";
import { TokenInfoType } from "./_types/TokenInfoType";
import { green, red } from "./_helpers/color";
import formatPrice from "./_helpers/formatPrice";
import useSWR from "swr";
import CenteredLoader from "./CenteredLoader";
import Chart from "./Chart";
import { GraphDataPointType } from "./_types/GraphDataPointType";
import filterChartData, { charts } from "./_helpers/filterChartData";
import Star from "./Star";
import { StateType, connect, useDispatch } from "../state";
import { createSelector } from "reselect";
import { FAVORITE } from "./_actions/FAVORITE";

type Props = {
  token: TokenInfoType
}

type StateProps = {
  isFavorited: boolean
}

const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) => fetch(input, init).then(res => res.json())

type MarketChartData = {
  prices: GraphDataPointType[]
}


function TokenDetails(props: Props & StateProps) {
  const dispatch = useDispatch();
  const [activeChart, setActiveChart] = useState<string>("1D");
  const { data: minuteData } = useSWR<MarketChartData>(`https://pro-api.coingecko.com/api/v3/coins/${props.token.id}/market_chart?vs_currency=usd&days=1&x_cg_pro_api_key=CG-YrhgwDXiLCa2Euwf1EqRYWNg`, fetcher, {
    revalidateOnMount: true
  });
  const { data: hourData } = useSWR<MarketChartData>(`https://pro-api.coingecko.com/api/v3/coins/${props.token.id}/market_chart?vs_currency=usd&days=90&x_cg_pro_api_key=CG-YrhgwDXiLCa2Euwf1EqRYWNg`, fetcher, {
    revalidateOnMount: true
  });
  const { data: dailyData } = useSWR<MarketChartData>(`https://pro-api.coingecko.com/api/v3/coins/${props.token.id}/market_chart?vs_currency=usd&days=max&x_cg_pro_api_key=CG-YrhgwDXiLCa2Euwf1EqRYWNg`, fetcher, {
    revalidateOnMount: true
  });

  const currentPrice = formatPrice(props.token.current_price);
  const changePercent = formatPrice(props.token.price_change_percentage_24h);
  const changeCurrency = formatPrice(props.token.price_change_24h);

  const data = filterChartData(activeChart, minuteData?.prices, hourData?.prices, dailyData?.prices);

  const arrow = (props.token.price_change_percentage_24h ?? 0) + 0 > 0 ? "↗" : "↘";
  const color = (props.token.price_change_percentage_24h ?? 0) + 0 > 0 ? green : red;

  const isUp = (data?.points[0][1] ?? 0) < (data?.points[(data?.points.length ?? 1) - 1][1] ?? 0);
  const colorButton = isUp ? green : red;


  return (
    <>
      <View style={{
        display: "flex",
        padding: "8px 16px",
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
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: "1"
          }}
        >
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
        <View
          onClick={() => dispatch(FAVORITE({
            assetId: props.token.id,
            isFavorited: !props.isFavorited
          }))}
          style={{
            cursor:"pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
            paddingRight: "0px"
          }}
        >
          <Star key={colorButton+props.isFavorited} color={colorButton} isFilled={props.isFavorited} strokeWidth={1} size={30}></Star>
        </View>
      </View>
      {data ? (
        <>
          <Chart
            data={data.points}
            height={250}
            width={343}
            title={`${props.token.symbol.toUpperCase()} ${activeChart}`}
            ticks={data.labels}
          />
          <View
            style={{
              padding: "8px 16px",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            {charts.map((chart, i) => (
              <Button
                onClick={() => setActiveChart(chart)}
                style={{
                  color: "black",
                  borderRadius: "14px",
                  padding: "0px 8px",
                  minWidth: "auto",
                  width: "auto",
                  border: chart === activeChart ? `4px solid ${colorButton}` : "4px solid transparent"
                }}
              >
                {chart}
              </Button>
            ))}
          </View>
        </>
      ) : (
        <View
          style={{
            padding: "0px 16px",
            position: "relative",
            width: "343px",
            height: "250px"
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

const selector = createSelector(
  (state: StateType, props: Props) => state.favorites[props.token.id],
  (isFavorited) => ({ isFavorited })
)

export default connect<Props, StateProps>(selector)(TokenDetails);