import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
interface IChartProps {
  coinId: string;
}
interface ICoinHistoryProps {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

function Chart({ coinId }: IChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { data, isLoading } = useQuery<ICoinHistoryProps[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000000,
    }
  );

  return (
    <Container>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          style={{ width: 500, height: 500 }}
          type="candlestick"
          series={[
            {
              data:
                data?.map((item) => {
                  return {
                    x: item.time_close * 1000,
                    y: [item.open, item.high, item.low, item.close],
                  };
                }) ?? [],
            },
          ]}
          options={{
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
              show: false,
            },
            theme: {
              mode: isDark === "dark" ? "dark" : "light",
            },
            chart: {
              width: 500,
              height: 300,
              background: "transparent",
              toolbar: {
                show: false,
              },
            },
            grid: { show: true },
          }}
        />
      )}
    </Container>
  );
}

export default Chart;
