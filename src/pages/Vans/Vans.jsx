import { Suspense } from "react";
import {
  Link,
  useSearchParams,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { getVans } from "../../api";

export function loader() {
  return defer({ vans: getVans() });
}

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  const dataPromise = useLoaderData();

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  function renderVanElements(vans) {
    const filteredVan = typeFilter
      ? vans.filter((van) => van.type === typeFilter)
      : vans;

    const renderVans = filteredVan.map((van) => {
      return (
        <div className="vans-container" key={van.id}>
          <Link
            to={van.id}
            state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
          >
            <img src={van.imageUrl} />
            <div className="van-info">
              <h3>{van.name}</h3>
              <p>
                ${van.price}
                <span>/day</span>
              </p>
            </div>
            <i className={`van-type ${van.type} selected`}>{van.type}</i>
          </Link>
        </div>
      );
    });

    return (
      <>
        <button
          onClick={() => handleFilterChange("type", "simple")}
          className={`van-type simple ${
            typeFilter === "simple" ? "selected" : ""
          }`}
        >
          Simple
        </button>
        <button
          onClick={() => handleFilterChange("type", "luxury")}
          className={`van-type luxury ${
            typeFilter === "luxury" ? "selected" : ""
          }`}
        >
          Luxury
        </button>
        <button
          onClick={() => handleFilterChange("type", "rugged")}
          className={`van-type rugged ${
            typeFilter === "rugged" ? "selected" : ""
          }`}
        >
          Rugged
        </button>

        {typeFilter ? (
          <button
            onClick={() => handleFilterChange("type", null)}
            className="van-type clear-filters"
          >
            Clear filter
          </button>
        ) : null}
        <div className="vans">{renderVans}</div>
      </>
    );
  }

  return (
    <div className="vans-page-container">
      <h1>Explore our van options</h1>
      <Suspense fallback={<h1>Loading vans...</h1>}>
        <Await resolve={dataPromise.vans}>{renderVanElements}</Await>
      </Suspense>
    </div>
  );
}
