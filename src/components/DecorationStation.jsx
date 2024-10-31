import { useEffect, useState } from "react";
import "./DecorationStation.css";
import { getItems } from "../services/itemServices.js";
import { getSeasons } from "../services/seasonServices.js";
import { NewDecorationForm } from "../forms/NewDecorationForm.jsx";
import { ItemFilterBar } from "./ItemFilterBar.jsx";
import { ItemList } from "./ItemList.jsx";

function DecorationStation() {
  const [items, setItems] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [seasonChoice, setSeasonChoice] = useState(0);
  const [filteredItems, setFilteredItems] = useState([]);
  const [userChoices, setUserChoices] = useState({
    name: "",
    imageUrl: "",
    seasonId: 0,
    categoryId: 0,
  });

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
      <ItemFilterBar
        seasons={seasons}
        seasonChoice={seasonChoice}
        setSeasonChoice={setSeasonChoice}
      />
      <NewDecorationForm
        seasons={seasons}
        userChoices={userChoices}
        setUserChoices={setUserChoices}
        setItems={setItems}
      />
      <ItemList filteredItems={filteredItems} />
    </>
  );
}

export default DecorationStation;
