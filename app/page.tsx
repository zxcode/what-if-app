'use client';

import { useState } from 'react';

export default function WhatIfHub() {
  const [activeTab, setActiveTab] = useState('calculator');

  // --- Shared X Share Function ---
  const shareToX = (text: string) => {
    const encodedText = encodeURIComponent(`${text} \n\n🪙 @what_if_token`);
    window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank');
  };

  // --- App 1: Regret Calculator ---
  const Calculator = () => {
    const [token, setToken] = useState('SOL');
    const [amount, setAmount] = useState('');
    const [result, setResult] = useState('');

    const calculate = () => {
      if (!amount) return;
      const scenarios = [
        "You'd be providing maximum liquidity on Meteora from your private island.",
        "You'd be funding a new tech startup right now instead of eating instant ramen.",
        "You would have enough capital to bribe a seagull to steal your boss's laptop."
      ];
      const random = scenarios[Math.floor(Math.random() * scenarios.length)];
      setResult(`/what_if I didn't sell my ${amount} ${token} early? ${random}`);
    };

    return (
      <div className="space-y-4 animate-in fade-in duration-300">
        <h2 className="text-xl font-bold text-emerald-400">The Degen Regret Calculator</h2>
        <div className="flex gap-2">
          <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-2/3 bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none" />
          <select value={token} onChange={(e) => setToken(e.target.value)} className="w-1/3 bg-gray-800 border border-gray-700 rounded-lg p-3 text-white">
            <option value="SOL">SOL</option>
            <option value="$PROMPT">$PROMPT</option>
            <option value="$WET">$WET</option>
          </select>
        </div>
        <button onClick={calculate} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition">Calculate Regret</button>
        {result && (
          <div className="mt-4 space-y-2">
            <p className="p-4 bg-gray-800 rounded-lg border-l-4 border-emerald-500">{result}</p>
            <button onClick={() => shareToX(result)} className="w-full bg-black hover:bg-gray-900 border border-gray-700 py-2 rounded-lg font-bold">Post to X</button>
          </div>
        )}
      </div>
    );
  };

  // --- App 2: Excuse Generator ---
  const ExcuseGenerator = () => {
    const [obligation, setObligation] = useState('Work');
    const [excuse, setExcuse] = useState('');

    const generate = () => {
      const excuses = {
        Work: "/what_if my cat accidentally staked all my crypto and I have to manually untangle the smart contract?",
        Date: "/what_if a dev just rugged the liquidity pool and I am currently tracking their wallet?",
        Family: "/what_if I tried to bridge my assets and they got stuck in the mempool?"
      };
      // @ts-ignore
      setExcuse(`I can't make it to ${obligation.toLowerCase()} today. ${excuses[obligation]}`);
    };

    return (
      <div className="space-y-4 animate-in fade-in duration-300">
        <h2 className="text-xl font-bold text-blue-400">The Unhinged Excuse Generator</h2>
        <select value={obligation} onChange={(e) => setObligation(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white">
          <option value="Work">Work</option>
          <option value="Date">Date</option>
          <option value="Family">Family Dinner</option>
        </select>
        <button onClick={generate} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition">Generate Excuse</button>
        {excuse && (
          <div className="mt-4 space-y-2">
            <p className="p-4 bg-gray-800 rounded-lg border-l-4 border-blue-500">{excuse}</p>
            <button onClick={() => shareToX(excuse)} className="w-full bg-black hover:bg-gray-900 border border-gray-700 py-2 rounded-lg font-bold">Post to X</button>
          </div>
        )}
      </div>
    );
  };

  // --- App 3: Confession Board ---
  const ConfessionBoard = () => {
    const [thought, setThought] = useState('');
    const [posted, setPosted] = useState('');

    const postThought = () => {
      if (!thought) return;
      setPosted(`/what_if ${thought.replace('/what_if ', '')}`);
      setThought('');
    };

    return (
      <div className="space-y-4 animate-in fade-in duration-300">
        <h2 className="text-xl font-bold text-purple-400">Web3 Shower Thoughts</h2>
        <textarea placeholder="e.g. my cat actually understands English..." value={thought} onChange={(e) => setThought(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white h-24 focus:outline-none" />
        <button onClick={postThought} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg transition">Scream into the Void</button>
        {posted && (
          <div className="mt-4 space-y-2">
            <p className="p-4 bg-gray-800 rounded-lg border-l-4 border-purple-500">{posted}</p>
            <button onClick={() => shareToX(posted)} className="w-full bg-black hover:bg-gray-900 border border-gray-700 py-2 rounded-lg font-bold">Post to X</button>
          </div>
        )}
      </div>
    );
  };

  // --- App 4: Timeline Oracle ---
  const TimelineOracle = () => {
    const [question, setQuestion] = useState('');
    const [prediction, setPrediction] = useState('');

    const predict = () => {
      if (!question) return;
      const predictions = [
        "you gain superpowers, and are forced to fight crime in your neighborhood?",
        "you accidentally trigger a bull market and become the CEO of Solana?",
        "it creates a butterfly effect that deletes the internet tomorrow?"
      ];
      const random = predictions[Math.floor(Math.random() * predictions.length)];
      setPrediction(`You asked: "${question}" \n\nOracle says: /what_if ${random}`);
    };

    return (
      <div className="space-y-4 animate-in fade-in duration-300">
        <h2 className="text-xl font-bold text-orange-400">Alternate Timeline Oracle</h2>
        <input type="text" placeholder="Should I quit my job?" value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none" />
        <button onClick={predict} className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-lg transition">Consult the 8-Ball</button>
        {prediction && (
          <div className="mt-4 space-y-2">
            <p className="p-4 bg-gray-800 rounded-lg border-l-4 border-orange-500 whitespace-pre-line">{prediction}</p>
            <button onClick={() => shareToX(prediction)} className="w-full bg-black hover:bg-gray-900 border border-gray-700 py-2 rounded-lg font-bold">Post to X</button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="max-w-xl w-full">
        {/* Header & Tagline */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">/what_if Hub</h1>
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 shadow-lg">
            <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider font-bold">Join the chaos. Buy the token.</p>
            <p className="text-xs md:text-sm font-mono text-emerald-400 break-all bg-black p-2 rounded border border-gray-800">
              CA: F7A8URtVn5AvXcvKWQVKAtzMBqKVaBF22gxT2NcXpump
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          <button onClick={() => setActiveTab('calculator')} className={`p-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'calculator' ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>Regret Calc</button>
          <button onClick={() => setActiveTab('excuse')} className={`p-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'excuse' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>Excuses</button>
          <button onClick={() => setActiveTab('confession')} className={`p-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'confession' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>Thoughts</button>
          <button onClick={() => setActiveTab('oracle')} className={`p-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'oracle' ? 'bg-orange-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>Oracle</button>
        </div>

        {/* Active Tab Content */}
        <div className="bg-gray-900 rounded-2xl shadow-2xl p-6 border border-gray-800 min-h-[350px]">
          {activeTab === 'calculator' && <Calculator />}
          {activeTab === 'excuse' && <ExcuseGenerator />}
          {activeTab === 'confession' && <ConfessionBoard />}
          {activeTab === 'oracle' && <TimelineOracle />}
        </div>
      </div>
    </div>
  );
}