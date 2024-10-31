export const getItems = () => {
  return fetch("http://localhost:8088/items").then((res) => res.json());
};

export const createItem = (itemObj) => {
  console.log(itemObj);
  return fetch("http://localhost:8088/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemObj),
  });
};
