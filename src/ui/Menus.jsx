import { createContext, useCallback, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

/*
1] We actually need to wrap all the rows inside those Menus.Menu component.
2] So then Menus can then keep track, which of the four Menus.Menu is actually opened at a time. 


*/

//1. Creating a new Context Object.
const MenusContext = createContext();

//2. Creating a parent component
function Menus({ children }) {
  console.log("Menus");

  //We will need to keep track, which one is the currently open ID.
  const [openId, setOpenId] = useState(""); //empty string basically means --->  none of the Menus is currently open.
  const [position, setPosition] = useState(null);

  //Setter functions
  // Memoize the handler(close func.) to ensure it remains stable across renders
  let close = useCallback(() => setOpenId(""), []);
  // const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

//3. Creating child components.
function Toggle({ id }) {
  console.log("Toggle");

  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    //Here, we will decide whether we want to open or close the Menus.List.
    /*
     
     1] openId === "" ---> meaning that there is no Id ,OR(||), if the currently opened Menu is different from the Id of 
                                                                this exact Toggle button that is being clicked.
                                                                
         Then let's open the Menu, otherwise we just close the Menu. 
         (See video:- 12:30 to 13:20)                      
         
     2] Now, this position of the list needs to be calculated as soon as this button (see video: 18:13) is clicked. 
     3] e.target ---> will give us the html elem. which triggered the "click" event.

     4] And then we want to get the closest button, so just to make sure that we really get the position
        of the button & not of the SVG icon in there. 

         e.target.closest("button"); ---> So, this basically does some DOM traversing, finding the closest "button" 
                                          parent.
                                          
     5] { ------------------> We will get this object, when we click on this Toggle Menu button
         "x": 942,
         "y": 256,
         "width": 32,
         "height": 32,
         "top": 256,
         "right": 974,
         "bottom": 288,
         "left": 942
        }

     6] And then based on x & y coordinates of this button, we can now determine where we want to render 
        the List.   

    */

    //So, what this will do is to, give us some data about the element's position.
    const rect = e.target.closest("button").getBoundingClientRect();
    console.log(rect);

    //rect.x ---> x cooerdinate of the rectangle.

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick} data-id="toggleBtn">
      <HiEllipsisVertical data-id="toggleBtn" />
    </StyledToggle>
  );
}

function List({ id, children }) {
  console.log("List");

  const { openId, position, close } = useContext(MenusContext);

  /* So, if we click outside of this Menu List, we want the Menu List to be closed. */
  const listShown = openId === id;
  const ref = useOutsideClick(close, listShown);

  if (openId !== id) return null;

  console.log("List rendered");
  console.log(openId);

  /*
   1] Then we do render this List of Buttons (So, here lets return a Portal, because this element here will also
      float on the top of UI.)
   2] And so in cases like that, it's always a good idea to use a portal.
  */
  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  console.log("Button");

  const { close } = useContext(MenusContext);

  function handleClick() {
    //We want to conditionally call onClick if it exists.
    onClick?.();
    close(); //As soon as we click on one of these buttons, the Menu List should be closed.
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
}

//4. We add the child components as properties to the parent component (optional step)
// (We can add properties to functions as well in JS)

Menus.Menu = Menu; //Menu is simply that styled component
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
