import { useEffect, useState } from "react"
import { motion } from "framer-motion";
import { FaBitcoin,  FaEthereum, FaExchangeAlt, FaWallet, } from 'react-icons/fa';
import Lottie from "lottie-react";
import animationData from "../assets/Robot.json";
export default function Hero(){
    const [count , setcount]=useState({x:0, y:0})
    const [search , setsearch]=useState("")
    const [get , setget]=useState([])
    const [lodding , setlodding]=useState(false)


    useEffect(() => {
  const timer = setTimeout(() => {
    handler();
  }, 500);

  return () => clearTimeout(timer);
}, [search]);
    
   const handler = async () => {
    setlodding(true);
    const Get_API = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${search.toLowerCase()}`;
    try {
      const request = await fetch(Get_API);
      const result = await request.json();
      setget(result);
      setlodding(false);
      console.log(result);
    } catch (erro) {
      console.log("bro so raha ha error a raha ha kiya kar raha h");
      setlodding(false);
    }
  };

  const keydown = (e)=>{
    if(e.key === "Enter"){
        handler();
    }
  }
    return(
       
        <div onMouseMove={(e)=>setcount({x:e.clientX , y:e.clientY})} className="h-auto w-full 
        bg-black pt-12 relative md:p-10 p-5">
             <motion.div
                     className="pointer-events-none fixed rounded-full blur-2xl z-10"
                     style={{
                       top: count.y - 150,
                       left: count.x - 150,
                       width: 300,
                       height: 300,
                       background: "radial-gradient(circle, rgba(0,255,150,0.5) 0%, transparent 70%)",
                     }}
                     animate={{ opacity: [0.4, 0.1, 0.4] }}
                     transition={{ duration: 2, repeat: Infinity }}
                   />

        <motion.div
        initial={{opacity:0, x:-70}}
        animate={{opacity:1 , x:0}}
        transition={{duration:1}}
        >
        <div className="flex flex-col mt-16">
            <h1 className="text-white md:text-5xl font-bold text-4xl ">
                Trade Smarter with CryptoX

            </h1>
            <h3 className="bg-clip-text text-transparent
            md:text-3xl font-bold text-xl
            bg-green-500 mt-3">
                Trade Anytime , Anywhere with Confidence
            </h3>
            <p className="text-gray-400 tracking-widest mt-5 text-sm">Buy sell and track your favorite cryptocurrencies all in one place.
            </p>
        </div>
        <div className=" flex mt-10 ">
            <input onKeyDown={keydown} value={search} type="text" placeholder="Search Coin " onChange={(e)=>(setsearch(e.target.value))} className="w-[500px] bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-lg py-4 px-5 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"/>
        </div>

        <div className="md:hidden mt-10 gap-5 flex">
            <button className="bg-green-500 rounded px-4 py-2 hover:bg-green-700 transition duration-200 active:scale-95">Explore Market</button>
            <button className="bg-green-500 rounded px-6 py-2 hover:bg-green-700 transition duration-200 active:scale-95">Get Started</button>
         </div>
         </motion.div>

         {/* <div className="mt-5 gap-4 md:hidden flex">
            <div className="text-black h-[50px] w-[50px] backdrop-blur-lg  border-white/20 
            bg-white/10 rounded-xl flex items-center justify-center "><FaBitcoin className="h-[0px] w-[40px] text-yellow-500"/></div>

            <div className="text-black h-[50px] w-[50px] backdrop-blur-lg  border-white/20 
            bg-white/10 rounded-xl flex items-center justify-center "><FaEthereum className="h-[40px] w-[40px] text-gray-400"/></div>

            <div className="text-black h-[50px] w-[50px] backdrop-blur-lg  border-white/20 
            bg-white/10 rounded-xl flex items-center justify-center "><FaWallet className="h-[40px] w-[40px] text-green-500"/></div>

            <div className="text-black h-[50px] w-[50px] backdrop-blur-lg  border-white/20 
            bg-white/10 rounded-xl flex items-center justify-center "><FaExchangeAlt className="h-[40px] w-[40px] text-blue-500"/></div>
         </div> */}

        <motion.div className="md:hidden h-[350px] w-[350px] md:h-[450px] md:w-[450px] z-20 mt-1 "
        initial={{opacity:0, x:170}}
        animate={{opacity:1 , x:0}}
        transition={{duration:2}}
        >
        <Lottie animationData={animationData} loop={true} className="" />
        </motion.div>
        <motion.div
        initial={{opacity:0, x:0}}
        animate={{opacity:1 , x:20}}
        transition={{duration:8}}
        >
        <div className="hidden md:flex fixed right-0  transform -translate-y-1/2 z-50 w-[450px] h-[450px] mr-20">
            <Lottie animationData={animationData} loop={true} />
        </div>
        </motion.div>
        <motion.div
        initial={{opacity:0, x:-70}}
        animate={{opacity:1 , x:0}}
        transition={{duration:1}}
        >
         <div className="mt-10 gap-5 hidden md:flex">
            <button className="bg-green-500 rounded px-8 py-3 hover:bg-green-700 transition duration-200 active:scale-95">Explore Market</button>
            <button className="bg-green-500 rounded px-8 py-3 hover:bg-green-700 transition duration-200 active:scale-95">Get Started</button>
         </div>

          <div className="mt-10 hidden md:flex gap-4 items-center">

            <div className="flex flex-col items-center gap-1">
              <div className="h-12 w-20 bg-yellow-500/10 backdrop-blur-lg border border-white/20 rounded-lg flex items-center justify-center">
                <FaBitcoin className="h-6 w-6 text-yellow-500" />
              </div>
              <span className="text-xs text-white/80">Bitcoin</span>
            </div>


            <div className="flex flex-col items-center gap-1">
              <div className="h-12 w-20 bg-purple-500/10 backdrop-blur-lg border border-white/20 rounded-lg flex items-center justify-center">
                <FaEthereum className="h-6 w-6 text-purple-400" />
              </div>
              <span className="text-xs text-white/80">Ethereum</span>
            </div>


            <div className="flex flex-col items-center gap-1">
              <div className="h-12 w-20 bg-green-500/10 backdrop-blur-lg border border-white/20 rounded-lg flex items-center justify-center">
                <FaWallet className="h-6 w-6 text-green-400" />
              </div>
              <span className="text-xs text-white/80">Wallet</span>
            </div>


            <div className="flex flex-col items-center gap-1">
              <div className="h-12 w-20 bg-blue-500/10 backdrop-blur-lg border border-white/20 rounded-lg flex items-center justify-center">
                <FaExchangeAlt className="h-5 w-5 text-blue-400" />
              </div>
              <span className="text-xs text-white/80">Exchange</span>
            </div>
          </div>
         </motion.div>




        <div className="mt-12">
  {lodding ? (
    <div className="flex justify-center items-center h-40">
      <div className="rounded-full animate-spin h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  ) : get.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-center">
      {get.map((coin, index) => (
        <div 
          key={index} 
          className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10"
        >
          <div className="flex items-center gap-4 mb-6">
            <img 
              src={coin.image} 
              alt={coin.name} 
              className="w-12 h-12 rounded-full bg-gray-800 p-1 border border-gray-600"
            />
            <div>
              <h1 className="text-xl font-bold text-white">{coin.name}</h1>
              <span className="text-gray-400 uppercase">{coin.symbol}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Price:</span>
              <span className="text-white font-mono">${coin.current_price.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">24h Change:</span>
              <span className={`font-mono ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {coin.price_change_percentage_24h >= 0 ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Market Cap:</span>
              <span className="text-white font-mono">${coin.market_cap?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : search && !lodding ? (
    <div className="text-center py-10">
      <h1 className="text-white text-xl font-medium">Coin not found</h1>
      <p className="text-gray-400 mt-2">Try searching for a different cryptocurrency</p>
    </div>
  ) : null}
  </div>
        </div>
    )}


        