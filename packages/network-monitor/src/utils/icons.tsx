import { Svg, Path } from "react-xnft";

export function MonitorIcon({ fill = "#FFEFEB" }) {
  return (
    <Svg width="25" height="25" viewBox="0 0 20 20" fill="none">
      <Path
        lip-rule="evenodd"
        fill-rule="evenodd"
        d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
        fill={fill}
      />
    </Svg>
  );
}

export function DollarIcon({ fill = "#FFEFEB" }) {
  return (
    <Svg width="25" height="25" viewBox="0 0 20 20" fill="none">
      <Path
        d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
        fill={fill}
        clip-rule="evenodd"
        fill-rule="evenodd"
      />
    </Svg>
  );
}

export function NFTIcon({ fill = "#FFEFEB" }) {
  return (
    <Svg width="25" height="25" viewBox="0 0 20 20" fill="none">
      <Path
        fill-rule="evenodd"
        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
        clip-rule="evenodd"
        fill={fill}
      />
    </Svg>
  );
}
