"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UploadCloud, 
  Activity, 
  FileText, 
  SlidersHorizontal, 
  Bot, 
  Lock,
  ChevronRight,
  Info,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { FileUploader } from "@/components/FileUploader";

// --- Mock Data Types ---
type Fact = { id: string; label: string; value: string; trend: 'up' | 'down' | 'neutral' };
type Metric = { id: string; name: string; type: 'active' | 'passive'; value: number; unit: string; description: string };

// --- UI Components ---

// 1. Tooltip Wrapper (for professional term explanations)
const Tooltip = ({ children, text }: { children: React.ReactNode, text: string }) => (
  <div className="group relative inline-block">
    {children}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden w-max max-w-xs group-hover:block bg-slate-800 text-white text-xs p-2 rounded shadow-lg z-50">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
    </div>
  </div>
);

export default function Dashboard() {
  // State
  const [hasUploaded, setHasUploaded] = useState(false);
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  
  // Simulator State (Active Metrics)
  const [marketingSpend, setMarketingSpend] = useState(50);
  const [discountRate, setDiscountRate] = useState(15);

  // Mock Facts (Top Tier)
  const facts: Fact[] = [
    { id: '1', label: 'GMV (YTD)', value: '$12.4M', trend: 'down' },
    { id: '2', label: 'CAC', value: '$45.20', trend: 'up' },
    { id: '3', label: 'Retention', value: '42%', trend: 'neutral' },
  ];

  // Mock Simulator Metrics (Bottom Tier)
  const metrics: Metric[] = [
    { id: 'm1', name: 'Marketing Spend', type: 'active', value: marketingSpend, unit: 'k', description: '可人为调控的市场投放预算' },
    { id: 'm2', name: 'Discount Rate', type: 'active', value: discountRate, unit: '%', description: '全渠道平均价格折扣率' },
    { id: 'm3', name: 'Macro Economy', type: 'passive', value: 2.1, unit: '%', description: 'GDP 预期增速 (客观决定，不可干预)' },
    { id: 'm4', name: 'Competitor Traffic', type: 'passive', value: +15, unit: '%', description: '竞品自然流量涌入 (客观决定，不可干预)' },
  ];

  return (
    <div className="min-h-screen flex bg-[var(--background)] text-[var(--foreground)] selection:bg-blue-100 selection:text-blue-900">
      
      {/* Main Dashboard Area */}
      <main className={`flex-1 transition-all duration-500 ease-in-out ${isAgentOpen ? 'mr-96' : 'mr-0'}`}>
        <div className="max-w-6xl mx-auto p-8 space-y-12">
          
          {/* Header */}
          <header className="flex justify-between items-end border-b border-slate-200 pb-6">
            <div>
              <h1 className="text-3xl font-light tracking-tight text-slate-900">MARS Strategic Engine</h1>
              <p className="text-slate-500 mt-2 text-sm">Clinical-grade business digital twin & diagnostic co-pilot.</p>
            </div>
            <div className="flex space-x-3 text-sm text-slate-500">
              <span className="flex items-center"><Activity className="w-4 h-4 mr-1 text-green-500" /> System Online</span>
            </div>
          </header>

          {/* TIER 1: Upload & Fact Check (体检表) */}
          <section className="space-y-4">
            <div className="flex items-center space-x-2 text-slate-800 font-medium">
              <UploadCloud className="w-5 h-5 text-blue-600" />
              <h2>Tier 1: Data Ingestion & Facts</h2>
            </div>
            
            {!hasUploaded ? (
              <FileUploader onUploadSuccess={(data) => {
                console.log("[UI] Received Facts from Engine:", data);
                // Here we would dynamically update the `facts` state. 
                // For MVP testing, we'll just trigger the UI transition.
                setHasUploaded(true);
              }} />
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {facts.map(fact => (
                  <div key={fact.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center group">
                    <div>
                      <p className="text-sm font-medium text-slate-500">{fact.label}</p>
                      <h4 className="text-2xl font-semibold mt-1 text-slate-800">{fact.value}</h4>
                    </div>
                    <div className={`p-2 rounded-lg ${fact.trend === 'down' ? 'bg-red-50 text-red-600' : fact.trend === 'up' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-600'}`}>
                      {fact.trend === 'down' ? <AlertTriangle className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </section>

          {/* TIER 2: Diagnostic Report (确诊区) */}
          <section className={`space-y-4 transition-opacity duration-700 ${hasUploaded ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
            <div className="flex items-center space-x-2 text-slate-800 font-medium">
              <FileText className="w-5 h-5 text-blue-600" />
              <h2>Tier 2: Executive Diagnostic Report</h2>
            </div>
            
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 space-y-6">
              <div className="border-l-4 border-blue-600 pl-4 py-1 bg-gradient-to-r from-blue-50 to-transparent">
                <h3 className="text-xl font-semibold text-slate-900">BLUF: Profitability Decay Driven by Friction</h3>
              </div>
              
              <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed">
                <p>
                  Based on the physical <Tooltip text="P=M*A. A physics-based method to filter out noise and find the root cause."><span className="underline decoration-dotted cursor-help text-slate-800 font-medium">kinematic momentum collapse</span></Tooltip> of the uploaded Scorecard, the system <strong>recommends</strong> shifting focus from generic traffic acquisition to reducing checkout friction. 
                </p>
                <p>
                  The data strongly suggests that the recent 70% drop in ROI is not an external market artifact, but rather an internal structural issue. The <Tooltip text="A measure of resistance in the customer journey"><span className="underline decoration-dotted cursor-help text-slate-800 font-medium">Friction Coefficient</span></Tooltip> at the payment gateway has increased by 0.4, causing high-momentum drop-offs.
                </p>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-500">
                  <strong className="text-slate-700">Fact-Check Status:</strong> 100% grounded. All conclusions trace back to the Ephemeral Fact Cards above. XML System Harness actively prevented hallucination of external competitor actions.
                </p>
              </div>
            </div>
          </section>

          {/* TIER 3: Strategic Simulator (战略模拟器) */}
          <section className={`space-y-4 pb-20 transition-opacity duration-700 delay-100 ${hasUploaded ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
            <div className="flex items-center space-x-2 text-slate-800 font-medium">
              <SlidersHorizontal className="w-5 h-5 text-blue-600" />
              <h2>Tier 3: Strategic Simulator</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Active Metrics */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
                <h3 className="text-sm font-semibold text-slate-800 flex justify-between">
                  <span>Active Metrics</span>
                  <span className="text-xs font-normal text-slate-400">Controllable</span>
                </h3>
                
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-slate-600 font-medium">Marketing Spend</span>
                      <span className="text-blue-600 font-semibold">${marketingSpend}k</span>
                    </div>
                    <input 
                      type="range" min="10" max="100" 
                      value={marketingSpend} onChange={(e) => setMarketingSpend(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-slate-600 font-medium">Discount Rate</span>
                      <span className="text-blue-600 font-semibold">{discountRate}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="40" 
                      value={discountRate} onChange={(e) => setDiscountRate(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                    />
                  </div>
                </div>
              </div>

              {/* Passive Metrics */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 shadow-sm p-6 space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                  <Lock className="w-24 h-24" />
                </div>
                
                <h3 className="text-sm font-semibold text-slate-800 flex justify-between relative z-10">
                  <span>Passive Metrics</span>
                  <span className="text-xs font-normal text-slate-500 flex items-center"><Lock className="w-3 h-3 mr-1"/> Objective</span>
                </h3>

                <div className="space-y-3 relative z-10">
                  {metrics.filter(m => m.type === 'passive').map(metric => (
                    <div key={metric.id} className="bg-white/60 p-3 rounded-lg border border-slate-200/60 flex justify-between items-center backdrop-blur-sm">
                      <div>
                        <p className="text-xs font-medium text-slate-700">{metric.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{metric.description}</p>
                      </div>
                      <span className="text-sm font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded">
                        {metric.value > 0 ? '+' : ''}{metric.value}{metric.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Simulation Result */}
            <div className="bg-slate-900 text-white p-5 rounded-xl flex items-start space-x-4 shadow-lg shadow-slate-900/10">
              <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium">Projected Outcome</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Adjusting Marketing Spend to ${marketingSpend}k while Discount Rate sits at {discountRate}%, under the constraint of a {metrics[2].value}% GDP growth, is <strong>projected</strong> to yield a 12% recovery in GMV over 30 days. We <strong>recommend</strong> monitoring the competitor traffic closely as a leading indicator.
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* RIGHT PANEL: Agent Copilot */}
      <AnimatePresence>
        {isAgentOpen && (
          <motion.aside 
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-96 bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col"
          >
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 backdrop-blur-md">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/20">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">MARS Copilot</h3>
                  <p className="text-[10px] text-slate-500">Context-Aware</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAgentOpen(false)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-xs text-slate-600 leading-relaxed relative">
                <div className="absolute -left-1 top-4 w-2 h-2 rounded-full bg-blue-500" />
                I am actively observing the Dashboard. I see you have adjusted the Marketing Spend to <strong>${marketingSpend}k</strong>. 
                Based on the diagnostic facts, I <strong>suggest</strong> reviewing the CAC metric before confirming this action. How can I assist you further?
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-white">
              <input 
                type="text" 
                placeholder="Ask MARS about the data..." 
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-500 transition-all"
              />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Floating Agent Toggle */}
      {!isAgentOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAgentOpen(true)}
          className="fixed bottom-8 right-8 w-14 h-14 bg-slate-900 text-white rounded-full shadow-xl shadow-slate-900/20 flex items-center justify-center hover:bg-slate-800 transition-colors z-40 group"
        >
          <Bot className="w-6 h-6 group-hover:text-blue-400 transition-colors" />
        </motion.button>
      )}
      
    </div>
  );
}
