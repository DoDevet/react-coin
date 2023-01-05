import { BsCaretUpFill, BsCaretDownFill } from "react-icons/bs";
import styled from "styled-components";

const colors = ["#eb4d4b", "#6ab04c"];
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  position: relative;
  color: ${(props) => props.color};
`;
const IconBox = styled.div`
  position: absolute;
  left: -15px;
`;

function PercentNum({ num }: any) {
  let colorSet = num < 0 ? 0 : 1;
  return (
    <Container>
      <Row color={colors[colorSet]}>
        <span>{num}%</span>
        <IconBox>
          {colorSet === 1 ? <BsCaretUpFill /> : <BsCaretDownFill />}
        </IconBox>
      </Row>
    </Container>
  );
}

export default PercentNum;
