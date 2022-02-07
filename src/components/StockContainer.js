import React from "react";
import Stock from "./Stock";

function StockContainer({ stocks, addStock }) {
  return (
    <div>
      <h2>Stocks</h2>
      {stocks.map((stock) => (
        <Stock key={stock.id} stock={stock} handleChange={addStock} />
      ))}
    </div>
  );
}

export default StockContainer;
