import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";
import GlobalStyles from "./styles/GlobalStyles.js";
// import "./index.css";

/*
1] So, basically each of these folders in features folder, will co-locate all the files that are necessary, 
   to implement that feature.

2] Hooks folder ---> For re-usable custom Hooks (so, custom Hooks that we need in multiple features)

3] Pages folder ---> In this, we will have one component file per Route.
                     (Each of these pages (component) will not have any side effects)
                     
4] services folder ---> which contains some code, for interacting with API's

5] syles folder ---> For CSS

6] UI folder ---> All the components that are not belonging to one of the features.
                  OR components which we might re-use in different features.


*/

/*
 1] And so here we can specify a prop called 'FallbackComponent'  
 2] Now inside the 'ErrorFallback' we get access to this 'onReset' prop as 'resetErrorBoundary'.
 3] Now these error boundaries really only catch errors while React is rendering.
 4] So, bugs that occur in some event handlers or in an effect or in some asynchronous code will not be caught by
    error boundaries

*/

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <>
    <GlobalStyles />
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      {/* Redirect the user back to the index/Home page.*/}
      <App />
    </ErrorBoundary>
  </>
  // </React.StrictMode>,
);
