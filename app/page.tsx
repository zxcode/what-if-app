'use client';

import { useState } from 'react';

export default function ExcuseGenerator() {
  const [obligation, setObligation] = useState('Work');
  const [excuse, setExcuse] = useState('');

  const excuses = {
    Work: [
      "/what_if my cat accidentally staked all my $PROMPT on Meteora and I have to manually untangle the smart contract?",
      "/what_if I got trapped in a VR metaverse trying to snipe a memecoin launch and forgot how to take the headset off?",
      "/what_if my hardware wallet got swallowed by a rogue Roomba and I am currently chasing it down the street?"
    ],
    Date: [
      "/what_if a dev just rugged the $WET liquidity pool and I am currently tracking their wallet on SolanaFM?",
      "/what_if I accidentally paid for my coffee in Bitcoin and the barista is forcing me to wait 10 minutes for block confirmation?",
      "/what_if my astrology app told me that interacting with fiat currency today would ruin my aura?"
    ],
    Family: [
      "/what_if I am currently stuck in a heated Discord debate about whether Solana validators need more RAM?",
      "/what_if I tried to bridge my assets and they got stuck in the mempool, so I have to sit here and watch the transaction hash?",
      "/what_if I promised to provide liquidity for a new dog coin and the community needs me more right now?"
    ]
  };

  const generateExcuse = () => {
    // @ts-ignore - Ignoring dynamic key typing for simplicity
    const options = excuses[obligation];
    const randomExcuse = options[Math.floor(Math.random() * options.length)];
    setExcuse(randomExcuse);
  };

  const shareToX = () => {
    if (!excuse) return;
    const text = encodeURIComponent(`I can't make it today. ${excuse} 🪙 @what_if_token`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-800">
        <h1 className="text-3xl font-extrabold text-center text-blue-400 mb-2 tracking-tight">
          The Unhinged Excuse Generator
        </h1>
        <p className="text-center text-gray-400 mb-8 text-sm">
          Get out of any obligation using pure, unfiltered chaos.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">What are you avoiding?</label>
            <select 
              value={obligation} 
              onChange={(e) => setObligation(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
            >
              <option value="Work">A Work Meeting</option>
              <option value="Date">A Tinder Date</option>
              <option value="Family">A Family Dinner</option>
            </select>
          </div>

          <button 
            onClick={generateExcuse}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-4 rounded-xl transition-colors duration-200 shadow-lg shadow-blue-500/20 active:scale-95"
          >
            Generate My Excuse
          </button>
        </div>

        {excuse && (
          <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-5 bg-gray-800 rounded-xl border border-gray-700 relative">
              <p className="text-lg text-gray-100 leading-relaxed">"{excuse}"</p>
            </div>
            
            <button 
              onClick={shareToX}
              className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white border border-gray-700 font-bold py-3 px-4 rounded-xl transition-colors duration-200"
            >
              {/* Simple X Logo SVG */}
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
              Post to X
            </button>
          </div>
        )}
      </div>
      
      <p className="mt-10 text-gray-500 text-sm font-medium tracking-wide">
        Powered by <span className="font-bold text-blue-400">/what_if</span>
      </p>
    </div>
  );
}