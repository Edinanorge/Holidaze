import { useState } from "react";
import { FaAngleUp, FaTimes } from "react-icons/fa";
import styled from "styled-components";
import Button from "./Button";
import { GridCols } from "./Grid";

const StyledFooter = styled.footer`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  border-top: var(--border);
  background-color: var(--color-gray-0);
  padding: 0 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & button {
    padding-right: 0;
  }


  @media only screen and (max-width: 500px) {
    padding: 0;
  }
`;

const StyledFooterSecondary = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 2rem;
  border-top: var(--border);
  background-color: var(--color-gray-0);
  border-radius: var(--border-radius);
`;

function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledFooter>
      <p>&copy; Holidaze, inc.</p>
      <div>
        <span>Support & resources</span>
        <Button onClick={() => setIsOpen(!isOpen)}>
          <FaAngleUp />
        </Button>
      </div>
      {isOpen && (
        <StyledFooterSecondary>
          <Button onClick={() => setIsOpen(!isOpen)}>
            <FaTimes />
          </Button>
          <GridCols>
            <div>
              <p>Support</p>
              <a href="#">Help Center</a>
              <a href="#">Get help whit a safty issue</a>
              <a href="#">AirCover</a>
              <a href="#">Anti-discrimination</a>
              <a href="#">Disability support</a>
              <a href="#">Cancellation options</a>
              <a href="#">Report neighborhood concern</a>
            </div>
            <div>
              <p>Hosting</p>
              <a href="#">Holidazeyour home</a>
              <a href="#">AirCover for Hosts</a>
              <a href="#">Hosting resources</a>
              <a href="#">Community forum</a>
              <a href="#">Hosting responsibly</a>
              <a href="#">Holidaze-friendly apartments</a>
            </div>

            <div>
              <p>Holidaze</p>
              <a href="#">Newsroom</a>
              <a href="#">New features</a>
              <a href="#">Careers</a>
              <a href="#">Investors</a>
              <a href="#">Gift cards</a>
            </div>
          </GridCols>
        </StyledFooterSecondary>
      )}
    </StyledFooter>
  );
}
export default Footer;
