import {
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

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

// 1. Creating a new context object.
const ModalContext = createContext();

// 2. Creating a parent component
function Modal({ children }) {
  console.log("Modal");

  //Here, we will keep track of which is the currently open window.
  const [openName, setOpenName] = useState("");

  //Handler functions
  // Memoize the handler to ensure it remains stable across renders
  const close = useCallback(() => setOpenName(""), []);
  const open = setOpenName; //will set openName, to whatever has been passed into open func. as an argument.

  //Using the Context Provider, to provide value object(data) to all our child components
  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {/*
        3. creating the child components, that will help implementing the common task of this overall
             compound component.
        4. And therefore, they then get access to these 3 values (openName, close, open).    
     */}
      {children}
    </ModalContext.Provider>
  );
}

//3. Creating the child components (How we can use, these different child components to together achieve a common goal(in this case displaying a Modal window))
function Open({ children, opens: opensWindowName }) {
  console.log("Open");
  /* 
   1] Now, we need a way of adding that 'open' event handler function to this Button (So, to the children prop of Open func. component)
   2] So, basically adding this function (open) here, to the children.
   3] And the way, we can do this is by using a pretty advanced React function called cloneElement. 
  */
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  console.log("Window");
  /*
      And so now, on the window we basically need to check which is the currently open window &
      if it's the same as this name, then we want to render its content. 
  */
  const { openName, close } = useContext(ModalContext);

  //Handling the click event (outside of the Modal Window) to close it.
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  // If the name is = to currently open window, then we return below JSX.
  return createPortal(
    /*
     1] So, instead of just returning this JSX here, we return the result of calling createPortal.
     2] createPortal is not part of React, but of React DOM, because this really is about placing some JSX 
        in the DOM.
    */

    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,

    document.body
  );
}

//4. We add the child components as properties to the parent component (optional step)
// (We can add properties to functions as well in JS)
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
