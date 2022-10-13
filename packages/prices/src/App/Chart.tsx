import React from "react";
import { GraphDataPointType } from "./_types/GraphDataPointType";
import { View, Text, Svg, Path } from "react-xnft";
import { green, red } from "./_helpers/color";
import makeGraph from "./_helpers/makeGraph";
import formatPrice from "./_helpers/formatPrice";

type Props = {
  data: GraphDataPointType[]
  height: number,
  width: number,
  title: string,
  ticks: string[]
}

function Chart({ data, height, width, title, ticks }: Props) {
  const color = data[0][1] > data[data.length - 1][1] ? red : green;
  const gradientColor = data[0][1] > data[data.length - 1][1] ?
    `linear-gradient(rgb(0,0,0,0), rgba(239, 68, 68, 0.2))` :
    `linear-gradient(rgba(52, 211, 153, 0.2), rgb(0,0,0,0))`;
  const graph = makeGraph(data, width, height);

  return (
    <View
      style={{
        margin: "0 16px",
        padding: "16px 0px",
        position: "relative"
      }}
    >
      <Text
        style={{
          position: "absolute",
          fontSize: "12px",
          color: "#52525B",
          textAlign: "left",
          width: "100%",
          top: "-2px",
        }}
      >{title}</Text>
      <Text
        style={{
          position: "absolute",
          fontSize: "12px",
          color: "#52525B",
          textAlign: "right",
          width: "100%",
          top: "-2px",
        }}
      >{`L:${formatPrice(graph.min)} H:${formatPrice(graph.max)}`}</Text>

      <View
        style={{
          position: "absolute",
          borderTop: ".5px solid #52525B",
          width: "100%",
          top: "50%",
          zIndex: 0
        }}
      />
      <View
        style={{
          position:"relative",
          width: `${width}px`,
          height: `${height}px`,
          borderTop: ".5px solid #52525B",
          borderBottom: ".5px solid #52525B",
          background: gradientColor,
          zIndex: 1
        }}
      >
        {ticks.map((tick, i, a) => {
          return (<>
            <Text
              style={{
                position: "absolute",
                fontSize: "12px",
                color: "#52525B",
                textAlign: i === 0 ? "left" : i === a.length - 1 ? "right" : "center",
                bottom: "-18px",
                width: "30px",
                marginLeft: i === 0 ? 0 : i === a.length - 1 ? "-30px" : "-15px",
                left: i * width / (a.length - 1),
              }}
            > {tick}</Text>
            <View
              style={{
                position: "absolute",
                height: "100%",
                top: "0px",
                left: i * width / (a.length - 1),
                borderLeft: ".5px solid #52525B",
              }}
            ></View>
          </>)
        })}
        <Svg
          width={width}
          height={height}
        >
          <Path
            d={graph.curve}
            stroke={color}
            fill="none"
            style={{
              strokeWidth: 2
            }}
          />
        </Svg>
      </View>
    </View >
  )
}

export default Chart;
