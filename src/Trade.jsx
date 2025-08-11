import { motion } from "framer-motion";
import { useState } from "react";

export default function Trade() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  return (
    <div
      onMouseMove={(e) => setCursorPosition({ x: e.clientX, y: e.clientY })}
      className="min-h-screen w-full bg-black pt-24 relative md:p-14 p-5 overflow-y-auto"
    >

      <motion.div
        className="pointer-events-none fixed rounded-full blur-2xl z-10"
        style={{
          top: cursorPosition.y - 150,
          left: cursorPosition.x - 150,
          width: 300,
          height: 300,
          background: "radial-gradient(circle, rgba(0,255,150,0.5) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.4, 0.1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      


       <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">

  <div className="bg-yellow-500 text-black font-bold text-center py-2 px-4 rounded-t-lg mb-6 animate-pulse">
    COMING SOON - DEMO TRADING SYSTEM
  </div>


  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    <div className="md:col-span-2  p-4 bg-gray-900/50 backdrop-blur-md rounded-xl  border border-gray-700 hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">BTC/USDT</h2>
        <div className="text-green-400">$42,856.23 <span className="text-sm">(+2.34%)</span></div>
      </div>
  
      <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
        
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-red-400 font-medium mb-2">Bids</h3>
          <div className="space-y-1">
            {[42.850, 42.845, 42.840, 42.835, 42.830].map((price, i) => (
              <div key={i} className="flex justify-between text-red-400">
                <span>{price.toFixed(3)}</span>
                <span>{Math.random().toFixed(4).slice(2)} BTC</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-green-400 font-medium mb-2">Asks</h3>
          <div className="space-y-1">
            {[42.860, 42.865, 42.870, 42.875, 42.880].map((price, i) => (
              <div key={i} className="flex justify-between text-green-400">
                <span>{price.toFixed(3)}</span>
                <span>{Math.random().toFixed(4).slice(2)} BTC</span>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>

    <div className="bg-gray-800 p-4 rounded-lg bg-gray-900/50 backdrop-blur-md  border border-gray-700 hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
      <div className="flex border-b border-gray-700 pb-2 mb-4">
        <button className="px-4 py-2 font-medium text-white bg-blue-600 rounded-t-lg">Limit</button>
        <button className="px-4 py-2 font-medium text-gray-400">Market</button>
        <button className="px-4 py-2 font-medium text-gray-400">Stop</button>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <button className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold">
          Buy BTC
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold">
          Sell BTC
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-1">Price (USDT)</label>
          <input 
            type="text" 
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" 
            value="42,856.23" 
            disabled
          />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">Amount (BTC)</label>
          <input 
            type="text" 
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" 
            placeholder="0.00" 
          />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">Total (USDT)</label>
          <input 
            type="text" 
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" 
            placeholder="0.00" 
            disabled
          />
        </div>
      </div>


      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex justify-between text-gray-400 text-sm">
          <span>Available:</span>
          <span>0.00 USDT</span>
        </div>
        <div className="flex justify-between text-gray-400 text-sm mt-1">
          <span>BTC Balance:</span>
          <span>0.000000</span>
        </div>
      </div>
    </div>
  </div>

 
  <div className="mt-6 text-center text-gray-500 text-xs">
    This is a demo trading interface. No real transactions will be executed.
  </div>
</div>
      </div>
  );
}