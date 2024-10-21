import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Favourite = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getFavourites = async () => {
    try {
      setLoading(true); // Start loading
      const { data } = await axios.get("http://localhost:8080/api/v1/favourite/get");
      setFavourites(data);
      setLoading(false); // End loading
    } catch (err) {
      setError("Failed to fetch favourite movies. Please try again.");
      setLoading(false); // End loading even if there's an error
    }
  };

  useEffect(() => {
    getFavourites();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <>
      <div>
        <Link className="btn btn-outline-success m-4" to={"/"}>
        {'<- home'}
        </Link>
      </div>

      <div className="container">
        <div className="text-center">
          <h1>Your Favourite Movies</h1>
          {error && <p className="text-danger">{error}</p>} {/* Display error message */}

          {favourites.length === 0 && !error ? (
            <p>No favourites available.</p> // Empty state when no data is returned
          ) : (
            <div className="d-flex flex-wrap mt-4">
              {favourites.map((data,index) => (
                <div className="card m-2" style={{ width: "18rem" }} key={index}>
                <div className="card-body">
                  <h5 className="card-title">{data.BranchType}</h5>
                  <p className="card-title">Circle: {data.Circle}</p>
                  <p className="card-text">{data.DeliveryStatus}</p>
                  <p className="card-text">{data.District}</p>
                  <p className="card-text">{data.Name}</p>
                  <p className="card-text">{data.Pincode}</p>
                  <p className="card-text">{data.State}</p>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Favourite;
