import { useEffect, useState } from "react";
import "./DecorationStation.css";
import { getItems } from "../services/itemServices.js";
import { getSeasons } from "../services/seasonServices.js";

function DecorationStation() {
  const [items, setItems] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [seasonChoice, setSeasonChoice] = useState(0);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    // Explicit way
    // getItems().then(items => {
    //   setItems(items)
    // })
    // Implicit way
    getItems().then(setItems);
    getSeasons().then(setSeasons);
  }, []);

  useEffect(() => {
    if (seasonChoice === 0) {
      setFilteredItems(items);
    } else {
      const seasonFilter = items.filter(
        (item) => item.seasonId === seasonChoice
      );
      setFilteredItems(seasonFilter);
    }
  }, [items, seasonChoice]);

  return (
    <>
      <div id="filter-bar">
        <select
          className="filter-box"
          id="season-select"
          value={seasonChoice}
          onChange={(event) => setSeasonChoice(parseInt(event.target.value))}
        >
          <option key="0" value="0">
            All Seasons
          </option>
          {seasons.map((season) => {
            return (
              <option key={season.id} value={season.id}>
                {season.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="item-container">
        {filteredItems.length === 0 ? (
          <div className="item-name">There are no items for this season!</div>
        ) : (
          filteredItems.map((item) => {
            return (
              <div key={item.id} className="item-card">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="item-img"
                ></img>
                <div className="item-name">{item.name}</div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default DecorationStation;
