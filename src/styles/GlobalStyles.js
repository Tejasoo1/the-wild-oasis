import { createGlobalStyle } from "styled-components";

/*

 1] So, instead of using the 'styled' function, we now use this 'createGlobalStyle' function. 

*/
const GlobalStyles = createGlobalStyle`
   /* Lot of CSS variables defined in the root */
   :root {
  /* Indigo */
   /*
    1] So, the idea of these, is to have all the different design tokens in one central place.
    2] So, that then we can use them in all our different styled components that we are gonna build.
    3] Now, instead of using all of these CSS variables that we have right here, the styled-components library actually 
       also gives us its own way of providing variables like this to our entire application by using a mechanism 
       that it calls themes.
    
    4] So, basically with styled components 'themes', we can also inject design tokens like these(below) into our application. 
    5] However, this mechanism was designed before CSS variables were really popular & really usable in modern CSS.


   */
  
  /*
    We also want to apply these light-mode variables, if there is no class at all. So basically making this 
    the default.

    &, --> So then this is basically just regular CSS 
  
  */
  &, &.light-mode{
    //Light Mode
    /* Grey */
    --color-grey-0: #fff;
    --color-grey-50: #f9fafb;
    --color-grey-100: #f3f4f6;
    --color-grey-200: #e5e7eb;
    --color-grey-300: #d1d5db;
    --color-grey-400: #9ca3af;
    --color-grey-500: #6b7280;
    --color-grey-600: #4b5563;
    --color-grey-700: #374151;
    --color-grey-800: #1f2937;
    --color-grey-900: #111827;

    --color-blue-100: #e0f2fe;
    --color-blue-700: #0369a1;
    --color-green-100: #dcfce7;
    --color-green-700: #15803d;
    --color-yellow-100: #fef9c3;
    --color-yellow-700: #a16207;
    --color-silver-100: #e5e7eb;
    --color-silver-700: #374151;
    --color-indigo-100: #e0e7ff;
    --color-indigo-700: #4338ca;

    --color-red-100: #fee2e2;
    --color-red-700: #b91c1c;
    --color-red-800: #991b1b;

    --backdrop-color: rgba(255, 255, 255, 0.1);

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
    --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

    /* For light mode */
    --image-grayscale: 0;
    --image-opacity: 100%;
}

   /* & ---> basically means the current selector (i.e. :root (html elem.)) */
   &.dark-mode {
    //Dark Mode (CSS Variables)
    --color-grey-0: #18212f;
    --color-grey-50: #111827;
    --color-grey-100: #1f2937;
    --color-grey-200: #374151;
    --color-grey-300: #4b5563;
    --color-grey-400: #6b7280;
    --color-grey-500: #9ca3af;
    --color-grey-600: #d1d5db;
    --color-grey-700: #e5e7eb;
    --color-grey-800: #f3f4f6;
    --color-grey-900: #f9fafb;
     
    --color-blue-100: #075985;
    --color-blue-700: #e0f2fe;
    --color-green-100: #166534;
    --color-green-700: #dcfce7;
    --color-yellow-100: #854d0e;
    --color-yellow-700: #fef9c3;
    --color-silver-100: #374151;
    --color-silver-700: #f3f4f6;
    --color-indigo-100: #3730a3;
    --color-indigo-700: #e0e7ff;

     --color-red-100: #fee2e2;
     --color-red-700: #b91c1c;
     --color-red-800: #991b1b;

     --backdrop-color: rgba(0, 0, 0, 0.3);

     --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
     --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
     --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

     --image-grayscale: 10%;
     --image-opacity: 90%;

     /* For dark mode */
     --image-grayscale: 10%;
     --image-opacity: 90%;

   }

   /* And so these styles here, they stay the same for both the modes */
  --color-brand-50: #eef2ff;
  --color-brand-100: #e0e7ff;
  --color-brand-200: #c7d2fe;
  --color-brand-500: #6366f1;
  --color-brand-600: #4f46e5;
  --color-brand-700: #4338ca;
  --color-brand-800: #3730a3;
  --color-brand-900: #312e81;

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;

}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Poppins", sans-serif;
  color: var(--color-grey-700);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}


/*
1] Now what we want to do in order to implement dark mode is to set different CSS variables
   for different class names on the HTML element.
   
   See video: 2:58 to

2] So, right here in our html elements we will have one class for light mode & one class for dark mode
3] And so then according to that class these different CSS variables will apply.
4] Notice how the CSS variables are defined at the root, which is actually exactly, this element: 
     <html lang="eng"></html>

5] But now we want these one's (CSS varaibles), here (see above), to apply only when there is a light 
   mode class & the below ones to apply when there is a dark mode class.     

6] The CSS varaibles reperesenting the blue colors will remain same for both the modes.
7] And since we are defining all of the colors here,  all over the application based on these CSS
   variables, then all we have to do to implement our dark mode is to switvh these CSS varaibles.

   And we switch them by simply changing the class here.

8] Now, we want a way of changing this class(light-mode or dark-mode), right here, in our application.   


*/

/*
FOR DARK MODE

--color-grey-0: #18212f;
--color-grey-50: #111827;
--color-grey-100: #1f2937;
--color-grey-200: #374151;
--color-grey-300: #4b5563;
--color-grey-400: #6b7280;
--color-grey-500: #9ca3af;
--color-grey-600: #d1d5db;
--color-grey-700: #e5e7eb;
--color-grey-800: #f3f4f6;
--color-grey-900: #f9fafb;

--color-blue-100: #075985;
--color-blue-700: #e0f2fe;
--color-green-100: #166534;
--color-green-700: #dcfce7;
--color-yellow-100: #854d0e;
--color-yellow-700: #fef9c3;
--color-silver-100: #374151;
--color-silver-700: #f3f4f6;
--color-indigo-100: #3730a3;
--color-indigo-700: #e0e7ff;

--color-red-100: #fee2e2;
--color-red-700: #b91c1c;
--color-red-800: #991b1b;

--backdrop-color: rgba(0, 0, 0, 0.3);

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

--image-grayscale: 10%;
--image-opacity: 90%;
*/
 

`;

export default GlobalStyles;
