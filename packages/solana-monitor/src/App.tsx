import React from "react";
import ReactXnft, { Tab, View } from "react-xnft";
import { DollarIcon, MonitorIcon, NFTIcon } from "./utils/icons";
import { Monitor } from "./components/monitor";
import { Defi } from "./components/defi";
import { NFT } from "./components/nft";

//
// On connection to the host environment, warm the cache.
//
ReactXnft.events.on("connect", () => {
  //
});

export function App() {
  return (
    <View style={{ height: "100%", backgroundColor: "#1f2937" }}>
      <Tab.Navigator
        style={{
          backgroundColor: "#1f2937",
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        }}
        options={({ route }) => {
          return {
            tabBarIcon: ({ focused }) => {
              const color = focused ? "#f9fafb" : "#6b7280";

              if (route.name === "monitor") {
                return <Tab.Icon element={<MonitorIcon fill={color} />} />;
              } else if (route.name === "defi") {
                return <Tab.Icon element={<DollarIcon fill={color} />} />;
              } else if (route.name === "nft") {
                return <Tab.Icon element={<NFTIcon fill={color} />} />;
              }
            },
          };
        }}
      >
        <Tab.Screen
          name="monitor"
          component={() => <Monitor />}
        />
        <Tab.Screen name="nft" component={() => <NFT />} />
        <Tab.Screen
          name="defi"
          component={() => <Defi />}
        />
      </Tab.Navigator>
    </View>
  );
}
