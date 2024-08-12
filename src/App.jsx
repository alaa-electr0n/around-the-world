import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import CountryDetails from "./components/CountryDetails-byName";
import AppLayout from "./components/AppLayout";
import Error from "./components/Error";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <Home />,
      },

      {
        // path: "/country/:code",
        path: "/:countryName",
        element: <CountryDetails />,
        errorElement: (
          <Error message="Error happened while getting the country you've choosed, Pleaese Go Back to Home page!" />
        ),
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
