import styled from "styled-components";
import Test from "../../public/Test";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  console.log("Logo");

  const { isDarkMode } = useDarkMode();

  const src = isDarkMode
    ? "../../public/logo-dark.png"
    : "../../public/logo-light.png";

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
