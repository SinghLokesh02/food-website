import React from "react";
import "./style.css";
import Navbar from "./Components/Navbar";
import Card from "./Components/Card";
import { useState, useEffect } from "react";

// Swiggy card component
const App = () => {
  const [resData, setResData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  let fetchData = async () => {
    let data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=27.6093912&lng=75.1397935&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    let json = await data.json();
    setResData(
      json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );
  };

  // Filter data
  function filterData() {
    let filteredList = resData.filter((element) => element.info.avgRating >= 4);
    setResData(filteredList);
  }

  // Sort Data
  function SortData(e){
    let copyOfRestaurant = [...resData];
    if(e.target.value === "sortByRating"){
      copyOfRestaurant.sort((a,b) =>  a.info.avgRating - b.info.avgRating)
      setResData(copyOfRestaurant)
    }
    if(e.target.value === "sortByFoodName"){
      copyOfRestaurant.sort((a,b)=> {
        if(a.info.name > b.info.name)return 1;
        return -1;
      })
      setResData(copyOfRestaurant)
    }
    if(e.target.value === "sortByNearest"){
      copyOfRestaurant.sort((a,b)=>{
        let A = a.info.sla.slaString.slice(0,2);
        let B = b.info.sla.slaString.slice(0,2);
        return A - B;
      })
      setResData(copyOfRestaurant)
    }
     
  }
  return (
    <div>
      <Navbar />

      <div className="filter-search">
        <button className="top-restaurants" onClick={filterData}>
          Top Rated Restaurant
        </button>

        <select name="" id="" onChange={SortData}>
          <option disabled="disabled">Select</option>
          <option value="sortByRating">Sort by Rating</option>
          <option value="sortByNearest">Sort by Nearest</option>
          <option value="sortByFoodName">Sort by Food Name</option>
        </select>

        <input type="text" placeholder="Search Restaurants" onInput={(e)=>{
          if(e.target.value === ""){
            setResData(resData);
            return;
          }
          let searchData = resData.filter((element) => element.info.name.toLowerCase().includes(e.target.value.toLowerCase()))
          setResData(searchData);
        }} />
      </div>

      <div className="card-container">
        {resData.map((res) => {
          return <Card resData={res} key={res.info.id} />;
        })}
      </div>
    </div>
  );
};

export default App;
