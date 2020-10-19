import React, { useEffect } from 'react';
import './App.css';
import { Button, Paper } from '@material-ui/core';
import { Products } from './features/products/Products';
import { Cart } from './features/cart/Cart';

import axios from 'axios';

const getMockData = async () => {
  try {
    const { data } = await axios.get('./mock-data.json');
    console.log(data);
  } catch (err) {
    console.error(err)
  }
}

/* Features
- Keep state of cart 
- Item Quantity
- Drag and drop onto cart 
- Fetching products screen
*/

function App() {
  useEffect(() => {
    getMockData()
  }, []);

  return (
    <div className="App">

      <Products />
      <Cart />
    </div>
  );
}

export default App;
