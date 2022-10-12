import { useEffect, useMemo, useState } from "react";
import { LocalStorage } from "react-xnft";
import { StateType, useDispatch } from "../state";
import { SET_TOKENLIST } from "../_actions/SET_TOKENLIST";
import { TokenListType } from "../_types/TokenListType";

const TTL = 1000*5;
const refreshtime = 1000*5
const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=24h";

function useTokenList(tokenList: StateType["tokenInfo"]) {
  const dispatch = useDispatch();
  useEffect(() => {
    const now = Date.now();
    const fetchTokenList = () => {
      fetch(url)
        .then(async (response) => {
          const json = await response.json();
          if (TokenListType.is(json)) {
            dispatch(SET_TOKENLIST({
              tokenInfo: {
                updated: now,
                data: json
              }
            }));
          }
          else {
            throw TokenListType.validate(json)[0];
          }
        }).catch((e) => {
          console.log(e, "refreshing in", refreshtime)
        });
    }
    if (!tokenList || tokenList.updated + TTL < now) {
      fetchTokenList();
    }
    const refresh = setInterval(fetchTokenList, refreshtime);
    return ()=>clearInterval(refresh);
  }, [tokenList]);

}



export default useTokenList;