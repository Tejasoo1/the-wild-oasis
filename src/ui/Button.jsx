import styled, { css } from "styled-components";

/*
1] So, there are basically 9 combinations of buttons that we can create. 

2] Based on the props that this component would receive, we select whatever styles we want from
   these two objects.


*/

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

//button element
const Button = styled.button`
  /* font-size: 1.4rem; */
  display: inline-block;
  /* padding: 1.2rem 1.6rem; */
  /* font-weight: 500; */
  border: none;
  /* border-radius: 7px; */
  border-radius: var(--border-radius-sm);
  /* So, let's change all of these design tokens, basically, to their actual CSS variables */
  /* background-color: purple; */
  /* Here, we are getting that color CSS vaiable right from our global styles */
  /* background-color: var(--color-brand-600); */
  /* color: white; */
  /* color: var(--color-brand-50); */
  /* cursor: pointer; */
  box-shadow: var(--shadow-sm);
  /* margin: 20px; */

  /* implementing the hover state
    1] & --> will basically select the button element itself.
    2] And then on that we can basically use the hover pseudo class.
  */

  /* &:hover {
    background-color: var(--color-brand-700);
  } */

  ${(props) => sizes[props.size]}
  //From this variations object, we simply take the property that has whatever name we are inputting here.
  ${(props) => variations[props.variation]} //here
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;
