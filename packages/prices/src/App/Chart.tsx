import React from "react";
import { GraphDataPointType } from "./_types/GraphDataPointType";
import { View, Text, Svg, Path } from "react-xnft";
import { green, red } from "./_helpers/color";
import makeGraph from "./_helpers/makeGraph";
import formatPrice from "./_helpers/formatPrice";

type Props = {
  data: GraphDataPointType[]
  height: number,
  width: number
}

function Chart({ data, height, width }: Props) {

  const color = data[0][1] > data[data.length - 1][1] ? red : green;
  const graph = makeGraph(data, width, height);

  return (
    <View
      style={{
        margin: "0 16px",
      }}
    >
      <Text
        style={{
          fontSize: "12px",
          color:"#52525B",
          textAlign:"right"
        }}
      >{`H:${formatPrice(graph.max)}  L:${formatPrice(graph.min)}`}</Text>
      <View
        style={{
          width: `${width}px`,
          height: `${height}px`,
          borderTop: "1px solid #52525B",
          borderBottom: "1px solid #52525B",
        }}
      >
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
    </View>
  )
}

export default Chart;
