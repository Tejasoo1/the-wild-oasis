import styled, { css } from "styled-components";
/* eslint-disable no-constant-condition */

/*
1] `` ---> This here, infact is a template literal, which means that we can actually write JS 
           expression in there..
 
           So, for ex. we could conditionally define this font-size here. 

2] But what we can also do, is to write some CSS in some external variable.           

3] Now, we need to pass a prop to this Heading component & so then we can use that prop here
   to conditionally set some styles. 

*/

/* 
 1] So, if we write big blocks of CSS this way, so basically in an external variable, then we don't get the syntax highlighting 
    that we are used to.
  
 2] So, 1 way of fixing that, is to use the CSS function. 
    So, we can import css from styled-components library & so then we again get this syntax highlighting.

    css function ---> just to get our syntax highlighting back to work.

*/

// const test = css`
//   text-align: center;
//   ${10 > 5 && "background-color: yellow;"}
// `;

/* ${test} */

/*
1] here, we can get access to the props by using a callback function.

2] So, this callback function receives the prop & from there we can read props.type 

3] But now there is a big problem, inspect these elements using Dev tools:-
   
   <h1 type="h1" class="sc-gsFSjX knCYFt">The Wild Oasis</h1>

   <h1 type="h2" class="sc-imWZod iDhXEN">Check in and out</h1>

   <h1 type="h3" class="sc-dhKdPU fJYwJu">Form</h1>


   All of these 3 are 'h1' elements only, so 2nd one should be 'h2' element & 3rd one should be 'h3' element.
   And so this in really not good, for SEO & for accessibility issues.
   
4] If we want an 'h2', then we should really have an 'h2' element.   
    
5] But there is a solution for this issue:-

?   So, we can pass a special prop to our components to tell them, which html element they should render. 
&   And that special prop is called the 'as' prop.

6] So, basically whatever i pass into this styled component, with the 'as' prop, will be the element, that will then be rendered
   in the html.
   
   
*/

const Heading = styled.h1`
  //Here, we can get access to the props by using a callback function like this.
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `} /* ***************************** */

    ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `} 
    
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1.5rem;
      font-weight: 500;
    `} 

    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `} 

    /* 
    ${(props) =>
    props.type === "h3" &&
    css`
      font-size: 1.5rem;
      font-weight: 500;
    `}  
    */


     line-height: 1.4;
  /* font-size: ${10 > 5 ? "30px" : "10px"}; */
  /* background-color: yellow; */
`;

export default Heading;
