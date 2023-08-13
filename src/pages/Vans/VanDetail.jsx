import { Suspense } from "react";
import {
  Link,
  useLocation,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { getVans } from "../../api";

export function loader({ params }) {
  return defer({ vans: getVans(params.id) });
}

export default function VanDetail() {
  const location = useLocation();
  const vansPromise = useLoaderData();

  const goBack = location.state?.search || "";
  console.log(goBack);
  const type = location.state?.type || "all";

  return (
    <div className="van-detail-container">
      <Link to={`..${goBack}`} relative="path" className="back-button">
        &larr; <span>Back to {type} vans</span>
      </Link>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Await resolve={vansPromise.vans}>
          {(van) => {
            return (
              <div className="van-detail">
                <img src={van.imageUrl} />
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
                <h2>{van.name}</h2>
                <p className="van-price">
                  <span>${van.price}</span>/day
                </p>
                <p>{van.description}</p>
                <button className="link-button">Rent this van</button>
              </div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
