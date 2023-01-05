import { useQuery } from "react-query";
import {
  Switch,
  useLocation,
  useParams,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";
import Layout from "../components/Layout";
import { useSetRecoilState } from "recoil";
import { priceInfo } from "./atoms";

interface RouteParams {
  coinId: string;
}

const Loader = styled.span`
  text-align: center;
  display: block;
  margin: 20px 0px;
`;

const CoinInfoBox = styled.div`
  background-color: ${(props) => props.theme.boxColor};
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 10px 19px;
  border-radius: 10px;
  align-items: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px auto;
  font-size: 16px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 25px 0px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.boxColor};
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.fontColor};

  a {
    padding: 8px 10px;
    display: block;
    transition: color 0.3s ease-in-out;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

interface LocationState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<LocationState>();
  const setPrice = useSetRecoilState<PriceData>(priceInfo);
  const chartMatch = useRouteMatch("/:coinId/chart");
  const priceMatch = useRouteMatch("/:coinId/price");

  const { isLoading: tickersLoading, data: tickerData } = useQuery<PriceData>(
    ["ticker", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 6000000,
    }
  );

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  setPrice(tickerData?.quotes.USD || ([] as any));
  const loading = infoLoading || tickersLoading;
  return (
    <Layout title={state?.name || infoData?.name || "Loading...."}>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <CoinInfoBox>
            <Column>
              <span>RANK:</span>
              <span>{infoData?.rank}</span>
            </Column>
            <Column>
              <span>SYMBOL:</span>
              <span>${infoData?.symbol}</span>
            </Column>
            <Column>
              <span>Price:</span>
              <span>${tickerData?.quotes.USD.price.toFixed(3)}</span>
            </Column>
          </CoinInfoBox>

          <Description>{infoData?.description}</Description>

          <CoinInfoBox>
            <Column>
              <span>Total Supply:</span>
              <span>{tickerData?.total_supply}</span>
            </Column>
            <Column>
              <span>Max Supply:</span>
              <span>${tickerData?.max_supply}</span>
            </Column>
          </CoinInfoBox>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          {/*nested Route*/}
          <Switch>
            <Route path="/:coinId/price">
              <Price />
            </Route>
            <Route path="/:coinId/chart">
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Layout>
  );
}

export default Coin;
