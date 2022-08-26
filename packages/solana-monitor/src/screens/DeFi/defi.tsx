import React, { useEffect, useState } from 'react';
import { View, Text, TextField, ListItem, Image, Svg, Path } from "react-xnft";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export function DeFiScreen() {
  const [protocolData, setProtocolData] = useState<any>();
    const { data } = useSWR("https://api.llama.fi/charts/solana", fetcher);
    console.log("data",data ? data[data.length-1]['totalLiquidityUSD'] : data);

    const diff  = data ? `${data[data.length-1]['totalLiquidityUSD'] > data[data.length-2]['totalLiquidityUSD'] ? data[data.length-2]['totalLiquidityUSD']/data[data.length-1]['totalLiquidityUSD'] : data[data.length-1]['totalLiquidityUSD']/data[data.length-2]['totalLiquidityUSD']}` : "";
    const g = data ? `${data[data.length-1]['totalLiquidityUSD'] > data[data.length-2]['totalLiquidityUSD'] ? "#39D98A" : "#FF5C5C"}` : "";
  
    const protocol_data = useSWR("https://api.llama.fi/protocols", fetcher);
    const filtered = protocol_data?.data?.filter((data, index) => data.chain === "Solana" && data.tvl > 1000);
    console.log("protocol data filtered", filtered);

  const convertToInternationalCurrencySystem = (labelValue) => {

    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

    ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

    : Math.abs(Number(labelValue));

  }

  return (
    <View style={{ height: "100%" }}>
      {/* <View
        style={{
          marginTop: "12px",
          marginLeft: "20px",
          marginBottom: "11px",
          fontWeight: 700,
          fontSize: "16x",
          lineHeight: "16px",
          color: "#0DD3E2",
        }}
      >
        <Svg width="60" height="29" viewBox="0 0 60 29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path d="M4.992 12.192C3.66933 12.192 2.60267 11.808 1.792 11.04C0.981333 10.272 0.554667 9.376 0.512 8.352H3.056C3.14133 8.82133 3.35467 9.18933 3.696 9.456C4.048 9.712 4.48 9.84 4.992 9.84C5.42933 9.84 5.78133 9.74933 6.048 9.568C6.32533 9.38667 6.464 9.14133 6.464 8.832C6.464 8.288 5.968 7.87733 4.976 7.6L3.872 7.312C2.92267 7.056 2.176 6.64 1.632 6.064C1.088 5.488 0.810667 4.768 0.8 3.904C0.8 2.848 1.152 2.01067 1.856 1.392C2.57067 0.762666 3.52 0.447999 4.704 0.447999C5.89867 0.447999 6.86933 0.810666 7.616 1.536C8.36267 2.25067 8.75733 3.072 8.8 4H6.272C6.15467 3.584 5.952 3.28 5.664 3.088C5.376 2.896 5.056 2.8 4.704 2.8C4.30933 2.8 3.98933 2.88 3.744 3.04C3.49867 3.2 3.37067 3.42933 3.36 3.728C3.34933 4.02667 3.456 4.272 3.68 4.464C3.91467 4.656 4.26667 4.816 4.736 4.944L6.032 5.28C6.98133 5.536 7.71733 5.95733 8.24 6.544C8.77333 7.13067 9.04 7.86667 9.04 8.752C9.04 9.73333 8.66667 10.5547 7.92 11.216C7.17333 11.8667 6.19733 12.192 4.992 12.192ZM17.305 10.976C16.4837 11.776 15.4917 12.176 14.329 12.176C13.1663 12.176 12.1743 11.776 11.353 10.976C10.5317 10.1653 10.121 9.17333 10.121 8C10.121 6.82667 10.5317 5.84 11.353 5.04C12.1743 4.22933 13.1663 3.824 14.329 3.824C15.4917 3.824 16.4837 4.22933 17.305 5.04C18.1263 5.84 18.537 6.82667 18.537 8C18.537 9.17333 18.1263 10.1653 17.305 10.976ZM13.049 9.392C13.3903 9.744 13.817 9.92 14.329 9.92C14.841 9.92 15.2623 9.744 15.593 9.392C15.9343 9.04 16.105 8.576 16.105 8C16.105 7.424 15.9343 6.96 15.593 6.608C15.2623 6.256 14.841 6.08 14.329 6.08C13.817 6.08 13.3903 6.256 13.049 6.608C12.7183 6.96 12.553 7.424 12.553 8C12.553 8.576 12.7183 9.04 13.049 9.392ZM20.0233 12V-9.53674e-07H22.4393V12H20.0233ZM27.6615 12.176C26.6268 12.176 25.7468 11.7653 25.0215 10.944C24.3068 10.1227 23.9495 9.14133 23.9495 8C23.9495 6.85867 24.3068 5.87733 25.0215 5.056C25.7468 4.23467 26.6268 3.824 27.6615 3.824C28.5788 3.824 29.3042 4.14933 29.8375 4.8V4H32.2535V12H29.8375V11.2C29.3042 11.8507 28.5788 12.176 27.6615 12.176ZM26.8775 9.424C27.2188 9.79733 27.6615 9.984 28.2055 9.984C28.7495 9.984 29.1868 9.79733 29.5175 9.424C29.8588 9.05067 30.0295 8.576 30.0295 8C30.0295 7.424 29.8588 6.94933 29.5175 6.576C29.1868 6.20267 28.7495 6.016 28.2055 6.016C27.6615 6.016 27.2188 6.20267 26.8775 6.576C26.5468 6.94933 26.3815 7.424 26.3815 8C26.3815 8.576 26.5468 9.05067 26.8775 9.424ZM34.242 12V4H36.658V4.816C37.1167 4.15467 37.858 3.824 38.882 3.824C39.8527 3.824 40.61 4.14933 41.154 4.8C41.7087 5.45067 41.986 6.30933 41.986 7.376V12H39.57V7.792C39.57 6.608 39.138 6.016 38.274 6.016C37.794 6.016 37.4047 6.192 37.106 6.544C36.8073 6.896 36.658 7.41867 36.658 8.112V12H34.242ZM47.099 12.176C46.0643 12.176 45.1843 11.7653 44.459 10.944C43.7443 10.1227 43.387 9.14133 43.387 8C43.387 6.85867 43.7443 5.87733 44.459 5.056C45.1843 4.23467 46.0643 3.824 47.099 3.824C48.0163 3.824 48.7417 4.14933 49.275 4.8V4H51.691V12H49.275V11.2C48.7417 11.8507 48.0163 12.176 47.099 12.176ZM46.315 9.424C46.6563 9.79733 47.099 9.984 47.643 9.984C48.187 9.984 48.6243 9.79733 48.955 9.424C49.2963 9.05067 49.467 8.576 49.467 8C49.467 7.424 49.2963 6.94933 48.955 6.576C48.6243 6.20267 48.187 6.016 47.643 6.016C47.099 6.016 46.6563 6.20267 46.315 6.576C45.9843 6.94933 45.819 7.424 45.819 8C45.819 8.576 45.9843 9.05067 46.315 9.424ZM1.2 16.64H3.52L7.056 21.536L10.624 16.64H12.944V28H10.384V21.008L7.072 25.584L3.744 20.992V28H1.2V16.64ZM21.6175 26.976C20.7962 27.776 19.8042 28.176 18.6415 28.176C17.4788 28.176 16.4868 27.776 15.6655 26.976C14.8442 26.1653 14.4335 25.1733 14.4335 24C14.4335 22.8267 14.8442 21.84 15.6655 21.04C16.4868 20.2293 17.4788 19.824 18.6415 19.824C19.8042 19.824 20.7962 20.2293 21.6175 21.04C22.4388 21.84 22.8495 22.8267 22.8495 24C22.8495 25.1733 22.4388 26.1653 21.6175 26.976ZM17.3615 25.392C17.7028 25.744 18.1295 25.92 18.6415 25.92C19.1535 25.92 19.5748 25.744 19.9055 25.392C20.2468 25.04 20.4175 24.576 20.4175 24C20.4175 23.424 20.2468 22.96 19.9055 22.608C19.5748 22.256 19.1535 22.08 18.6415 22.08C18.1295 22.08 17.7028 22.256 17.3615 22.608C17.0308 22.96 16.8655 23.424 16.8655 24C16.8655 24.576 17.0308 25.04 17.3615 25.392ZM24.3358 28V20H26.7518V20.816C27.2104 20.1547 27.9518 19.824 28.9758 19.824C29.9464 19.824 30.7038 20.1493 31.2478 20.8C31.8024 21.4507 32.0798 22.3093 32.0798 23.376V28H29.6638V23.792C29.6638 22.608 29.2318 22.016 28.3678 22.016C27.8878 22.016 27.4984 22.192 27.1998 22.544C26.9011 22.896 26.7518 23.4187 26.7518 24.112V28H24.3358ZM35.1608 18.912C34.7554 18.912 34.4034 18.768 34.1048 18.48C33.8061 18.1813 33.6568 17.824 33.6568 17.408C33.6568 16.992 33.8061 16.64 34.1048 16.352C34.4034 16.0533 34.7554 15.904 35.1608 15.904C35.5874 15.904 35.9448 16.0533 36.2328 16.352C36.5314 16.64 36.6808 16.992 36.6808 17.408C36.6808 17.824 36.5314 18.1813 36.2328 18.48C35.9448 18.768 35.5874 18.912 35.1608 18.912ZM33.9608 28V20H36.3768V28H33.9608ZM42.447 28.096C41.5083 28.096 40.735 27.84 40.127 27.328C39.5297 26.8053 39.231 26.0533 39.231 25.072V22.096H37.631V20H39.231V17.776H41.647V20H43.887V22.096H41.647V24.576C41.647 25.056 41.7537 25.4027 41.967 25.616C42.1803 25.8293 42.527 25.936 43.007 25.936C43.3697 25.936 43.663 25.888 43.887 25.792V27.936C43.535 28.0427 43.055 28.096 42.447 28.096ZM51.9925 26.976C51.1712 27.776 50.1792 28.176 49.0165 28.176C47.8538 28.176 46.8618 27.776 46.0405 26.976C45.2192 26.1653 44.8085 25.1733 44.8085 24C44.8085 22.8267 45.2192 21.84 46.0405 21.04C46.8618 20.2293 47.8538 19.824 49.0165 19.824C50.1792 19.824 51.1712 20.2293 51.9925 21.04C52.8138 21.84 53.2245 22.8267 53.2245 24C53.2245 25.1733 52.8138 26.1653 51.9925 26.976ZM47.7365 25.392C48.0778 25.744 48.5045 25.92 49.0165 25.92C49.5285 25.92 49.9498 25.744 50.2805 25.392C50.6218 25.04 50.7925 24.576 50.7925 24C50.7925 23.424 50.6218 22.96 50.2805 22.608C49.9498 22.256 49.5285 22.08 49.0165 22.08C48.5045 22.08 48.0778 22.256 47.7365 22.608C47.4058 22.96 47.2405 23.424 47.2405 24C47.2405 24.576 47.4058 25.04 47.7365 25.392ZM54.7108 28V20H57.1268V21.2C57.2548 20.8373 57.4948 20.5333 57.8468 20.288C58.1988 20.032 58.5934 19.904 59.0308 19.904C59.3081 19.904 59.5694 19.936 59.8148 20V22.448C59.4414 22.32 59.0841 22.256 58.7428 22.256C58.2308 22.256 57.8308 22.4373 57.5428 22.8C57.2654 23.152 57.1268 23.6213 57.1268 24.208V28H54.7108Z" fill="#0DD3E2"/>
        </Svg>
      </View> */}
      {/* <View style={{marginTop: "11px", width: "100%", height: "1px", background: "rgba(255, 255, 255, 0.06)"}}></View> */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          paddingRight: "16px"
        }}
      >
        {/* TVL */}
        <View style={{flex: "1", paddingTop: "11px", paddingLeft:"12px", paddingRight: "11px", width: "166px", marginLeft: "16px", marginTop: "20px", paddingBottom: "16px", background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.04)", backdropFilter: "blur(30px)", borderRadius: "8px"}}>
          <Text style={{fontFamily: "Inter", fontSize: "14px", fontWeight: "400", lineHeight: "150%", alignItems: "center", color: "rgba(255, 255, 255, 0.65)"}}>
            Total Value Locked
          </Text>
          <View style={{marginTop: "11px", width: "100%", height: "1px", background: "rgba(255, 255, 255, 0.06)"}}></View>
          <View style={{display: "flex", flexDirection: "row", marginTop: "12px"}}>
            <Text style={{fontWeight: "700", fontSize: "18px", lineHeight: "150%", color: "white"}}>
              ${data ? `${data[data.length-1]['totalLiquidityUSD'].toString().slice(0,1)}.${data[data.length-1]['totalLiquidityUSD'].toString().slice(0,1)}` : "0"}b
            </Text>
            <Text style={{alignItems: "center", textAlign: "center", fontWeight: "500", marginTop: "5px", marginLeft:"4px", fontSize: "12px", lineHeight: "150%", color: g}}>
              {diff.toString().slice(0,4)}%
            </Text>
          </View>
        </View>

        {/* Protocols */}
        <View style={{flex: "1", paddingTop: "11px", paddingLeft:"12px", paddingRight: "11px", width: "166px", marginLeft: "16px", marginTop: "20px", paddingBottom: "16px", background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.04)", backdropFilter: "blur(30px)", borderRadius: "8px"}}>
          <Text style={{fontFamily: "Inter", fontSize: "14px", fontWeight: "400", lineHeight: "150%", alignItems: "center", color: "rgba(255, 255, 255, 0.65)"}}>
            Protocols
          </Text>
          <View style={{marginTop: "11px", width: "100%", height: "1px", background: "rgba(255, 255, 255, 0.06)"}}></View>
          <View style={{display: "flex", flexDirection: "row", marginTop: "12px"}}>
            <Text style={{fontWeight: "700", fontSize: "18px", lineHeight: "150%", color: "white"}}>
              {filtered ? filtered?.length : 0}
            </Text>
            
          </View>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          paddingRight: "16px"
        }}
      >
        {/* SOL Price */}
        <View style={{flex: "1", paddingTop: "11px", paddingLeft:"12px", paddingRight: "11px", width: "166px", marginLeft: "16px", marginTop: "20px", paddingBottom: "16px", background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.04)", backdropFilter: "blur(30px)", borderRadius: "8px"}}>
          <Text style={{display: "flex", fontFamily: "Inter", fontSize: "14px", fontWeight: "400", lineHeight: "150%", alignItems: "center", color: "rgba(255, 255, 255, 0.65)"}}>
            SOL Price
            <View style={{marginLeft: "5px", background: "rgba(255, 255, 255, 0.04)", borderRadius:"6px", height: "24px", width: "67px"}}>
                <Text style={{marginLeft: "5px", fontFamily: "Inter", fontSize: "14px", fontWeight: "400", lineHeight: "150%", alignItems: "center", color: "#0DD3E2"}}>Rank #9</Text>
            </View>
          </Text>
          <View style={{marginTop: "11px", width: "100%", height: "1px", background: "rgba(255, 255, 255, 0.06)"}}></View>
          <View style={{display: "flex", flexDirection: "row", marginTop: "12px"}}>
            <Text style={{fontWeight: "700", fontSize: "18px", lineHeight: "150%", color: "white"}}>
              $35.74
            </Text>
            <Text style={{alignItems: "center", textAlign: "center", fontWeight: "500", marginTop: "5px", marginLeft:"4px", fontSize: "12px", lineHeight: "150%", color: "#39D98A"}}>
              2.37%
            </Text>
          </View>
        </View>

        {/* Mcap */}
        <View style={{flex: "1", paddingTop: "11px", paddingLeft:"12px", paddingRight: "11px", width: "166px", marginLeft: "16px", marginTop: "20px", paddingBottom: "16px", background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.04)", backdropFilter: "blur(30px)", borderRadius: "8px"}}>
          <Text style={{fontFamily: "Inter", fontSize: "14px", fontWeight: "400", lineHeight: "150%", alignItems: "center", color: "rgba(255, 255, 255, 0.65)"}}>
            Marketcap
          </Text>
          <View style={{marginTop: "11px", width: "100%", height: "1px", background: "rgba(255, 255, 255, 0.06)"}}></View>
          <View style={{display: "flex", flexDirection: "row", marginTop: "12px"}}>
            <Text style={{fontWeight: "700", fontSize: "18px", lineHeight: "150%", color: "white"}}>
              $12.5B
            </Text>
            
          </View>
        </View>
      </View>
      <Text style={{fontStyle:"normal", fontWeight:"700", fontSize: "18px", lineHeight: "150%", color: "#FFFFFF", marginTop: "20px", marginLeft: "16px"}}>Protocols</Text>
      {/* <TextField style={{marginTop: "10px", marginLeft: "16px", width: "365px"}} />   */}
      <View style={{display: "flex", flexDirection: "row", marginTop: "8px", marginLeft: "16px"}}>
        <Text style={{fontWeight: "400", fontSize: "12px", lineHeight: "150%", color: "rgba(255, 255, 255, 0.45)"}}>Name</Text>
        <Text style={{fontWeight: "400", fontSize: "12px", lineHeight: "150%", color: "rgba(255, 255, 255, 0.45)", marginLeft: "105px"}}>Category</Text>
        <Text style={{fontWeight: "400", fontSize: "12px", lineHeight: "150%", color: "rgba(255, 255, 255, 0.45)", marginLeft: "25px"}}>Liquidity</Text>
        <Text style={{fontWeight: "400", fontSize: "12px", lineHeight: "150%", color: "rgba(255, 255, 255, 0.45)", marginLeft: "20px"}}>Chg 24H</Text>
      </View>
      {filtered &&
          filtered?.map((item, index) => {
            return (
              <>
                <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: "20px", marginBottom: "16px"}}>
                    <Text style={{fontWeight: "400", fontSize: "12px", marginLeft: "16px"}}>{index + 1}</Text>
                    <Image 
                      src={item.logo}
                      style={{
                        width: "23px",
                        height: "23px",
                        marginLeft: `${(index + 1 <= 10) ? "10px" : "8px" }`,
                        borderRadius: "50px",
                      }}
                    />
                    <View style={{width: "90px"}}>
                      <Text style={{fontStyle: "normal", fontWeight:"400", fontSize: "12px", lineHeight: "120%", color: "#0DD3E2", marginLeft: "4px"}}>{item.name}</Text>
                    </View>
                    <View style={{width: "53px", justifyContent: "right", alignItems: "right"}}>
                      <Text style={{justifyContent: "right", alignItems: "right", fontStyle: "normal", fontWeight:"400", fontSize: "12px", lineHeight: "120%", color: "white", marginLeft: "30px"}}>{item.category}</Text>
                    </View>
                    <View style={{width: "57px", justifyContent: "right", alignItems: "right"}}>
                      <Text style={{justifyContent: "right", alignItems: "right", fontStyle: "normal", fontWeight:"400", fontSize: "12px", lineHeight: "120%", color: "white", marginLeft: "35px"}}>{convertToInternationalCurrencySystem(item['chainTvls'].Solana)}</Text>
                    </View>
                    <View style={{width: "57px", justifyContent: "right", alignItems: "right"}}>
                      <Text style={{justifyContent: "right", alignItems: "right", fontStyle: "normal", fontWeight:"400", fontSize: "12px", lineHeight: "120%", color: "white", marginLeft: "65px"}}>{item.change_1d?.toString().slice(0,4)}%</Text>
                    </View>
                </View>
                <View style={{background: "rgba(255, 255, 255, 0.06)", borderRadius: "1px", width: "100%", height:"1px", marginLeft:"5px", marginRight: "16px"}}></View>

              </>
            );
          })}
    </View>
  );
}
