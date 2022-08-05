import { View, Text, List, ListItem, Image } from "react-xnft";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export function NFT() {
  const { data } = useSWR("https://api.solscan.io/collection?sortBy=volume30day&offset=0&limit=10&cluster=", fetcher);

  return (
    <View style={{ height: "100%" }}>
      <Text
        style={{
          marginTop: "20px",
          marginBottom: "12px",
          textAlign: "center",
          fontWeight: 600,
          fontSize: "18px",
        }}
      >
        NFT Monitor
      </Text>

        <View style={{ margin: "0px 20px 0px 20px", backgroundColor: "none", paddingBottom: "10px" }}>
            {data &&
                data.data.map((item, index) => {
                    return (
                        <View
                            style={{
                                padding: "10px 20px",
                                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 5px 8px 10px -6px #0f766e",
                                backgroundColor: "#111827",
                                marginBottom: "25px",
                                marginTop: "25px",
                                borderRadius: "12px",
                            }}
                        >
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: "15px",
                                    marginTop: "5px",
                                }}
                            >
                                <View style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                                    <Image
                                        style={{
                                            width: "25px",
                                            height: "25px",
                                        }}
                                        src={item.data.avatar}
                                    />
                                    <Text>{item.data.collection}</Text>
                                </View>
                                <Text>{index + 1}</Text>
                            </View>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: "5px",
                                }}
                            >
                                {/* Items */}
                                <View>
                                    <Text
                                        style={{
                                            fontSize: "14px",
                                            color: "#6b7280",
                                        }}
                                    >
                                        Items
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "16px",
                                            color: "#f9fafb",
                                        }}
                                    >
                                        {item.totalItems.toLocaleString("en-US")}
                                    </Text>
                                </View>

                                {/* Floor Pice */}
                                <View>
                                    <Text
                                        style={{
                                            fontSize: "14px",
                                            color: "#6b7280",
                                        }}
                                    >
                                        Floor Price
                                    </Text>

                                    <View style={{display: "flex", flexDirection: "row", gap: 5}}>
                                        <Image
                                            style={{
                                                width: "20px",
                                                height: "20x",
                                            }}
                                            src="https://solscan.io/static/media/solana-sol-logo.b612f140.svg"
                                        />
                                        <Text
                                            style={{
                                                fontSize: "16px",
                                                color: "#f9fafb",
                                            }}
                                        >
                                            {(item.floorPrice / 10 ** 9).toLocaleString("en-US")}
                                        </Text>
                                    </View>
                                </View>


                                {/* Volume 30D */}
                                <View>
                                    <Text
                                        style={{
                                            fontSize: "14px",
                                            color: "#6b7280",
                                        }}
                                    >
                                        Volume 30D
                                    </Text>
                                    <View style={{display: "flex", flexDirection: "row", gap: 5}}>
                                        <Image
                                            style={{
                                                width: "20px",
                                                height: "20x",
                                            }}
                                            src="https://solscan.io/static/media/solana-sol-logo.b612f140.svg"
                                        />
                                        <Text
                                            style={{
                                                fontSize: "16px",
                                                color: "#f9fafb",
                                            }}
                                        >
                                            {(item.volume / 10 ** 9).toLocaleString("en-US")}
                                        </Text>
                                    </View>

                                </View>
                            </View>
                        </View>
                    );
                })}
        </View>

    </View>
  );
}
