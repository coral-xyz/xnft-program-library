import { useEffect, useMemo, useState } from "react";
import { LocalStorage } from "react-xnft";
import { StateType, useDispatch } from "../../state";
import { SET_TOKENLIST } from "../_actions/SET_TOKENLIST";
import { TokenListType } from "../_types/TokenListType";

const TTL = 1000*5;
const refreshtime = 1000*5
const count = 250;
const url = `https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${count}&page=1&sparkline=true&price_change_percentage=24h&x_cg_pro_api_key=CG-YrhgwDXiLCa2Euwf1EqRYWNg`;

function useRefreshTokenList() {
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
          console.error(e, "refreshing in", refreshtime)
        });
    }
    fetchTokenList();
    const refresh = setInterval(fetchTokenList, refreshtime);
    return ()=>{
      clearInterval(refresh)
    };
  }, []);
}



export default useRefreshTokenList;