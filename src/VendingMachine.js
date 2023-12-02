import React, { useState } from 'react';
import Drink from './Drink';
import './App.css';
import coke from './coke.jpg'
import sprite from './sprite.jpg'
import teh from './teh-pucuk.jpg'

function VendingMachine() {
   const startMachine = () => {
      setIsStarted(true);
   };
   const [drinks] = useState([
      { name: 'Coke', price: 2, image: coke },
      { name: 'Sprite', price: 1.5, image: sprite },
      { name: 'Teh Pucuk', price: 1.2, image: teh },
  ]);
   const [isStarted, setIsStarted] = useState(false);
    const [selectedDrink, setSelectedDrink] = useState(null);
    const [amountPaid, setAmountPaid] = useState('');

    const handleDrinkPurchase = (name, price) => {
        setSelectedDrink({ name, price });
    };

    const calculateChange = () => {
        if (!selectedDrink) return 0;
        const change = amountPaid - selectedDrink.price;
        return change >= 0 ? change : 0;
    };

    const handlePayment = () => {
        const change = calculateChange();
        if (change > 0) {
            alert(`Here is your change: $${change}`);
        } else {
            alert('Payment not accepted. Please enter a higher amount.');
        }
    };

    if (!isStarted) {
      return (
         <div style={{display: "flex", justifyContent:"center", alignItems:"center", minHeight:"100vh", position: "relative"}} className="machine">
        <div  className="vend-container flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 to-blue-600">
          <button style={{fontSize:"100px", borderRadius:"50px"}} onClick={startMachine} className="bg-blue-600 text-white px-6 py-3 rounded-md">Get Started</button>
        </div> 
        </div> 
      );
   }
    return (
      <div className="vend-container flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 to-blue-600">
      <div className="vending-machine bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold mb-6">Welcome to the Vending Machine</h1>
          <div className="drinks-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {drinks.map((drink, index) => (
                 <Drink key={index} name={drink.name} price={drink.price} purchase={handleDrinkPurchase} image={drink.image} />
              ))}
          </div>
          {selectedDrink && (
              <div style={{padding:"65px"}} className="payment-container mt-6">
                 <h2 className="text-xl font-semibold mb-4">Selected Drink: {selectedDrink.name}</h2>
                 <h3 className="text-lg font-medium mb-4">Price: ${selectedDrink.price}</h3>
                 <h3 className="text-lg font-medium mb-4">ENTER YOUR MONEY</h3>
                 <input type="number" value={amountPaid} onChange={(e) => setAmountPaid(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md mb-4" />
                 <button onClick={handlePayment} className="bg-gray-900 text-white px-6 py- rounded-md">Buy</button>
              </div>
          )}
      </div>
 </div>
);
}

export default VendingMachine;