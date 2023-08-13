import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans, { loader as vansLoader } from "./pages/Vans/Vans";
import VanDetail, { loader as vanDetailLoader } from "./pages/Vans/VanDetail";
import Layout from "./components/Layout";
import HostLayout from "./components/HostLayout";
import Dashboard, { loader as dashboardLoader } from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import HostVans, { loader as hostVansLoader } from "./pages/Host/HostVans";
import HostVanDetailLayout, {
  loader as hostVanDetailLoader,
} from "./components/HostVanDetailLayout";
import HostVanInfo from "./pages/Host/HostVanInfo";
import HostVanPricing from "./pages/Host/HostVanPricing";
import HostVanPhotos from "./pages/Host/HostVanPhotos";
import NotFound from "./pages/NotFound";
import Error from "./components/Error";
import Login, {
  loader as loginLoader,
  action as loaderAction,
} from "./pages/Login";
import { requireAuth } from "./utils";
import { LoginProvider } from "./Context";

import "./server";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />}></Route>
      <Route path="about" element={<About />}></Route>
      <Route
        path="login"
        element={<Login />}
        loader={loginLoader}
        action={loaderAction}
      ></Route>
      <Route
        errorElement={<Error />}
        path="vans"
        element={<Vans />}
        loader={vansLoader}
      ></Route>
      <Route
        errorElement={<Error />}
        path="vans/:id"
        element={<VanDetail />}
        loader={vanDetailLoader}
      ></Route>
      <Route path="host" element={<HostLayout />}>
        <Route index element={<Dashboard />} loader={dashboardLoader}></Route>
        <Route
          path="income"
          element={<Income />}
          loader={async ({ request }) => await requireAuth(request)}
        ></Route>
        <Route
          errorElement={<Error />}
          path="vans"
          element={<HostVans />}
          loader={hostVansLoader}
        ></Route>
        <Route
          errorElement={<Error />}
          path="vans/:id"
          element={<HostVanDetailLayout />}
          loader={hostVanDetailLoader}
        >
          <Route
            index
            element={<HostVanInfo />}
            loader={async ({ request }) => await requireAuth(request)}
          ></Route>
          <Route
            path="pricing"
            element={<HostVanPricing />}
            loader={async ({ request }) => await requireAuth(request)}
          ></Route>
          <Route
            path="photos"
            element={<HostVanPhotos />}
            loader={async ({ request }) => await requireAuth(request)}
          ></Route>
        </Route>
        <Route
          path="reviews"
          element={<Reviews />}
          loader={async ({ request }) => await requireAuth(request)}
        ></Route>
      </Route>
      <Route path="*" element={<NotFound />}></Route>
    </Route>
  )
);

function App() {
  return (
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
  );
}

export default App;
