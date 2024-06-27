import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

/*
~ Setting up the vite:-

  1] npm i --> install all the npm packages 

  2] Use the snippet rfc.

  3] npm install vite-plugin-eslint --save-dev

  4] Add these two lines of code in rules: {...} of .eslintrc.cjs file, to show yellow underline instead of red:
     'no-unused-vars': 'warn',
     'react/prop-types': 'off',

---------------------------------------------------------------------------------------------------------------------
~ Introduction to Sytled Components:-

1] So, Styled Components essentially allow us to write CSS right inside our javascript component
   files.
   
2] And the way it works, is that, we take a regular HTML element & then using the styled function,
   we create a brand new React component, with some CSS styles applied to it.
   
3] And then we can use & re-use that new component instead of using the regular HTML element.

4] Library to install: npm i styled-components

   `` --->  is basically a string in which we are going to write our styles. 
   it uses, ES6 feature called Tagged Template literals.


5]  styled.h1` -------------------> So, this will now actually return a new component
     font-size: 30px;      | This CSS will only be available for this (H1) exact component, 
     font-weight: 600;     | which we can then use all over the place in our application. 
   `;

H1 = { --------------------------------------------> React element
        "attrs": [],
        "componentStyle": {
        "rules": [
            "\n  font-size: 30px;\n  font-weight: 600;\n"
        ],
        "staticRulesId": "",
        "isStatic": false,
        "componentId": "sc-aYaIB",
        "baseHash": -874878355
         },
        "foldedComponentIds": "",
        "styledComponentId": "sc-aYaIB",
        "target": "h1"
     }

6] Since H1 variable will be a React component, it needs to start with an upper case.  

7] So, behind the scenes what the styled component library did was to create this randomly 
   named class & then assigned it to our h1 element. 

?   <h1 class="sc-dAlxHm ivaTtT">The Wild Oasis</h1>

    .ivaTtT {
~     All the styles that we have specified in baktics will appear here in this class selector.
      font-size: 30px;
      font-weight: 600; 
    }
  
8] So, this CSS that we wrote, is ofcourse only scoped to this exact component, which eliminates all the
   problems of global CSS such as name collisions, conflicting declarations.       

  V.V.V.IMP
? 9] These styled components actually are able to receive all the same props that the regular JSX/HTML 
?    elements can receive. (like onCLick())
   
  10] Before, if were to create our own Button component, then we would have to manually accept the onClick
      prop in there & then pass it to the regular HTML element.  
 
  11] We can reuse the Styled components anywhere in the application.    

  12] So, we can use styled components concept, in order to basically build these small reusable components.

 ---------------------------------------------------------------------------------------------------------------------------------------
~ Global Styles with Styled Components:-
 1] We basically create a brand new styled component, which will then become our global styled 
    component. 

 2] The GlobalStyles component that we just exported needs to be added to the component tree, but it can not accept
    any children.
    
 3] So, basically we want this to be a sibling of this StyledApp component.   

 4] All of these are what we call design tokens. So, they might change
    For ex:- When we change to a dark mode.

 5] Now, we actually want to export all of these components (below) into their own seperate files, in order to reuse these
    components throughout the entire application.   

 ------------------------------------------------------------------------------------------------------------------------
~ We will build a reusable 'Heading' component by learning about some more advanced styled-component topics:-   
  (such as accepting props & the CSS function) 
 
1] But instead of the (Heading)component just working for/as an the h1 element, we also want it to work as an h2 element,
   & as an h3 element 

2] See rest of the notes in Heading component.
--------------------------------------------------------------------------------------------------------------------------
~ Let's build a reusable row component: 

1] See video: from 0:00 to 2:00.
2] See notes in row.jsx component.

-------------------------------------------------------------------------------------------------------------------



*/

//Let's say we want to syle an h1 element
// const H1 = styled.h1`
//   font-size: 30px;
//   font-weight: 600;
//   background-color: yellow;
// `;

// console.log(H1);

//Creating yet another styled component only for this 'div'
const StyledApp = styled.div`
  /* background-color: orangered; */
  padding: 20px;
`;

function App() {
  return (
    // <div>
    //   <H1>The Wild Oasis</H1>
    //   <Button onClick={() => alert("Check in")}>Check In</Button>
    //   <Button onClick={() => alert("Check Out")}>Check Out</Button>
    //   <Input type="number" placeholder="Number of guests"></Input>
    // </div>
    <>
      {/* 
         Applying global styles
         And this GlobalStyles component doesn't accept any children. So, its a self closing component.
         And then it needs to be a sibling of all the other components.  
       */}
      <GlobalStyles />
      <StyledApp>
        {/* Simple reusable components --> which we can think of primitives of our interface */}
        {/* Now, we want these 3 heading here, to look different & so that's why we passed 'type' prop in Heading components */}
        {/* <Heading type="h1">The Wild Oasis</Heading> */}
        <Row>
          <Row type="horizontal">
            <Heading as="h1">The Wild Oasis</Heading>
            {/* <Heading type="h2">Check in and out</Heading> */}
            <div>
              <Heading as="h2">Check in and out</Heading>
              <Button
                // variation="primary"
                // size="medium"
                onClick={() => alert("Check in")}
              >
                Check In
              </Button>
              <Button
                variation="secondary"
                size="small"
                onClick={() => alert("Check Out")}
              >
                Check Out
              </Button>
            </div>
          </Row>
          {/* <Heading type="h3">Form</Heading> */}
          <Row>
            <Heading as="h3">Form</Heading>
            {/* So, instead of 'type' prop use the 'as' prop */}
            <form>
              <Input type="number" placeholder="Number of guests"></Input>
              <Input type="number" placeholder="Number of guests"></Input>
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
