'use client';

import { useState } from 'react';

export default function WhatIfHub() {
  const [activeTab, setActiveTab] = useState('calculator');

  // --- Shared X Share Function ---
  const shareToX = (text: string) => {
    const encodedText = encodeURIComponent(`${text} \n\n🪙 @what_if_token`);
    window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank');
  };

  // --- Shared Action Buttons (Post to X & Copy) ---
  const ActionButtons = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(`${text} \n\n🪙 @what_if_token`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="flex gap-3 mt-4">
        <button 
          onClick={() => shareToX(text)} 
          className="flex-1 bg-black hover:bg-gray-900 border border-gray-700 py-3 rounded-lg font-bold transition flex justify-center items-center"
        >
          Post to X
        </button>
        <button 
          onClick={handleCopy} 
          className={`flex-1 border py-3 rounded-lg font-bold transition flex justify-center items-center ${copied ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-gray-800 hover:bg-gray-700 border-gray-600 text-gray-200'}`}
        >
          {copied ? 'Copied!' : 'Copy Text'}
        </button>
      </div>
    );
  };

  // --- App 1: Regret Calculator ---
  const Calculator = () => {
    const [token, setToken] = useState('/what_if');
    const [amount, setAmount] = useState('');
    const [result, setResult] = useState('');

    const calculate = () => {
      if (!amount) return;
      const scenarios = [
        "You'd be sitting on a superyacht right now, aggressively providing concentrated liquidity on Meteora while paying someone a full-time salary just to refresh your DexScreener charts.",
        "You'd have enough capital to single-handedly sweep the floor of your favorite NFT collection, accidentally trigger a bull run, and get interviewed by Bloomberg as a 'visionary investor.'",
        "Instead of agonizing over the price of groceries, you would be negotiating the purchase of a mid-sized European castle just so you could host exclusive LAN parties for your Discord friends.",
        "You wouldn't be reading this. You'd be funding a black-ops team of rogue developers to build a custom MEV bot that purely extracts value from your enemies."
      ];
      const random = scenarios[Math.floor(Math.random() * scenarios.length)];
      setResult(`/what_if I didn't sell my ${amount} ${token} early? ${random}`);
    };

    return (
      <div className="space-y-4 animate-in fade-in duration-300">
        <h2 className="text-xl font-bold text-emerald-400">The Degen Regret Calculator</h2>
        <div className="flex gap-2">
          <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-3/5 bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500" />
          <select value={token} onChange={(e) => setToken(e.target.value)} className="w-2/5 bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500">
            <option value="/what_if">/what_if</option>
            <option value="SOL">SOL</option>
            <option value="BTC">BTC</option>
            <option value="$PROMPT">$PROMPT</option>
            <option value="$WET">$WET</option>
          </select>
        </div>
        <button onClick={calculate} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition">Calculate Regret</button>
        {result && (
          <div className="mt-4 space-y-2">
            <p className="p-4 bg-gray-800 rounded-lg border-l-4 border-emerald-500 leading-relaxed text-sm md:text-base">{result}</p>
            <ActionButtons text={result} />
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
        Work: [
          "/what_if my rescue cat somehow gained access to my Phantom wallet, bridged all my tokens to a forgotten Layer 2, and I am currently in a sweaty Discord call trying to reverse-engineer the smart contract?",
          "/what_if my hardware wallet got swallowed by a rogue Roomba, and I have spent the last three hours chasing it down the street with a broom?"
        ],
        Date: [
          "/what_if a dev just rugged the liquidity pool, and instead of leaving the house, I am obsessively tracking their wallet movements like a financially ruined detective?",
          "/what_if I accidentally paid for my morning coffee in Bitcoin, and the barista is legally forcing me to sit in the cafe for the next 45 minutes until the block confirms?"
        ],
        Family: [
          "/what_if I am currently trapped in a toxic, multi-hour debate on X Spaces about validator RAM requirements, and my digital reputation depends on me winning this argument?",
          "/what_if I tried to bridge my assets during a network congestion spike, and now they are floating in the digital abyss, forcing me to sit in pure silence and stare at a pending transaction hash?"
        ]
      };
      // @ts-ignore
      const options = excuses[obligation];
      const randomExcuse = options[Math.floor(Math.random() * options.length)];
      setExcuse(`I can't make it to ${obligation.toLowerCase()} today. ${randomExcuse}`);
    };

    return (
      <div className="space-y-4 animate-in fade-in duration-300">
        <h2 className="text-xl font-bold text-blue-400">The Unhinged Excuse Generator</h2>
        <select value={obligation} onChange={(e) => setObligation(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500">
          <option value="Work">Work Meeting</option>
          <option value="Date">Tinder Date</option>
          <option value="Family">Family Dinner</option>
        </select>
        <button onClick={generate} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition">Generate Excuse</button>
        {excuse && (
          <div className="mt-4 space-y-2">
            <p className="p-4 bg-gray-800 rounded-lg border-l-4 border-blue-500 leading-relaxed text-sm md:text-base">{excuse}</p>
            <ActionButtons text={excuse} />
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
        <textarea placeholder="e.g. my hardware wallet is just a glorified flash drive and I actually forgot the seed phrase in 2021..." value={thought} onChange={(e) => setThought(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white h-32 focus:outline-none focus:border-purple-500" />
        <button onClick={postThought} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg transition">Scream into the Void</button>
        {posted && (
          <div className="mt-4 space-y-2">
            <p className="p-4 bg-gray-800 rounded-lg border-l-4 border-purple-500 leading-relaxed text-sm md:text-base">{posted}</p>
            <ActionButtons text={posted} />
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
        "you accidentally trigger a massive liquidation cascade, causing the entire network to restart, but you walk away with enough profit to buy a sovereign island?",
        "it creates a butterfly effect where you end up losing your primary seed phrase, but finding true inner peace while living completely off the grid in the mountains?",
        "you make the right call, become a billionaire overnight, but are cursed to only ever communicate using obscure crypto acronyms for the rest of your life?"
      ];
      const random = predictions[Math.floor(Math.random() * predictions.length)];
      setPrediction(`You asked: "${question}" \n\nOracle says: /what_if ${random}`);
    };

    return (
      <div className="space-y-4 animate-in fade-in duration-300">
        <h2 className="text-xl font-bold text-orange-400">Alternate Timeline Oracle</h2>
        <input type="text" placeholder="Should I ape into this random presale?" value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-orange-500" />
        <button onClick={predict} className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-lg transition">Consult the 8-Ball</button>
        {prediction && (
          <div className="mt-4 space-y-2">
            <p className="p-4 bg-gray-800 rounded-lg border-l-4 border-orange-500 leading-relaxed text-sm md:text-base whitespace-pre-line">{prediction}</p>
            <ActionButtons text={prediction} />
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
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">/what_if Hub</h1>
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 shadow-lg">
            <p className="text-sm md:text-base text-gray-300 mb-3 uppercase tracking-wider font-bold">Join the chaos. Buy the token.</p>
            <p className="text-xs md:text-sm font-mono text-emerald-400 break-all bg-black p-3 rounded-lg border border-gray-800 shadow-inner">
              CA: F7A8URtVn5AvXcvKWQVKAtzMBqKVaBF22gxT2NcXpump
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          <button onClick={() => setActiveTab('calculator')} className={`p-3 rounded-lg text-sm font-bold transition-colors ${activeTab === 'calculator' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>Regret Calc</button>
          <button onClick={() => setActiveTab('excuse')} className={`p-3 rounded-lg text-sm font-bold transition-colors ${activeTab === 'excuse' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>Excuses</button>
          <button onClick={() => setActiveTab('confession')} className={`p-3 rounded-lg text-sm font-bold transition-colors ${activeTab === 'confession' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>Thoughts</button>
          <button onClick={() => setActiveTab('oracle')} className={`p-3 rounded-lg text-sm font-bold transition-colors ${activeTab === 'oracle' ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/20' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>Oracle</button>
        </div>

        {/* Active Tab Content */}
        <div className="bg-gray-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-800 min-h-[400px]">
          {activeTab === 'calculator' && <Calculator />}
          {activeTab === 'excuse' && <ExcuseGenerator />}
          {activeTab === 'confession' && <ConfessionBoard />}
          {activeTab === 'oracle' && <TimelineOracle />}
        </div>
      </div>
    </div>
  );
}