import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portStocks, removeStock }) {

 
 
  return (
    <div>
      <h2>My Portfolio</h2>
      {
        portStocks.map((stock) => (
          <Stock key={stock.id} stock={stock} handleChange={removeStock} />
        ))
      }
    </div>
  );
}

export default PortfolioContainer;
