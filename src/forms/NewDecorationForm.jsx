import { useEffect, useState } from "react";
import { getCategories } from "../services/categoryServices.js";
import { createItem, getItems } from "../services/itemServices.js";

export const NewDecorationForm = ({
  seasons,
  userChoices,
  setUserChoices,
  setItems,
}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleSaveDecoration = (e) => {
    e.preventDefault();
    if (
      userChoices.name &&
      userChoices.imageUrl &&
      userChoices.seasonId &&
      userChoices.categoryId
    ) {
      createItem(userChoices).then(() => {
        getItems().then(setItems);
        setUserChoices({
          name: "",
          imageUrl: "",
          seasonId: 0,
          categoryId: 0,
        });
      });
    } else {
      alert("You missed a field!");
    }
  };

  return (
    <form className="decoration-form">
      <h2 className="decoration-form-title">Add a decoration to the catalog</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            required
            id="name"
            type="text"
            className="form-control"
            placeholder="item"
            value={userChoices.name}
            onChange={(event) => {
              const copy = { ...userChoices };
              copy.name = event.target.value;
              setUserChoices(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="imgUrl">Image URL:</label>
          <input
            required
            id="imgUrl"
            type="text"
            className="form-control"
            placeholder="https://www.example.com"
            value={userChoices.imageUrl}
            onChange={(event) => {
              const copy = { ...userChoices };
              copy.imageUrl = event.target.value;
              setUserChoices(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <div>Season:</div>
          <select
            className="filter-box"
            id="season-select"
            value={userChoices.seasonId}
            onChange={(event) => {
              const copy = { ...userChoices };
              copy.seasonId = parseInt(event.target.value);
              setUserChoices(copy);
            }}
          >
            <option key="0" value="0" disabled>
              Select a Season
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
      </fieldset>
      <fieldset>
        <div className="form-group">
          <div>Category:</div>
          {categories.map((category) => {
            return (
              <div key={category.id} className="radio">
                <label>
                  <input
                    key={category.id}
                    type="radio"
                    value={category.id}
                    checked={userChoices.categoryId === category.id}
                    onChange={(event) => {
                      const copy = { ...userChoices };
                      copy.categoryId = parseInt(event.target.value);
                      setUserChoices(copy);
                    }}
                  />
                  {category.name}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>

      <button className="btn" onClick={handleSaveDecoration}>
        Add Decoration
      </button>
    </form>
  );
};
