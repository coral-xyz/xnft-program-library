import {array, Infer, number,type, object, string, nullable } from "superstruct";

export type TokenInfoType = Infer<typeof TokenInfoType>;
export const TokenInfoType= type({
  "id": string(),
  "symbol": string(),
  "name": string(),
  "image": string(),
  "current_price": number(),
  "market_cap": number(),
  "market_cap_rank": number(),
  "fully_diluted_valuation": nullable(number()),
  "total_volume": number(),
  "high_24h": nullable(number()),
  "low_24h": nullable(number()),
  "price_change_24h": nullable(number()),
  "price_change_percentage_24h": nullable(number()),
  "market_cap_change_24h": nullable(number()),
  "market_cap_change_percentage_24h": nullable(number()),
  "circulating_supply":  nullable(number()),
  "total_supply": nullable(number()),
  "max_supply": nullable(number()),
  "ath": nullable(number()),
  "ath_change_percentage": nullable(number()),
  "ath_date": nullable(string()),
  "atl": number(),
  "atl_change_percentage":nullable(number()),
  "atl_date": nullable(string()),
  "last_updated": nullable(string()),
  "sparkline_in_7d": type({
    "price": array(number())
  }),
  "price_change_percentage_24h_in_currency": nullable(number())
});
