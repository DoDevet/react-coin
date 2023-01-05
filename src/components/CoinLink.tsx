import styled from "styled-components";
import { Link } from "react-router-dom";
import { CoinInterface } from "../routes/atoms";
const Coin = styled.li`
  background-color: ${(props) => props.theme.boxColor};
  margin: 10px;
  border-radius: 8px;
  a {
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in-out;
    padding: 15px;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const CoinIcon = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 12px;
`;
function CoinLink({ id, name, symbol }: CoinInterface) {
  return (
    <Coin>
      <Link
        to={{
          pathname: `/${id}`,
          state: { name: name },
        }}
      >
        <CoinIcon
          src={`https://coinicons-api.vercel.app/api/icon/${symbol.toLowerCase()}`}
        />
        {name}
        &rarr;
      </Link>
    </Coin>
  );
}

export default CoinLink;
