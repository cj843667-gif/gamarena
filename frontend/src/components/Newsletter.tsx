"use client";

import React, { useState } from "react";

export default function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <div className="bg-accent rounded-2xl p-8 relative overflow-hidden">
      <div className="relative z-10 text-center">
        {!subscribed ? (
          <div>
            <h4 className="text-2xl font-black text-black uppercase leading-none mb-3 tracking-tight">
              Stay in the <span className="underline decoration-black/20">Loop</span>
            </h4>
            <p className="text-black/70 text-sm font-bold mb-6">
              Get the latest HTML5 guides and game gems delivered weekly.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com" 
                required
                className="w-full bg-black/10 border border-black/10 rounded-xl py-3 px-4 text-black text-sm focus:outline-none focus:border-black/30 placeholder:text-black/40 font-bold text-center"
              />
              <button 
                type="submit"
                className="w-full bg-black text-accent font-black uppercase py-3 rounded-xl transition-all hover:bg-gray-900 active:scale-[0.97]"
              >
                SUBSCRIBE NOW
              </button>
            </form>
          </div>
        ) : (
          <div className="py-4">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              ✓
            </div>
            <h4 className="text-xl font-black text-black uppercase tracking-tight mb-2">
              You're subscribed!
            </h4>
            <p className="text-black/70 text-sm font-bold max-w-[280px] mx-auto">
              We'll reach you in 48-72 hours with fresh gaming content.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
