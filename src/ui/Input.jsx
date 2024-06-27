import styled from "styled-components";

//input element (Again this Input component can now accept, all the same props as the normal JSX/html input element)
const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  /* border-radius: 5px; */
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.2rem;
`;

export default Input;
