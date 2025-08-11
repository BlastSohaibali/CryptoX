import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { createChart } from 'lightweight-charts';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function Chart() {
  const [count, setcount] = useState({ x: 0, y: 0 });
  const [search, setsearch] = useState("bitcoin");
  const [loading, setloading] = useState(false);
  const [searchresult, setresult] = useState([]);
  const [chart, setchart] = useState();
  const [timeframe, setTimeframe] = useState("7");
  const [currency, setCurrency] = useState("usd");

  const chartContainerRef = useRef(null);
  const candleChartRef = useRef(null);

  useEffect(() => {
    if (!search.trim()) {
      setresult([]);
      return;
    }
    const handler = setTimeout(async() => {
      try {
        setresult("");
        const Get_API = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${search.toLowerCase()}`;
        const request = await fetch(Get_API);
        const result = await request.json();
        setresult(result);
      } catch (error) {
        alert("Kuch masla ha, check kar");
      }
    },500);

    return () => clearTimeout(handler);
  },[search, currency]);

  const keydown = (e) => {
    if (e.key === "Enter") {
        setsearch(e.target.value);
    }
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    if (candleChartRef.current) {
      candleChartRef.current.remove();
    }

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#0F0F0F' },
        textColor: '#D9D9D9',
      },
      grid: {
        vertLines: { color: '#1E1E1E' },
        horzLines: { color: '#1E1E1E' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });

    candleChartRef.current = chart;

    return () => {
      if (candleChartRef.current) {
        candleChartRef.current.remove();
      }
    };
  }, []);

  useEffect(()=>{
    if (!searchresult || searchresult.length === 0) return;
    const coin_id = searchresult[0].id;
    const arban = async()=>{
      try{
        setloading(true);
        const get = `https://api.coingecko.com/api/v3/coins/${coin_id}/market_chart?vs_currency=${currency}&days=${timeframe}`;
        const request = await fetch(get);
        const result = await request.json();

        const price = result.prices.map(p => p[1]);
        const labels = result.prices.map(p => new Date(p[0]).toLocaleDateString());

        setchart({
          labels,
          datasets:[
             {
            label: `${coin_id} Price (${currency.toUpperCase()})`,
            data: price,
            borderColor: "rgb(0,255,150)",
            backgroundColor: "rgba(0,255,150,0.3)",
            tension: 0.1,
            fill: true,
          }
          ],
        });

        const ohlcData = result.prices.map(([time, price]) => ({
          time: time / 1000,
          open: price,
          high: price * (1 + Math.random() * 0.02),
          low: price * (1 - Math.random() * 0.02),
          close: price * (1 + (Math.random() - 0.5) * 0.01),
        }));

        if (candleChartRef.current) {
          const candleSeries = candleChartRef.current.addCandlestickSeries({
            upColor: '#10B981',
            downColor: '#EF4444',
            borderVisible: false,
            wickUpColor: '#10B981',
            wickDownColor: '#EF4444',
          });
          candleSeries.setData(ohlcData);
        }

        setloading(false);
      }catch(error){
        setloading(false);
      }
    };
    arban();
  },[searchresult, timeframe, currency]);

  return (
    <div
      onMouseMove={(e) => setcount({ x: e.clientX, y: e.clientY })}
      className="min-h-screen w-full bg-black pt-24 relative md:p-10 p-5 overflow-y-auto" 
    >
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

      <div className="max-w-6xl mx-auto space-y-8"> 
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mt-4"> 
          <input
            type="text"
            onKeyDown={keydown}
            value={search}
            placeholder="Search cryptocurrency (e.g. bitcoin)"
            onChange={(e) => setsearch(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800/50 backdrop-blur-md border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          />
          
          <div className="flex gap-3 w-full md:w-auto">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="1">24h</option>
              <option value="7">7d</option>
              <option value="30">30d</option>
              <option value="90">90d</option>
              <option value="365">1y</option>
            </select>
            
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="usd" className="bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500">USD</option>
              <option value="eur" className="bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500">EUR</option>
              <option value="pkr" className="bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500">PKR</option>
              <option value="jpy" className="bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500">JPY</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="rounded-full animate-spin h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full animate-ping h-8 w-8 bg-green-500/30"></div>
              </div>
            </div>
          </div>
        ) : (
          searchresult &&
          searchresult.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-900/50 backdrop-blur-md rounded-lg p-4 border border-gray-700 hover:border-green-500 transition-all duration-300">
                  <h3 className="text-gray-400 text-sm">Current Price</h3>
                  <p className="text-2xl font-bold text-white">
                    {searchresult[0].current_price.toLocaleString(undefined, {
                      style: 'currency',
                      currency: currency.toUpperCase(),
                    })}
                  </p>
                  <p className={`text-sm mt-1 ${
                    searchresult[0].price_change_percentage_24h >= 0 
                      ? 'text-green-500' 
                      : 'text-red-500'
                  }`}>
                    {searchresult[0].price_change_percentage_24h >= 0 ? '↑' : '↓'} 
                    {Math.abs(searchresult[0].price_change_percentage_24h).toFixed(2)}% (24h)
                  </p>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-md rounded-lg p-4 border border-gray-700 hover:border-green-500 transition-all duration-300">
                  <h3 className="text-gray-400 text-sm">Market Cap</h3>
                  <p className="text-2xl font-bold text-white">
                    {searchresult[0].market_cap.toLocaleString(undefined, {
                      style: 'currency',
                      currency: currency.toUpperCase(),
                    })}
                  </p>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-md rounded-lg p-4 border border-gray-700 hover:border-green-500 transition-all duration-300">
                  <h3 className="text-gray-400 text-sm">24h Trading Volume</h3>
                  <p className="text-2xl font-bold text-white">
                    {searchresult[0].total_volume.toLocaleString(undefined, {
                      style: 'currency',
                      currency: currency.toUpperCase(),
                    })}
                  </p>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-md rounded-lg p-4 border border-gray-700 hover:border-green-500 transition-all duration-300">
                  <h3 className="text-gray-400 text-sm">All Time High</h3>
                  <p className="text-2xl font-bold text-white">
                    {searchresult[0].ath.toLocaleString(undefined, {
                      style: 'currency',
                      currency: currency.toUpperCase(),
                    })}
                  </p>
                </div>
              </div>

              

              <div className="bg-gray-900/50 rounded-lg border border-gray-700 p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-medium">Price Trend</h3>
                  <span className="text-gray-400 text-sm">{timeframe === "1" ? "24h" : `${timeframe}d`} view</span>
                </div>
                {chart && <Line 
                  data={chart} 
                  options={{ 
                    responsive: true,
                    plugins: {
                      legend: {
                        labels: {
                          color: '#D9D9D9'
                        }
                      }
                    },
                    scales: {
                      x: {
                        grid: {
                          color: '#1E1E1E'
                        },
                        ticks: {
                          color: '#D9D9D9'
                        }
                      },
                      y: {
                        grid: {
                          color: '#1E1E1E'
                        },
                        ticks: {
                          color: '#D9D9D9'
                        }
                      }
                    }
                  }} 
                />}
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}