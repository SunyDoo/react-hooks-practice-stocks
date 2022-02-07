import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {

  const [stockList, setStockList] = useState([])
  const [portStocks, setPortStocks] = useState([])
  const [sortBy, setSortBy] = useState("")
  const [filter, setFilter] = useState("All")


  useEffect(() => {
    fetch('http://localhost:3001/stocks')
      .then((r) => r.json())
      .then((stocks) => setStockList(stocks));
  }, []);


  useEffect(()=>{
    if(sortBy === "Alphabetically"){
      const sortedStocks = sortByName()
      setStockList(sortedStocks)
    }
    else if(sortBy === "Price"){
      const sortedStocks = sortByPrice()
      setStockList(sortedStocks)
    }
  }, [ sortBy ])

  function addtoPort(stock){
    const newStockList = [...portStocks, stock]
    setPortStocks(newStockList)
  }
  
  
  function handleRemove(stock){
    const newList = portStocks.filter((item)=> item!==stock)
    setPortStocks(newList)
  }  

  const sortStocks = (e) => {
    setSortBy(e.target.value)
  }

  const sortByName = () => {
    return [...stockList].sort(function(a, b) {
      var nameA = a.name.toUpperCase(); 
      var nameB = b.name.toUpperCase(); 
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    })    
  }
  

  const sortByPrice = () => {
    return [...stockList].sort(function (a, b) {
      return a.price - b.price;
    });
  }
  
  function setFilterChange(e){
    setFilter(e.target.value)
  }

  const stockToDisplay = stockList.filter((stock) => {
    if (filter === "All") return true;

    return stock.type === filter;
  });

  return (
    <div>
      <SearchBar sortStocks={sortStocks} changeFilter={setFilterChange}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={stockToDisplay} addStock={addtoPort}/>
        </div>
        <div className="col-4">
          <PortfolioContainer portStocks={portStocks} removeStock={handleRemove} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
