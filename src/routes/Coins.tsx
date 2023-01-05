import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoins } from "../api";
import CoinLink from "../components/CoinLink";
import Layout from "../components/Layout";
import { CoinInterface } from "./atoms";

const CoinsList = styled.ul``;

const Loader = styled.span`
  text-align: center;
  display: block;
  margin: 20px 0px;
`;

function Coins() {
  const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);
  return (
    <Layout title="Coin">
      <CoinsList>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          data
            ?.slice(0, 100)
            .map((coin) => <CoinLink key={coin.id} {...coin} />)
        )}
      </CoinsList>
    </Layout>
  );
}

export default Coins;
