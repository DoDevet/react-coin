import { useRecoilValue } from "recoil";
import styled from "styled-components";
import PercentNum from "../components/PercentNum";
import { priceInfo } from "./atoms";

interface IPriceInfo {
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
}
const CoinInfoBox = styled.div`
  background-color: ${(props) => props.theme.boxColor};
  display: flex;
  padding: 10px 19px;
  border-radius: 10px;
  flex-direction: column;
  text-align: center;
`;

const InfoSpan = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 3px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const GridWrapper = styled.div<{ itemNum: number }>`
  display: grid;
  width: 100%;
  margin: 20px 0;
  grid-template-columns: ${(props) => `repeat(${props.itemNum},1fr)`};
`;

function Price() {
  const data = useRecoilValue<IPriceInfo>(priceInfo);
  return (
    <CoinInfoBox>
      <GridWrapper itemNum={4}>
        <Column>
          <InfoSpan>24H:</InfoSpan>
          <PercentNum num={data.percent_change_24h}></PercentNum>
        </Column>
        <Column>
          <InfoSpan>7D:</InfoSpan>
          <PercentNum num={data.percent_change_7d}></PercentNum>
        </Column>
        <Column>
          <InfoSpan>30D:</InfoSpan>
          <PercentNum num={data.percent_change_30d}></PercentNum>
        </Column>
        <Column>
          <InfoSpan>30M:</InfoSpan>
          <PercentNum num={data.percent_change_30m}></PercentNum>
        </Column>
      </GridWrapper>
      <InfoSpan>PRICE_ATH:</InfoSpan>
      <PercentNum num={data.percent_from_price_ath}></PercentNum>

      <GridWrapper itemNum={2}>
        <Column>
          <InfoSpan>Market_Cap:</InfoSpan>
          <span>{data.market_cap}</span>
        </Column>
        <Column>
          <InfoSpan>Trade(24H):</InfoSpan>
          <span>{data.volume_24h}</span>
        </Column>
      </GridWrapper>
    </CoinInfoBox>
  );
}

export default Price;
