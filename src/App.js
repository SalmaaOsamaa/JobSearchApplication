import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";

function App() {
  
  return (
    <div className="App">
<RouterProvider router={router}/>
    </div>
  );
}
// export const Root = () => {
//   return <>
//   <div>
//   <BlankLayout/>
//   </div>
//   <div>
//     <Outlet/>
//   </div>
//   </>
// }
 export default App;
