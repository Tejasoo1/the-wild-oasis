import { useEffect, useRef } from "react";
import eventManager from "./eventManager";
//Here, lets allow the user to specify whether they want to listen to the event in the bubbling phase or capturing phase.
export function useOutsideClick(
  handler,
  listenCapturing = true,
  listShown = false
) {
  console.log("useOutsideClick-Hook");

  const ref = useRef();
  console.log(ref.current);

  useEffect(
    function () {
      console.log("useEffect-Window", ref.current);

      function handleClick(e) {
        console.log("handleClick func. ,", ref.current);
        console.log(e.target.dataset.id);

        if (
          ref.current &&
          !ref.current.contains(e.target) &&
          e.target.dataset.id !== "toggleBtn"
        ) {
          console.log("Clicked Outside");
          handler(); //close the Modal
        }
      }

      /*
       1] In order to avoid event bubbling, to trigger this "click" event that we applied on the document.
       2] So, if we use true here, then again the event will actually be handled in the capturing phase
          (so as the event moves down the tree) & not in the bubbling phase.  
      */

      // document.addEventListener("click", handleClick, listenCapturing);
      // document.addEventListener("click", handleClick);

      //cleanup function
      // return () =>
      // document.removeEventListener("click", handleClick, listenCapturing);
      // document.addEventListener("click", handleClick);

      // Check if the event listener is already added
      if (!eventManager.hasEventListener("click")) {
        // Add event listener on document if not already added
        eventManager.addEventListener("click", handleClick, listenCapturing);
        console.log("Event listener added");
      }

      // Cleanup function to remove event listener
      return () => {
        if (eventManager.hasEventListener("click")) {
          eventManager.removeEventListener(
            "click",
            handleClick,
            listenCapturing
          );
          console.log("Event listener removed");
        }
      };
    },
    [handler, listenCapturing, listShown]
  );

  return ref;
}

/*

~ Event Propagation: Capturing vs. Bubbling
  In the Document Object Model (DOM), event propagation can happen in two phases: capturing and bubbling. 
  Understanding these phases is crucial for correctly handling events like clicks, especially when
  dealing with nested elements.

~ Bubbling Phase (Default)
  When an event occurs in the DOM, it starts at the target element and then bubbles up to the root 
  of the document. 
  
  For example, if you click on a button inside a div, the click event will first be handled by the
  button, then the div, and finally the document (if the handlers are set up).

~ Capturing Phase
  Capturing (or trickling) is the opposite of bubbling. The event starts from the root of the document 
  and trickles down to the target element. 
  If you set an event listener to capture events, it will handle the event during this phase, before
  it reaches the target element.



*/
