"use client";

export const dynamic = 'force-dynamic';

import React, { useState } from "react";

export default function ContactPage() {
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSent(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase mb-6" style={{ color: 'var(--text-primary)' }}>
          Get in <span className="text-[var(--accent)]">Touch</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)' }} className="font-medium text-lg max-w-2xl mx-auto">Have a suggestion, bug report, or DMCA request? Let us know and we'll get back to you.</p>
      </div>

      <div className="max-w-3xl mx-auto">
        {!isSent ? (
          <div className="card-animate rounded-2xl p-8 md:p-12 shadow-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Name</label>
                  <input 
                     type="text" 
                     required
                     value={formData.name}
                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                     className="w-full rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 transition-all font-bold"
                     style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                     placeholder="Your Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Email</label>
                  <input 
                     type="email" 
                     required
                     value={formData.email}
                     onChange={(e) => setFormData({...formData, email: e.target.value})}
                     className="w-full rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 transition-all font-bold"
                     style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                     placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Subject</label>
                <select 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 transition-all font-bold appearance-none cursor-pointer"
                  style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                >
                   <option>General Inquiry</option>
                   <option>Bug Report</option>
                   <option>Game Submission</option>
                   <option>DMCA Request</option>
                   <option>Advertising</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Message</label>
                <textarea 
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 transition-all font-bold resize-none"
                  style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                  placeholder="What's on your mind?"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-black font-black uppercase py-4 rounded-xl transition-all active:scale-[0.98] text-base tracking-wider"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        ) : (
          <div className="card-animate rounded-2xl p-12 text-center shadow-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div className="w-20 h-20 bg-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-8 text-3xl">
              ✓
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
              Message Sent!
            </h2>
            <p className="text-base font-bold max-w-md mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Your inquiry has been received. We'll reach you in <span style={{ color: 'var(--text-primary)' }}>48-72 hours</span>.
            </p>
            <button 
              onClick={() => setIsSent(false)}
              className="mt-8 text-[var(--accent)] uppercase font-bold text-xs tracking-wider hover:underline transition-colors"
            >
              SEND ANOTHER MESSAGE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
