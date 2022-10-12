import React, { Stack, Text } from "react-xnft";
import TokenDetails from "./TokenDetails";
import TokenList from "./TokenList";

function Navigation() {
  return (<Stack.Navigator
    initialRoute={{ name: "list" }}
    options={({ route }) => {
      switch (route.name) {
        case "list":
          return {
            title: "Cryptoassets",
            props: {
              style: {
                textAlign:"left"
              }
            }
          };
        case "details":{
          return {
            title: route.props?.token.name,
          };}
        default:
          throw new Error("unknown route");
      }
    }}
    style={{
      font: "Inter",
      fontSize: "20px",
      fontWeight: "700",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
      height: "56px",
    }}
  >
    <Stack.Screen
      name={"list"}
      component={(props) => <TokenList />}
    />
    <Stack.Screen
      name={"details"}
      component={(props) => <TokenDetails {...props} />}
    />
  </Stack.Navigator>)
}

export default Navigation;