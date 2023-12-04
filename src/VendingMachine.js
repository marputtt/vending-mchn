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
      { name: 'Coke', price: 2000, image: coke },
      { name: 'Sprite', price: 1500, image: sprite },
      { name: 'Teh Pucuk', price: 1200, image: teh },
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
        if (amountPaid < selectedDrink.price) {
            alert('Payment not accepted. Please enter a higher amount.');
        }
        else {
            const change = calculateChange();
            if (change >= 0) {
                const changeAsCoins = changeToCoins(change);
                const changeMessage = change === 0 ? 'No Change' : `Here is your change: ${changeAsCoins}`;
                alert(changeMessage);
            }
           
        }
    };
    const changeToCoins = (change) => {
        let coinChange = [
            { name: 'Rp.100.000', value: 100000 },
            { name: 'Rp.50.000', value: 50000 },
            { name: 'Rp.20.000', value: 20000 },
            { name: 'Rp.10.000', value: 10000 },
            { name: 'Rp.5000', value: 5000 },
            { name: 'Rp.2000', value: 2000 },
            { name: 'Rp.1000', value: 1000 },
            { name: 'Koin 500', value: 500 },
            { name: 'koin 200', value: 200 },
            { name: 'koin 100', value: 100 },
  
        ];
        let result = [];
        coinChange.forEach((coin) => {
            let coinCount = Math.floor(change / coin.value);
            if (coinCount > 0) {
                result.push(`${coinCount} ${coin.name}${coinCount > 1 ? '' : ''}`);
                change -= coinCount * coin.value;
            }
        });

        return result.join(', ');
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
                 <h3 className="text-lg font-medium mb-4">Price: Rp.{selectedDrink.price}</h3>
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