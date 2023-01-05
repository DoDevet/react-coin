import { Helmet, HelmetProvider } from "react-helmet-async";
import { BsFillSunFill, BsFillMoonFill, BsBackspaceFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "../routes/atoms";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";

const Container = styled.div`
  max-width: 480px;
  margin: 0px auto;
  padding: 10px 20px;
`;
const Title = styled.h1`
  display: flex;
  font-size: 48px;
  margin-right: 15px;
  color: ${(props) => props.theme.accentColor};
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-items: center;
  margin: 0 auto;
  gap: 100px;
  height: 20vh;
`;

const ThemeModeBtn = styled.button`
  border: none;
  background-color: inherit;
  color: ${(props) => props.theme.fontColor};
  cursor: pointer;
`;

const BackBtn = styled(ThemeModeBtn)`
  opacity: ${(props) => (props.disabled ? "0" : "1")};
  width: min-content;
  font-size: 13px;
`;

interface LocationState {
  name: string;
}
function Layout({ children, title }: any) {
  const [dark, setDarkAtom] = useRecoilState(isDarkAtom);
  const location = useLocation<LocationState>();
  const toggleTheme = () => {
    setDarkAtom((prev: string) => {
      localStorage.setItem("theme", prev === "light" ? "dark" : "light");
      return String(localStorage.getItem("theme"));
    });
  };
  return (
    <Container>
      <Header>
        <BackBtn disabled={location.pathname === "/"}>
          <Link to="/">
            <BsBackspaceFill style={{ fontSize: 20 }} />
          </Link>
        </BackBtn>
        <Title>{title}</Title>
        <ThemeModeBtn onClick={toggleTheme}>
          {dark === "dark" ? (
            <BsFillSunFill style={{ fontSize: 20 }} />
          ) : (
            <BsFillMoonFill style={{ fontSize: 20 }} />
          )}
        </ThemeModeBtn>
        <HelmetProvider>
          <Helmet>
            <title>{title}</title>
          </Helmet>
        </HelmetProvider>
      </Header>
      {children}
    </Container>
  );
}

export default Layout;
