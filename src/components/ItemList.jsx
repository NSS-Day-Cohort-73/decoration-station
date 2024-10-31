export const ItemList = ({ filteredItems }) => {
  return (
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
  );
};
