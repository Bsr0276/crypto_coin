import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/index";
import Home from "./pages/home/index";
import Detail from "./pages/detail/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/coin/:id", element: <Detail /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
