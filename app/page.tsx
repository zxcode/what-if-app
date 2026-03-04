'use client';

import { useState } from 'react';

export default function DegenCalculator() {
  const [token, setToken] = useState('SOL');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');

  const scenarios = [
    "/what_if you didn't sell early? You'd be providing maximum liquidity on Meteora from your private island instead of staring at this screen.",
    "/what_if you had diamond hands? You'd be funding a new tech startup right now instead of eating instant ramen.",
    "/what_if you bought that dip? You would have enough capital to bribe a seagull to steal your boss's laptop.",
    "/what_if you just held? You'd be driving a Lambo on the moon while we are all stuck in traffic."
  ];

  const calculateRegret = () => {
    if (!amount || isNaN(Number(amount))) {
      setResult("Enter a real number, degen. /what_if you actually learned to type?");
      return;
    }
    
    // Pick a random unhinged scenario
    const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    setResult(`You missed out on holding ${amount} ${token}. ${randomScenario}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
        <h1 className="text-3xl font-bold text-center text-emerald-400 mb-2">
          The Degen Regret Calculator
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Calculate the pain of your past trades.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Select Token</label>
            <select 
              value={token} 
              onChange={(e) => setToken(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="SOL">Solana (SOL)</option>
              <option value="$PROMPT">$PROMPT</option>
              <option value="$WET">$WET</option>
              <option value="BTC">Bitcoin (BTC)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Amount You ALMOST Bought</label>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 1000"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 placeholder-gray-500"
            />
          </div>

          <button 
            onClick={calculateRegret}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-gray-900 font-bold py-3 px-4 rounded-lg transition duration-200 mt-4"
          >
            Calculate My Regret
          </button>
        </div>

        {result && (
          <div className="mt-8 p-4 bg-gray-700 rounded-lg border-l-4 border-emerald-500 animate-fade-in">
            <p className="text-lg text-emerald-300 font-mono">{result}</p>
          </div>
        )}
      </div>
      
      <p className="mt-8 text-gray-500 text-sm">
        Powered by <span className="font-bold text-emerald-400">/what_if</span>
      </p>
    </div>
  );
}