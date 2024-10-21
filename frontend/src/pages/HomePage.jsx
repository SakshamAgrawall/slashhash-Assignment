import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("pincode"); // pincode or city
  const [pinCode, setPinCode] = useState({ Search: [] });


  const fetchData = async () => {
    try {
      let url = "";
      if (searchType === "pincode") {
        url = `https://api.postalpincode.in/pincode/${searchTerm}`;
      } else if (searchType === "city") {
        url = `https://api.postalpincode.in/postoffice/${searchTerm}`;
      }

      const { data } = await axios.get(url);
      console.log(data[0].PostOffice);
      setPinCode(data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFav = async (data) => {
    try {
      await axios.post("http://localhost:8080/api/v1/favourite/post", data);
      toast.success("Added to favorites");
    } catch (error) {
      toast.error("Error adding favorite:", error);
    }
  };

  return (
    <div>
      <form
        className="d-flex justify-content-center m-3"
        role="search"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Radio buttons for search type */}
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            id="searchPincode"
            value="pincode"
            checked={searchType === "pincode"}
            onChange={() => setSearchType("pincode")}
          />
          <label className="form-check-label" htmlFor="searchPincode">
            Pin Code
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            id="searchCity"
            value="city"
            checked={searchType === "city"}
            onChange={() => setSearchType("city")}
          />
          <label className="form-check-label" htmlFor="searchCity">
            City Name
          </label>
        </div>

        <input
          className="form-control w-25 mr-sm-1 mx-2"
          type="search"
          placeholder={`Enter ${searchType === "pincode" ? "Pin Code" : "City Name"}`}
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-outline-success" onClick={fetchData}>
          Search
        </button>
        <Link className="btn btn-outline-success" to={"/favourite"}>
          Favourites
        </Link>
      </form>

      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <div className="d-flex flex-wrap mt-4">
            {pinCode?.PostOffice?.length ? (
              pinCode.PostOffice.map((data, index) => (
                <div className="card m-2" style={{ width: "18rem" }} key={index}>
                  <div className="card-body">
                    <h5 className="card-title">{data.BranchType}</h5>
                    <p className="card-title">Circle: {data.Circle}</p>
                    <p className="card-text">{data.DeliveryStatus}</p>
                    <p className="card-text">{data.District}</p>
                    <p className="card-text">{data.Name}</p>
                    <p className="card-text">{data.Pincode}</p>
                    <p className="card-text">{data.State}</p>
                    <button
                      className="btn btn-outline-success"
                      onClick={() => handleFav(data)}
                    >
                      Add to Favourite
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
