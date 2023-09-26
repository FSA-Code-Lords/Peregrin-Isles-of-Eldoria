import { useState } from "react";

const Inventory = ({ gameData }) => {
  const [showInventory, setShowInventory] = useState(false);

  return (
    <section id="inventorySection">
      <h2 onClick={() => setShowInventory(!showInventory)}>Inventory</h2>
      {showInventory ? <section>
        {gameData.inventory.map((item) => 
          <section>
            <p><b>{item.name}</b></p>
            <p>{item.description}</p>
            <hr></hr>
          </section>
        )}
      </section> : null}
    </section>
  );
};

export default Inventory;
