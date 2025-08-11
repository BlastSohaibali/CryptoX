import { useState } from 'react';

export default function Button() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row gap-4">
        <button 
          onClick={() => {
            setShowLogin(true);
            setShowSignup(false);
          }}
          className="bg-green-500 px-12 py-1 text-black rounded active:scale-95 hover:bg-green-600 duration-200 md:shadow-xl shadow-green-700"
        >
          Login
        </button>
        <button 
          onClick={() => {
            setShowSignup(true);
            setShowLogin(false);
          }}
          className="bg-green-500 px-10 py-1 text-black rounded active:scale-95 hover:bg-green-600 duration-200 md:shadow-xl shadow-green-700"
        >
          Signup
        </button>
      </div>

      {/* Login Popup */}
      {showLogin && (
        <div className="absolute top-full mt-4 left-0 bg-gray-800 border border-gray-700 rounded-lg p-6 w-[200px] md:w-72 z-10 shadow-xl shadow-green-700/20">
          <h3 className="text-green-500 text-lg font-semibold mb-4">Login</h3>
          <div className="space-y-3">
            <input 
              type="text" 
              placeholder="Username" 
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <div className="flex justify-between items-center pt-2">
              <button 
                onClick={() => setShowLogin(false)}
                className="bg-green-600 px-4 py-1 rounded hover:bg-green-700 duration-200"
              >
                Submit
              </button>
              <button 
                onClick={() => setShowLogin(false)}
                className="text-gray-400 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Signup Popup */}
      {showSignup && (
        <div className="absolute top-full mt-4 left-0 bg-gray-800 border border-gray-700 rounded-lg p-6 w-[200px] md:w-72 z-10 shadow-xl shadow-green-700/20">
          <h3 className="text-green-500 text-lg font-semibold mb-4">Sign Up</h3>
          <div className="space-y-3">
            <input 
              type="text" 
              placeholder="Username" 
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <div className="flex justify-between items-center pt-2">
              <button 
                onClick={() => setShowSignup(false)}
                className="bg-green-600 px-4 py-1 rounded hover:bg-green-700 duration-200"
              >
                Register
              </button>
              <button 
                onClick={() => setShowSignup(false)}
                className="text-gray-400 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}