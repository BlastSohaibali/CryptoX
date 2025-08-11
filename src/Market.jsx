import {  motion } from "framer-motion";
import { useEffect, useState } from "react";
export default function Market(){
    const [marketCap, setMarketCap] = useState(0);
    const [volume, setVolume] = useState(0);
    const [activeCoins, setActiveCoins] = useState(0);
    const [loser , setloser]=useState([])
    const [top , settop]=useState([])
    const [data , setdata]=useState()
    const [count , setcount]=useState({x:0, y:0})
    const [price , setprice]=useState([])
    const [trending , settrending]=useState([])
    const [loading , setloading]=useState(false)


    useEffect(()=>{
      const threediv= async()=>{
        try{
        setloading(true)
        const request = await fetch("https://api.coingecko.com/api/v3/global")
        const result = await request.json();
        setActiveCoins(result.data.total_market_cap.usd);
        setMarketCap(result.data.total_volume.usd);
        setVolume(result.data.active_cryptocurrencies)
        }catch(error){
        setloading(false)
        console.log("error ha bro")
        }
      }
      threediv();
    },[])
    useEffect(()=>{
      const losetoper = async()=>{
        try{
        setloading(true)
        const request = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
        const result = await request.json();
        setdata(result)
        
        setloading(false)
        const topgainer = [...result]
        topgainer.sort((a , b)=>b.price_change_percentage_24h - a.price_change_percentage_24h)
        topgainer.slice((0 , 5))
        settop(topgainer);


        const toploser = [...result]
        toploser.sort((a , b)=>a.price_change_percentage_24h - b.price_change_percentage_24h)
        toploser.slice((0 , 5))
        setloser(toploser);
        }catch(error){
          setloading(false)
          console.log("gain lose ma error ha bro cheak kar goat")
        }
      };
      losetoper();
    }, [])

    useEffect(()=>{
        const handle = async()=>{
        try{
          setloading(true)
          console.log("Market component loaded")
        const request = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
        const result = await request.json();
        setprice(result)

        console.log("Fetched price:", result);
        setloading(false)
        }catch(error){
          setloading(false)
        console.log("daya diko is ko diko is **** , ")
        }
        };
        handle();
        const interval = setInterval(handle, 60000); 

        return () => clearInterval(interval); 
        },[]);


        // trending coin k liye

        useEffect(()=>{
          const trending = async()=>{
            try{
              const result = await fetch("https://api.coingecko.com/api/v3/search/trending")
              const request = await result.json();
              settrending(request.coins);
              console.log("trending coin", request)
            }catch(error){
              console.log(
                "error a gya ha bro"
              )
            }
          }
          trending();
        })
    
    return(
      <div onMouseMove={(e)=>setcount({x:e.clientX , y:e.clientY})} className="h-auto w-full 
               bg-black pt-16 relative p-5 md:p-10 md:pt-14">
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
              initial={{opacity:0, x:70}}
              animate={{opacity:1 , x:0}}
              transition={{duration:1}}
              >
              <div  className="bg-gray-900/50  backdrop-blur-md rounded p-4 border overflow-hidden border-gray-700 hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
                <div className="animate-marquee whitespace-nowrap flex gap-6 text-white ">
                    {price.map((coin)=>(
                      <div key={coin.id} className="flex items-center gap-2">
                        <img src={coin.image} alt={coin.name} className="w-5 h-5 rounded-full"/>
                        <span className="text-green-400 font-bold">{coin.name}</span>
                        <span className="text-gray-400 ">${coin.current_price.toLocaleString()}</span>
                      </div>
                    ))}
                </div>
              </div> 
              </motion.div>
              
              <motion.div
              initial={{opacity:0, x:-70}}
              animate={{opacity:1 , x:0}}
              transition={{duration:1}}
              >
              <div className="mt-8">
                <h1 className="text-green-500 md:text-5xl text-4xl font-bold bg-gradient-to-r from-green-500/30 to-transparent p-2 rounded-lg inline-block">
                  Market Overview
                </h1>
                <p className="text-gray-500 md:text-md text-sm mt-2">
                  Track real-time cryptocurrency prices and market data
                </p>
              </div>
              </motion.div>

                    
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
  {loading ? (
      <div className="col-span-3 flex justify-center items-center h-64">
        <div className="relative">
          <div className="rounded-full animate-spin h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full animate-ping h-8 w-8 bg-green-500/30"></div>
          </div>
        </div>
      </div>
  ) : (
    <>
      <div className="group relative flex flex-col bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg rounded-xl h-full border border-gray-700 hover:border-green-400 transition-all duration-500 hover:shadow-lg hover:shadow-green-500/20 overflow-hidden p-6">
        <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-blue-500 opacity-0 group-hover:opacity-20 blur-md transition-all duration-500"></div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-gray-800/50 group-hover:bg-green-500/10 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-400 text-sm font-medium">Total Market Cap</p>
        </div>
        <p className="text-2xl font-bold text-green-400">${marketCap.toLocaleString()}</p>
        <div className="mt-4 flex items-center text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span>24h change: +2.4%</span>
        </div>
      </div>

      <div className="group relative flex flex-col bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg rounded-xl h-full border border-gray-700 hover:border-blue-400 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/20 overflow-hidden p-6">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-500 opacity-0 group-hover:opacity-20 blur-md transition-all duration-500"></div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-gray-800/50 group-hover:bg-blue-500/10 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <p className="text-gray-400 text-sm font-medium">24h Volume</p>
        </div>
        <p className="text-2xl font-bold text-green-500">${volume.toLocaleString()}</p>
        <div className="mt-4 flex items-center text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span>Top pair: BTC/USDT</span>
        </div>
      </div>

      <div className="group relative flex flex-col bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg rounded-xl h-full border border-gray-700 hover:border-purple-400 transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/20 overflow-hidden p-6">
        <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-500 opacity-0 group-hover:opacity-20 blur-md transition-all duration-500"></div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-gray-800/50 group-hover:bg-purple-500/10 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <p className="text-gray-400 text-sm font-medium">Active Coins</p>
        </div>
        <p className="text-2xl font-bold text-green-500">{activeCoins.toLocaleString()}</p>
        <div className="mt-4 flex items-center text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>+24 new this week</span>
        </div>
      </div>
    </>
  )}
</div>
                
              {/* LOser Gainer */}
              
              <div className="mt-10 h-full">
                {loading ? (<div className="flex justify-center items-center h-40">
                <div className="rounded-full animate-spin h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                </div>):(

                <div className="flex flex-col bg-gray-900/50 backdrop-blur-md rounded-lg h-full border border-gray-700 hover:border-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 overflow-hidden">
                  <h2 className="text-xl font-bold text-white p-4 bg-gray-800/50 border-b border-gray-700 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 13a1 1 0 100-2H8a1 1 0 100 2h4zm0-4a1 1 0 100-2H8a1 1 0 100 2h4z" clipRule="evenodd" />
                    </svg>
                    Top Gainer coin
                  </h2>

                  <div className="flex flex-row md:justify-around justify-between items-center text-gray-300 text-sm font-semibold px-4 py-3 border-b border-gray-600 bg-gray-800/30">
                    <div className="w-[40px]">Logo</div>
                    <div className="w-[100px]">Name</div>
                    <div className="w-[60px]">Price</div>
                    <div className="w-[60px]">Gain</div>
                  </div>

                  {top.map((top)=>(
                    <div key={top.id} className="flex flex-row md:justify-around justify-between  items-center px-4 py-3 text-white hover:bg-gray-800/50 transition-colors duration-200 even:bg-gray-900/20">
                      <img src={top.image} alt={top.name} className="w-6 h-6" />
                      <span className="w-[100px] font-medium   ">{top.name}</span>
                      <span className="w-[60px] text-gray-400 font-mono ">${top.current_price.toLocaleString()}</span>
                      <span className="w-[60px] text-green-400 font-bold">+{top.price_change_percentage_24h.toFixed(2)}%</span>
                    </div>
                  ))}
                </div>
                )}
              </div>

               <div className="mt-10 h-full">
                {loading ? (<div className="flex justify-center items-center h-40">
                <div className="rounded-full animate-spin h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                </div>):(

                <div className="flex flex-col bg-gray-900/50 backdrop-blur-md rounded-lg h-full border border-gray-700 hover:border-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 overflow-hidden">
                  <h2 className="text-xl font-bold text-white p-4 bg-gray-800/50 border-b border-gray-700 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 13a1 1 0 100-2H8a1 1 0 100 2h4zm0-4a1 1 0 100-2H8a1 1 0 100 2h4z" clipRule="evenodd" />
                    </svg>
                    Top Loser Coin
                  </h2>

                  <div className="flex flex-row md:justify-around justify-between items-center text-gray-300 text-sm font-semibold px-4 py-3 border-b border-gray-600 bg-gray-800/30">
                    <div className="w-[40px]">Logo</div>
                    <div className="w-[100px]">Name</div>
                    <div className="w-[60px]">Price</div>
                    <div className="w-[60px]">lose</div>
                  </div>

                  {loser.map((top)=>(
                    <div key={top.id} className="flex flex-row md:justify-around justify-between  items-center px-4 py-3 text-white hover:bg-gray-800/50 transition-colors duration-200 even:bg-gray-900/20">
                      <img src={top.image} alt={top.name} className="w-6 h-6" />
                      <span className="w-[100px] font-medium   ">{top.name}</span>
                      <span className="w-[60px] text-gray-400 font-mono ">${top.current_price.toLocaleString()}</span>
                      <span className="w-[60px] text-red-600 font-bold">-{top.price_change_percentage_24h.toFixed(2)}%</span>
                    </div>
                  ))}
                </div>
                )}
              </div>

              
  {/* Trending coins table */}
              <div className="mt-10 h-full">
                {loading ? (<div className="flex justify-center items-center h-40">
                <div className="rounded-full animate-spin h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                </div>):(
                <div className="flex flex-col bg-gray-900/50 backdrop-blur-md rounded-lg h-full border border-gray-700 hover:border-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 overflow-hidden">
                  <h2 className="text-xl font-bold text-white p-4 bg-gray-800/50 border-b border-gray-700 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 13a1 1 0 100-2H8a1 1 0 100 2h4zm0-4a1 1 0 100-2H8a1 1 0 100 2h4z" clipRule="evenodd" />
                    </svg>
                    Trending Coins
                  </h2>

                  <div className="flex flex-row md:justify-around justify-between items-center text-gray-300 text-sm font-semibold px-4 py-3 border-b border-gray-600 bg-gray-800/30">
                    <div className="w-[40px]">Logo</div>
                    <div className="w-[100px]">Name</div>
                    <div className="w-[60px]">Symbol</div>
                    <div className="w-[60px]">Rank</div>
                  </div>

                  {trending.map((trend) => {
                    const item = trend.item;
                    return (
                      <div 
                        key={item.id} 
                        className="flex flex-row md:justify-around justify-between  items-center px-4 py-3 text-white hover:bg-gray-800/50 transition-colors duration-200 even:bg-gray-900/20"
                      >
                        <img src={item.thumb} alt={item.name} className= "w-8 h-8 rounded-full" />
                        <p className="w-[100px] font-medium              ">{item.name}</p>
                        <p className="w-[60px] text-gray-400 font-mono ">{item.symbol.toUpperCase()}</p>
                        <p className="w-[60px] text-green-400 font-bold">{item.market_cap_rank}</p>
                      </div>
                    )
                  })}
                </div>
                )}
              </div>
        


         <div className="relative hidden  h-96 md:flex items-center justify-center mt-6 ">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Central Bitcoin Icon */}
        <motion.div
          className="w-32 h-32 rounded-full bg-green-500 flex items-center justify-center relative z-10 shadow-green-500"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <span className="text-4xl font-bold text-black">₿</span>
        </motion.div>

        {/* Orbiting Elements */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-green-500 rounded-full"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              transformOrigin: `${80 + i * 20}px center`,
            }}
          />
        ))}

        {/* Floating Chart Lines */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 400 300" className="text-green-500">
            <path
              d="M50,200 Q100,150 150,180 T250,120 T350,100"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
            />
            <path
              d="M50,220 Q120,180 180,200 T280,140 T380,120"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray="3,3"
            />
          </svg>
        </motion.div>

        {/* Floating Numbers */}
        {['$43K', '+2.3%', '₿', 'ETH'].map((text, i) => (
          <motion.div
            key={text}
            className="absolute text-green-500 font-bold text-lg opacity-60"
            animate={{
              y: [0, -20, 0],
              x: [0, Math.sin(i) * 10, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
          >
            {text}
          </motion.div>
        ))}
      </motion.div>
    </div>
              
      </div>
    )
}