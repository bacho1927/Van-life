import { Suspense } from "react";
import {
  NavLink,
  Link,
  Outlet,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { getHostVans } from "../api";
import { requireAuth } from "../utils";

export async function loader({ request, params }) {
  await requireAuth(request);
  return defer({ van: getHostVans(params.id) });
}

export default function HostCurrentVanDetail() {
  const currentVanPromise = useLoaderData();
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <section>
      <Suspense fallback={<h1 className="loading">Loading...</h1>}>
        <Await resolve={currentVanPromise.van}>
          {(currentVan) => {
            return (
              <>
                <Link to="/host/vans" relative="path" className="back-button">
                  &larr; <span>Back to all vans</span>
                </Link>
                <div className="host-van-detail-layout-container">
                  <div className="host-van-detail">
                    <img src={currentVan.imageUrl} />
                    <div className="host-van-detail-info-text">
                      <i className={`van-type selected ${currentVan.type}`}>
                        {currentVan.type}
                      </i>
                      <h3>{currentVan.name}</h3>
                      <h4>${currentVan.price}/day</h4>
                    </div>
                  </div>
                  <nav className="host-van-detail-nav">
                    <NavLink
                      style={({ isActive }) => (isActive ? activeStyles : null)}
                      to="."
                      end
                    >
                      Details
                    </NavLink>
                    <NavLink
                      style={({ isActive }) => (isActive ? activeStyles : null)}
                      to="pricing"
                    >
                      Pricing
                    </NavLink>
                    <NavLink
                      style={({ isActive }) => (isActive ? activeStyles : null)}
                      to="photos"
                    >
                      Photos
                    </NavLink>
                  </nav>
                  <Outlet context={currentVan} />
                </div>
              </>
            );
          }}
        </Await>
      </Suspense>
    </section>
  );
}
