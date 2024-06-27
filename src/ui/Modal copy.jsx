import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

/*

   1] Now, we want to make this Modal component a bit more re-usable. 
   2] So, we will allow this Modal Window/component to receive some custom content.
   3] And so that content is a component (CreateCabinForm />)
   4] We also need a way of closing the Modal, so we need to add a button here to this component.
   
    Q. So, How can we actually close this Modal ?
   --> using onClose function.

  
 */
function Modal({ children, onClose }) {
  return createPortal(
    /*
     1] So, instead of just returning this JSX here, we return the result of calling createProtal.
     2] createPortal is not part of React, but of React DOM, because this really is about placing some JSX 
        in the DOM.
    */
    <Overlay>
      <StyledModal>
        <Button onClick={onClose}>
          <HiXMark />
        </Button>

        <div>{children}</div>
      </StyledModal>
    </Overlay>,

    document.body
  );
}

export default Modal;
