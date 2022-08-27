import React from "react";
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
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <Path
        data-name="layer1"
        d="M2 40v9.5a40.1 40.1 0 0 1 10.1-2.9l-2.2.3A8 8 0 0 0 2 40zm8-26a8.2 8.2 0 0 0-.1-1.2C4.1 14 2 16.2 2 16.2V22a8 8 0 0 0 8-8z"
        fill={fill}
      ></Path>
      <Path
        data-name="layer2"
        d="M50.1 17.9l2-.3a48 48 0 0 1-6.1.4c-12.8 0-16-6-28-6l-4.1.2A12.2 12.2 0 0 1 14 14 12 12 0 0 1 2 26v10a12 12 0 0 1 11.9 10.4A49.4 49.4 0 0 1 20 46c10.8 0 18.4 6 28 6h2.2a12.1 12.1 0 0 1-.2-2 12 12 0 0 1 12-12V28a11.9 11.9 0 0 1-11.9-10.1zM33.8 41.6c-5.4 0-10.6-4.5-11.6-10s2.7-10 8.1-10S41 26 41.9 31.6s-2.6 10-8.1 10z"
        fill={fill}
      ></Path>
      <Path
        data-name="layer1"
        d="M54.1 17.3A8 8 0 0 0 62 24v-8.5a67.3 67.3 0 0 1-7.9 1.8zM54 50a8.2 8.2 0 0 0 .1 1.5l-1.9.4c6.7-.6 9.8-2.3 9.8-2.3V42a8 8 0 0 0-8 8z"
        fill={fill}
      ></Path>
    </Svg>
  );
}

export function YieldIcon({ fill = "#FFEFEB" }) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
      <Path
        fill={fill}
        d="M96 64C96 28.65 124.7 0 160 0H266.3C292.5 0 316 15.93 325.8 40.23L373.7 160H480V126.2C480 101.4 485.8 76.88 496.9 54.66L499.4 49.69C507.3 33.88 526.5 27.47 542.3 35.38C558.1 43.28 564.5 62.5 556.6 78.31L554.1 83.28C547.5 96.61 544 111.3 544 126.2V160H600C622.1 160 640 177.9 640 200V245.4C640 261.9 631.5 277.3 617.4 286.1L574.1 313.2C559.9 307.3 544.3 304 528 304C488.7 304 453.9 322.9 431.1 352H352C352 369.7 337.7 384 320 384H311.8C310.1 388.8 308.2 393.5 305.1 398.1L311.8 403.9C324.3 416.4 324.3 436.6 311.8 449.1L289.1 471.8C276.6 484.3 256.4 484.3 243.9 471.8L238.1 465.1C233.5 468.2 228.8 470.1 224 471.8V480C224 497.7 209.7 512 192 512H160C142.3 512 128 497.7 128 480V471.8C123.2 470.1 118.5 468.2 113.9 465.1L108.1 471.8C95.62 484.3 75.36 484.3 62.86 471.8L40.24 449.1C27.74 436.6 27.74 416.4 40.24 403.9L46.03 398.1C43.85 393.5 41.9 388.8 40.19 384H32C14.33 384 0 369.7 0 352V320C0 302.3 14.33 288 32 288H40.19C41.9 283.2 43.85 278.5 46.03 273.9L40.24 268.1C27.74 255.6 27.74 235.4 40.24 222.9L62.86 200.2C71.82 191.3 84.78 188.7 96 192.6L96 64zM160 64V160H304.7L266.3 64H160zM176 256C131.8 256 96 291.8 96 336C96 380.2 131.8 416 176 416C220.2 416 256 380.2 256 336C256 291.8 220.2 256 176 256zM440 424C440 394.2 454.8 367.9 477.4 352C491.7 341.9 509.2 336 528 336C530.7 336 533.3 336.1 535.9 336.3C580.8 340.3 616 378.1 616 424C616 472.6 576.6 512 528 512C479.4 512 440 472.6 440 424zM528 448C541.3 448 552 437.3 552 424C552 410.7 541.3 400 528 400C514.7 400 504 410.7 504 424C504 437.3 514.7 448 528 448z"
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

export function StablecoinIcon({ fill = "#FFEFEB" }) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <Path
        data-name="layer2"
        d="M45.8 41.9c0-3.68-1.7-10.234-13.1-12.817a.269.269 0 0 0-.028-.01C24.2 27.142 24.2 23.348 24.2 22.1c0-4.741 4.043-6.9 7.8-6.9a7.771 7.771 0 0 1 7.692 6.5 3 3 0 1 0 5.916-.994A13.733 13.733 0 0 0 35 9.54V5a3 3 0 0 0-6 0v4.488C22.674 10.7 18.2 15.717 18.2 22.1c0 3.667 1.705 10.208 13.12 12.821l.021.008C36.954 36.2 39.8 38.542 39.8 41.9c0 4.739-4.043 6.9-7.8 6.9a7.809 7.809 0 0 1-7.8-7.8 3 3 0 0 0-6 0A13.817 13.817 0 0 0 29 54.464V59a3 3 0 0 0 6 0v-4.484C41.326 53.3 45.8 48.287 45.8 41.9z"
        fill={fill}
      ></Path>
      <Path
        data-name="layer1"
        d="M31.8 9.163a15.725 15.725 0 0 1 3.2.377V5a3 3 0 0 0-6 0v4.444a10.067 10.067 0 0 1 2.8-.281zm.4 45.673a15.665 15.665 0 0 1-3.2-.377V59a3 3 0 0 0 6 0v-4.444a10.053 10.053 0 0 1-2.8.28z"
        fill={fill}
      ></Path>
      <Path
        data-name="opacity"
        d="M29.275 60.241l5.675-5.675a9.949 9.949 0 0 1-2.75.27 15.665 15.665 0 0 1-3.2-.377V59a2.979 2.979 0 0 0 .275 1.241z"
        fill={fill}
        opacity=".1"
      ></Path>
    </Svg>
  );
}
