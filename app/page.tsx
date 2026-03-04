'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import html2canvas from 'html2canvas';

export default function WhatIfHub() {
  const [activeTab, setActiveTab] = useState('game');

  // --- Shared X Share Function ---
  const shareToX = (text: string) => {
    const encodedText = encodeURIComponent(`${text} \n\n🪙 @what_if_soI`);
    window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank');
  };

  // --- Shared Action Buttons (Post to X & Copy) ---
  const ActionButtons = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(`${text} \n\n🪙 @what_if_soI`);
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

  // --- MINIGAME: DODGE THE RUG ---
  const MiniGame = () => {
    const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
    const [score, setScore] = useState(0);
    const [playerX, setPlayerX] = useState(50); // percentage 0-100
    const [items, setItems] = useState<{ id: number; x: number; y: number; type: 'token' | 'rug' }[]>([]);
    
    // Fixed initial values to satisfy TypeScript
    const requestRef = useRef<number>(0);
    const lastSpawnRef = useRef<number>(0);
    const speedRef = useRef(0.5); 
    const frameRef = useRef(0);

    const startGame = () => {
      setGameState('playing');
      setScore(0);
      setItems([]);
      setPlayerX(50);
      speedRef.current = 0.5;
    };

    const gameLoop = useCallback(() => {
      if (gameState !== 'playing') return;

      frameRef.current += 1;

      if (frameRef.current % 600 === 0) {
        speedRef.current += 0.1;
      }

      setItems((prevItems) => {
        let newItems = prevItems
          .map((item) => ({ ...item, y: item.y + speedRef.current }))
          .filter((item) => item.y < 100); 

        if (frameRef.current - lastSpawnRef.current > 40) {
          lastSpawnRef.current = frameRef.current;
          const isRug = Math.random() > 0.7; 
          newItems.push({
            id: Math.random(),
            x: Math.floor(Math.random() * 90) + 5,
            y: -10,
            type: isRug ? 'rug' : 'token',
          });
        }

        newItems.forEach((item) => {
          if (item.y > 85 && item.y < 95 && Math.abs(item.x - playerX) < 10) {
            if (item.type === 'rug') {
              setGameState('gameover');
            } else {
              setScore((s) => s + 100);
              item.y = 200; 
            }
          }
        });

        return newItems;
      });

      requestRef.current = requestAnimationFrame(gameLoop);
    }, [gameState, playerX]);

    useEffect(() => {
      if (gameState === 'playing') {
        requestRef.current = requestAnimationFrame(gameLoop);
      }
      return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
      };
    }, [gameState, gameLoop]);

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (gameState !== 'playing') return;
        if (e.key === 'ArrowLeft') setPlayerX((prev) => Math.max(5, prev - 8));
        if (e.key === 'ArrowRight') setPlayerX((prev) => Math.min(95, prev + 8));
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState]);

    const handleTouch = (e: React.MouseEvent | React.TouchEvent, direction: 'left' | 'right') => {
      e.preventDefault();
      if (gameState !== 'playing') return;
      if (direction === 'left') setPlayerX((prev) => Math.max(5, prev - 15));
      if (direction === 'right') setPlayerX((prev) => Math.min(95, prev + 15));
    };

    const getRoast = () => {
      if (score === 0) return "/what_if you didn't instantly buy the top and get rugged on block zero?";
      if (score < 1000) return `/what_if you held longer? You secured a $${score}k Market Cap before panicking.`;
      if (score < 3000) return `Not bad. /what_if you pushed it further? You reached a $${score}k Market Cap!`;
      return `Legendary. /what_if you actually traded this well in real life? $${score}k Market Cap secured!`;
    };

    return (
      <div className="space-y-4 animate-in fade-in duration-300">
        <h2 className="text-xl font-bold text-yellow-400 text-center uppercase tracking-widest">Dodge the Rug</h2>
        
        <div className="relative w-full h-[400px] bg-gray-950 border-2 border-gray-700 rounded-xl overflow-hidden shadow-inner touch-none select-none">
          {gameState === 'playing' && (
            <>
              <div className="absolute top-4 left-4 z-10 font-mono text-emerald-400 font-bold text-xl drop-shadow-md">
                MCap: ${score}k
              </div>
              {items.map((item) => (
                <div key={item.id} className="absolute text-3xl transition-transform" style={{ left: `${item.x}%`, top: `${item.y}%`, transform: 'translateX(-50%)' }}>
                  {item.type === 'token' ? '🪙' : '📉'}
                </div>
              ))}
              <div className="absolute bottom-4 text-4xl transition-all duration-75 ease-out" style={{ left: `${playerX}%`, transform: 'translateX(-50%)' }}>
                💎
              </div>
              <div className="absolute inset-y-0 left-0 w-1/2 z-20" onTouchStart={(e) => handleTouch(e, 'left')} onMouseDown={(e) => handleTouch(e, 'left')} />
              <div className="absolute inset-y-0 right-0 w-1/2 z-20" onTouchStart={(e) => handleTouch(e, 'right')} onMouseDown={(e) => handleTouch(e, 'right')} />
            </>
          )}

          {gameState === 'start' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/90 z-30 p-6 text-center">
              <div className="text-6xl mb-4">💎</div>
              <h3 className="text-2xl font-black text-white mb-2">Catch the Pump.</h3>
              <p className="text-gray-400 mb-6 text-sm">Tap left/right or use arrow keys.<br/>Catch 🪙. Dodge 📉.</p>
              <button onClick={startGame} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-full transition shadow-lg shadow-emerald-500/20 text-lg uppercase tracking-wider">
                Start Game
              </button>
            </div>
          )}

          {gameState === 'gameover' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-950/95 z-30 p-6 text-center animate-in fade-in zoom-in duration-300">
              <div className="text-6xl mb-2">🛑</div>
              <h3 className="text-3xl font-black text-red-500 mb-2 uppercase">Rug Pulled!</h3>
              <p className="text-emerald-400 font-mono text-xl mb-4 font-bold">Final MCap: ${score}k</p>
              
              <div className="bg-black/50 p-4 rounded-lg border border-red-900 mb-6 w-full">
                <p className="text-gray-300 text-sm leading-relaxed">"{getRoast()}"</p>
              </div>

              <div className="flex gap-3 w-full">
                <button onClick={startGame} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-lg border border-gray-600 transition">
                  Play Again
                </button>
                <button onClick={() => shareToX(`I just pushed the /what_if token to a $${score}k Market Cap before getting violently rug pulled in the official mini-game. Can you beat my score? \n\n${getRoast()}`)} className="flex-1 bg-black hover:bg-gray-900 text-white font-bold py-3 rounded-lg border border-gray-700 transition">
                  Post to X
                </button>
              </div>
            </div>
          )}
        </div>
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
        "Instead of agonizing over the price of groceries, you would be negotiating the purchase of a mid-sized European castle just so you could host exclusive LAN parties for your Discord friends."
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
        Work: ["/what_if my rescue cat somehow gained access to my Phantom wallet and I am currently in a sweaty Discord call trying to reverse-engineer the smart contract?"],
        Date: ["/what_if a dev just rugged the liquidity pool, and I am obsessively tracking their wallet movements like a financially ruined detective?"],
        Family: ["/what_if I am currently trapped in a toxic, multi-hour debate on X Spaces about validator RAM requirements?"]
      };
      // @ts-ignore
      const randomExcuse = excuses[obligation][0];
      setExcuse(`I can't make it to ${obligation.toLowerCase()} today. ${randomExcuse}`);
    };

    return (
      <div className="space-y-4 animate-in fade-in duration-300">
        <h2 className="text-xl font-bold text-blue-400">Unhinged Excuse Generator</h2>
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
        <textarea placeholder="e.g. my hardware wallet is just a glorified flash drive..." value={thought} onChange={(e) => setThought(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white h-32 focus:outline-none focus:border-purple-500" />
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
      setPrediction(`You asked: "${question}" \n\nOracle says: /what_if you accidentally trigger a massive liquidation cascade, causing the entire network to restart?`);
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

  // --- App 5: Meme Generator ---
  const MemeGenerator = () => {
    const [topText, setTopText] = useState('/WHAT_IF');
    const [bottomText, setBottomText] = useState('I JUST HELD?');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const memeRef = useRef<HTMLDivElement>(null); 

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    const downloadMeme = async () => {
      if (memeRef.current) {
        const canvas = await html2canvas(memeRef.current, { useCORS: true, allowTaint: true });
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = image;
        link.download = 'what_if_meme.png';
        link.click();
      }
    };

    const displayImage = selectedImage || "https://images.unsplash.com/photo-1529778458719-9d6ef1629471?w=600&q=80";

    const textStyle = {
      textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 2px 0 0 #000, 0 -2px 0 #000, -2px 0 0 #000',
      fontFamily: 'Impact, sans-serif'
    };

    const memeText = `${topText} ... ${bottomText}`;

    return (
      <div className="space-y-4 animate-in fade-in duration-300">
        <h2 className="text-xl font-bold text-pink-400">Meme Generator</h2>
        
        <div className="space-y-2">
          <input type="text" placeholder="Top Text" maxLength={30} value={topText} onChange={(e) => setTopText(e.target.value.toUpperCase())} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-pink-500 uppercase" />
          <input type="text" placeholder="Bottom Text" maxLength={30} value={bottomText} onChange={(e) => setBottomText(e.target.value.toUpperCase())} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-pink-500 uppercase" />
          
          <div className="relative w-full bg-gray-800 border border-gray-700 rounded-lg p-3 flex justify-center hover:bg-gray-700 transition cursor-pointer group">
            <span className="text-pink-400 font-bold text-sm group-hover:text-pink-300">
              {selectedImage ? "Change Image" : "Upload Image"}
            </span>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          </div>
        </div>

        <div ref={memeRef} className="relative w-full aspect-square bg-gray-950 rounded-lg overflow-hidden flex flex-col items-center justify-between py-6 border border-gray-700 shadow-inner group">
          <img src={displayImage} alt="Meme Background" className="absolute inset-0 w-full h-full object-cover z-0 opacity-90 transition-opacity" crossOrigin="anonymous" />
          <h3 className="relative z-10 text-3xl md:text-5xl font-black text-white text-center px-4 w-full break-words tracking-wide leading-tight uppercase" style={textStyle}>{topText}</h3>
          <h3 className="relative z-10 text-3xl md:text-5xl font-black text-white text-center px-4 w-full break-words tracking-wide leading-tight uppercase" style={textStyle}>{bottomText}</h3>
        </div>

        <button onClick={downloadMeme} className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-3 rounded-lg transition shadow-lg shadow-pink-500/20">
          ⬇️ Download Meme Image
        </button>

        <ActionButtons text={memeText} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-12 px-4 font-sans relative">
      <div className="max-w-xl w-full">
        {/* Header & Tagline */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">/what_if Hub</h1>
          
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 shadow-lg mb-4">
            <p className="text-sm md:text-base text-gray-300 mb-3 uppercase tracking-wider font-bold">Join the chaos. Buy the token.</p>
            <p className="text-xs md:text-sm font-mono text-emerald-400 break-all bg-black p-3 rounded-lg border border-gray-800 shadow-inner">
              CA: F7A8URtVn5AvXcvKWQVKAtzMBqKVaBF22gxT2NcXpump
            </p>
          </div>
        </div>

        {/* Navigation Tabs - Now includes the Game! */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <button onClick={() => setActiveTab('game')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors flex-grow uppercase ${activeTab === 'game' ? 'bg-yellow-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>🎮 Game</button>
          <button onClick={() => setActiveTab('calculator')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors flex-grow ${activeTab === 'calculator' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>Regret Calc</button>
          <button onClick={() => setActiveTab('excuse')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors flex-grow ${activeTab === 'excuse' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>Excuses</button>
          <button onClick={() => setActiveTab('meme')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors flex-grow ${activeTab === 'meme' ? 'bg-pink-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>Meme Maker</button>
          <button onClick={() => setActiveTab('confession')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors flex-grow ${activeTab === 'confession' ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>Thoughts</button>
          <button onClick={() => setActiveTab('oracle')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors flex-grow ${activeTab === 'oracle' ? 'bg-orange-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>Oracle</button>
        </div>

        {/* Active Tab Content */}
        <div className="bg-gray-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-800 min-h-[400px]">
          {activeTab === 'game' && <MiniGame />}
          {activeTab === 'calculator' && <Calculator />}
          {activeTab === 'excuse' && <ExcuseGenerator />}
          {activeTab === 'meme' && <MemeGenerator />}
          {activeTab === 'confession' && <ConfessionBoard />}
          {activeTab === 'oracle' && <TimelineOracle />}
        </div>

        {/* --- LIVE CHART SECTION --- */}
        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-300 mb-4 flex items-center gap-2">
            <span className="animate-pulse h-2.5 w-2.5 bg-emerald-500 rounded-full"></span>
            Live /what_if Chart
          </h2>
          <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden border border-gray-800 bg-gray-950">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://dexscreener.com/solana/F7A8URtVn5AvXcvKWQVKAtzMBqKVaBF22gxT2NcXpump?embed=1&theme=dark" 
              frameBorder="0" 
              title="DexScreener Live Chart"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
}