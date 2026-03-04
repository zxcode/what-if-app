'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export default function WhatIfGameHub() {
  const [activeTab, setActiveTab] = useState('game');

  // --- Shared X Share Function ---
  const shareToX = (text: string) => {
    const encodedText = encodeURIComponent(`${text} \n\n🪙 @what_if_soI`);
    window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank');
  };

  // --- MINIGAME: DODGE THE RUG ---
  const MiniGame = () => {
    const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
    const [score, setScore] = useState(0);
    const [playerX, setPlayerX] = useState(50); // percentage 0-100
    const [items, setItems] = useState<{ id: number; x: number; y: number; type: 'token' | 'rug' }[]>([]);
    
    const requestRef = useRef<number>(0);
    const lastSpawnRef = useRef<number>(0);
    const speedRef = useRef(0.5); // Initial falling speed
    const frameRef = useRef(0);

    // Start the game
    const startGame = () => {
      setGameState('playing');
      setScore(0);
      setItems([]);
      setPlayerX(50);
      speedRef.current = 0.5;
    };

    // The Main Game Loop
    const gameLoop = useCallback(() => {
      if (gameState !== 'playing') return;

      frameRef.current += 1;

      // Increase difficulty over time
      if (frameRef.current % 600 === 0) {
        speedRef.current += 0.1;
      }

      setItems((prevItems) => {
        let newItems = prevItems
          .map((item) => ({ ...item, y: item.y + speedRef.current }))
          .filter((item) => item.y < 100); // Remove items that fall off screen

        // Spawn new items (every ~40 frames)
        if (frameRef.current - lastSpawnRef.current > 40) {
          lastSpawnRef.current = frameRef.current;
          const isRug = Math.random() > 0.7; // 30% chance to be a rug
          newItems.push({
            id: Math.random(),
            x: Math.floor(Math.random() * 90) + 5, // Random X position
            y: -10,
            type: isRug ? 'rug' : 'token',
          });
        }

        // Collision Detection
        newItems.forEach((item) => {
          // Check if item is at the bottom (y > 85) and player is nearby on X axis
          if (item.y > 85 && item.y < 95 && Math.abs(item.x - playerX) < 10) {
            if (item.type === 'rug') {
              setGameState('gameover');
            } else {
              setScore((s) => s + 100);
              item.y = 200; // Move offscreen to "destroy" it immediately
            }
          }
        });

        return newItems;
      });

      requestRef.current = requestAnimationFrame(gameLoop);
    }, [gameState, playerX]);

    // Hook to run the game loop
    useEffect(() => {
      if (gameState === 'playing') {
        requestRef.current = requestAnimationFrame(gameLoop);
      }
      return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
      };
    }, [gameState, gameLoop]);

    // Keyboard controls for Desktop
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (gameState !== 'playing') return;
        if (e.key === 'ArrowLeft') setPlayerX((prev) => Math.max(5, prev - 8));
        if (e.key === 'ArrowRight') setPlayerX((prev) => Math.min(95, prev + 8));
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState]);

    // Mobile touch controls (tapping left/right sides of the game screen)
    const handleTouch = (e: React.MouseEvent | React.TouchEvent, direction: 'left' | 'right') => {
      e.preventDefault();
      if (gameState !== 'playing') return;
      if (direction === 'left') setPlayerX((prev) => Math.max(5, prev - 15));
      if (direction === 'right') setPlayerX((prev) => Math.min(95, prev + 15));
    };

    // Generate roast based on score
    const getRoast = () => {
      if (score === 0) return "/what_if you didn't instantly buy the top and get rugged on block zero?";
      if (score < 1000) return `/what_if you held longer? You secured a $${score}k Market Cap before panicking.`;
      if (score < 3000) return `Not bad. /what_if you pushed it further? You reached a $${score}k Market Cap!`;
      return `Legendary. /what_if you actually traded this well in real life? $${score}k Market Cap secured!`;
    };

    return (
      <div className="space-y-4 animate-in fade-in duration-300">
        <h2 className="text-xl font-bold text-yellow-400 text-center uppercase tracking-widest">Dodge the Rug</h2>
        
        {/* Game Window */}
        <div className="relative w-full h-[400px] bg-gray-950 border-2 border-gray-700 rounded-xl overflow-hidden shadow-inner touch-none select-none">
          
          {/* Active Gameplay */}
          {gameState === 'playing' && (
            <>
              {/* Score Display */}
              <div className="absolute top-4 left-4 z-10 font-mono text-emerald-400 font-bold text-xl drop-shadow-md">
                MCap: ${score}k
              </div>

              {/* Falling Items */}
              {items.map((item) => (
                <div
                  key={item.id}
                  className="absolute text-3xl transition-transform"
                  style={{ left: `${item.x}%`, top: `${item.y}%`, transform: 'translateX(-50%)' }}
                >
                  {item.type === 'token' ? '🪙' : '📉'}
                </div>
              ))}

              {/* Player Character (Diamond Hands) */}
              <div
                className="absolute bottom-4 text-4xl transition-all duration-75 ease-out"
                style={{ left: `${playerX}%`, transform: 'translateX(-50%)' }}
              >
                💎
              </div>

              {/* Invisible touch zones for mobile */}
              <div className="absolute inset-y-0 left-0 w-1/2 z-20" onTouchStart={(e) => handleTouch(e, 'left')} onMouseDown={(e) => handleTouch(e, 'left')} />
              <div className="absolute inset-y-0 right-0 w-1/2 z-20" onTouchStart={(e) => handleTouch(e, 'right')} onMouseDown={(e) => handleTouch(e, 'right')} />
            </>
          )}

          {/* Start Screen */}
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

          {/* Game Over Screen */}
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

  // --- App 2: Regret Calculator (Keeping one utility app for flavor) ---
  const Calculator = () => {
    const [amount, setAmount] = useState('');
    const [result, setResult] = useState('');

    const calculate = () => {
      if (!amount) return;
      const scenarios = [
        "You'd be sitting on a superyacht right now, aggressively providing concentrated liquidity.",
        "You'd have enough capital to single-handedly sweep the floor of your favorite NFT collection.",
        "Instead of agonizing over the price of groceries, you would be negotiating the purchase of a mid-sized European castle."
      ];
      const random = scenarios[Math.floor(Math.random() * scenarios.length)];
      setResult(`/what_if I didn't sell my ${amount} /what_if early? ${random}`);
    };

    return (
      <div className="space-y-4 animate-in fade-in duration-300">
        <h2 className="text-xl font-bold text-emerald-400">The Degen Regret Calculator</h2>
        <div className="flex gap-2">
          <input type="number" placeholder="Amount of tokens" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500" />
        </div>
        <button onClick={calculate} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition">Calculate Regret</button>
        {result && (
          <div className="mt-4 space-y-2">
            <p className="p-4 bg-gray-800 rounded-lg border-l-4 border-emerald-500 leading-relaxed text-sm md:text-base">{result}</p>
            <button onClick={() => shareToX(result)} className="w-full bg-black hover:bg-gray-900 border border-gray-700 py-3 rounded-lg font-bold transition flex justify-center items-center">Post to X</button>
          </div>
        )}
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
            <p className="text-xs md:text-sm font-mono text-emerald-400 break-all bg-black p-3 rounded-lg border border-gray-800 shadow-inner select-all">
              CA: F7A8URtVn5AvXcvKWQVKAtzMBqKVaBF22gxT2NcXpump
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <button onClick={() => setActiveTab('game')} className={`px-6 py-3 rounded-lg text-sm font-bold transition-colors flex-grow uppercase tracking-wide ${activeTab === 'game' ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-500/20' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>🎮 Play Mini-Game</button>
          <button onClick={() => setActiveTab('calculator')} className={`px-6 py-3 rounded-lg text-sm font-bold transition-colors flex-grow uppercase tracking-wide ${activeTab === 'calculator' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>🧮 Calculator</button>
        </div>

        {/* Active Tab Content */}
        <div className="bg-gray-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-800 min-h-[450px]">
          {activeTab === 'game' && <MiniGame />}
          {activeTab === 'calculator' && <Calculator />}
        </div>
      </div>
    </div>
  );
}