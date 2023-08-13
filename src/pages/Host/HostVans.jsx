import { Suspense } from "react";
import { Link, useLoaderData, defer, Await } from "react-router-dom";
import { getHostVans } from "../../api";
import { requireAuth } from "../../utils";

export async function loader({ request }) {
  await requireAuth(request);
  return defer({ vans: getHostVans() });
}

export default function HostVans() {
  const vansPromise = useLoaderData();

  function displayHostVans(vans) {
    const render = vans.map((van) => {
      return (
        <Link key={van.id} className="host-van-link-wrapper" to={van.id}>
          <div className="host-van-single">
            <img src={van.imageUrl} />
            <div className="host-van-info">
              <h3>{van.name}</h3>
              <p>${van.price}/day</p>
            </div>
          </div>
        </Link>
      );
    });
    return (
      <div className="host-vans-list">
        <section>{render}</section>
      </div>
    );
  }

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <Suspense fallback={<h1 className="loading">Loading...</h1>}>
        <Await resolve={vansPromise.vans}>{displayHostVans}</Await>
      </Suspense>
    </section>
  );
}
