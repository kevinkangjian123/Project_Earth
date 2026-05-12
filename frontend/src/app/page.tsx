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
  AlertTriangle,
  Globe,
  Send
} from "lucide-react";
import { FileUploader } from "@/components/FileUploader";
import { dict, Language } from "@/lib/i18n";

type Fact = { id: string; label: string; value: string; trend: 'up' | 'down' | 'neutral'; lineage: string; businessValue: string; };
type Metric = { id: string; name: string; type: 'active' | 'passive'; value: number; unit: string; description: string; isAnomaly?: boolean; lineage?: string };

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
  const [lang, setLang] = useState<Language>('zh');
  const t = dict[lang];

  const [hasUploaded, setHasUploaded] = useState(false);
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  
  const [agentMessages, setAgentMessages] = useState<{role: 'user'|'agent', content: string}[]>([]);
  const [agentInput, setAgentInput] = useState('');

  const handleAgentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentInput.trim()) return;

    setAgentMessages(prev => [...prev, { role: 'user', content: agentInput }]);
    setAgentInput('');

    setTimeout(() => {
      setAgentMessages(prev => [...prev, { role: 'agent', content: lang === 'zh' ? '目前系统处于沙盘演示模式，外部实时数据网关已被锁定。您的查询指令已记录，将在正式环境联调时执行。' : 'System is currently in Simulation Demo mode. External real-time data gateways are locked. Your query has been logged for execution.' }]);
    }, 1000);
  };
  
  const [spendDy, setSpendDy] = useState(0);
  const [spendXhs, setSpendXhs] = useState(0);
  const [discountJd, setDiscountJd] = useState(0);
  const [discountOff, setDiscountOff] = useState(0);

  const formatSliderValue = (val: number, isDiscount: boolean) => {
    if (val === 0) return lang === 'en' ? 'Baseline (0%)' : '维持现状 (0%)';
    if (val > 0) return lang === 'en' ? `+${val}%` : (isDiscount ? `加码 (+${val}%)` : `追加 (+${val}%)`);
    return lang === 'en' ? `${val}%` : (isDiscount ? `收缩 (${val}%)` : `削减 (${val}%)`);
  };
  
  const [pCompDy, setPCompDy] = useState(25);
  const [pMacroGdp, setPMacroGdp] = useState(2.1);
  const [pCatTmall, setPCatTmall] = useState(-4.5);

  const [isSimulating, setIsSimulating] = useState(false);
  const [hasSimulated, setHasSimulated] = useState(false);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setHasSimulated(true);
    }, 1500);
  };

  const facts: Fact[] = [
    { id: '1', label: 'GMV (YTD)', value: '$12.4M', trend: 'down', lineage: '[1] 财报行45', businessValue: '核心营收大盘，下降意味着市场份额被蚕食' },
    { id: '2', label: 'CAC', value: '$45.20', trend: 'up', lineage: '[2] 星图抓取', businessValue: '获客成本剧增，反映平台流量红利触顶' },
    { id: '3', label: 'Retention', value: '42%', trend: 'neutral', lineage: '[3] CRM系统', businessValue: '留存率停滞，线下专柜体验护城河正在失效' },
  ];

  const metrics: Metric[] = [
    { id: 'm1', name: t.m_spend_dy_name, type: 'active', value: spendDy, unit: 'k', description: t.m_spend_dy_desc },
    { id: 'm2', name: t.m_spend_xhs_name, type: 'active', value: spendXhs, unit: 'k', description: t.m_spend_xhs_desc },
    { id: 'm3', name: t.m_discount_jd_name, type: 'active', value: discountJd, unit: '%', description: t.m_discount_jd_desc },
    { id: 'm4', name: t.m_discount_off_name, type: 'active', value: discountOff, unit: '%', description: t.m_discount_off_desc },
    { id: 'p1', name: t.p_comp_dy_name, type: 'passive', value: pCompDy, unit: '%', description: t.p_comp_dy_desc, isAnomaly: true, lineage: '蝉妈妈大盘' },
    { id: 'p2', name: t.p_macro_gdp_name, type: 'passive', value: pMacroGdp, unit: '%', description: t.p_macro_gdp_desc, lineage: '国家统计局 Q3' },
    { id: 'p3', name: t.p_cat_tmall_name, type: 'passive', value: pCatTmall, unit: '%', description: t.p_cat_tmall_desc, lineage: '生意参谋指数' },
  ];

  return (
    <div className="min-h-screen flex bg-[var(--background)] text-[var(--foreground)] selection:bg-blue-100 selection:text-blue-900">
      
      <main className={`flex-1 transition-all duration-500 ease-in-out ${isAgentOpen ? 'mr-96' : 'mr-0'}`}>
        <div className="max-w-6xl mx-auto p-8 space-y-12">
          
          <header className="flex justify-between items-end border-b border-slate-200 pb-6">
            <div>
              <h1 className="text-3xl font-light tracking-tight text-slate-900">{t.headerTitle}</h1>
              <p className="text-slate-500 mt-2 text-sm">{t.headerSubtitle}</p>
            </div>
            <div className="flex space-x-6 text-sm text-slate-500 items-center">
              
              <button 
                onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
                className="flex items-center space-x-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-slate-700 font-medium border border-slate-200"
              >
                <Globe className="w-4 h-4 mr-1" />
                <span>{lang === 'en' ? 'EN' : '中文'}</span>
              </button>

              <span className="flex items-center"><Activity className="w-4 h-4 mr-1 text-green-500" /> {t.systemOnline}</span>
            </div>
          </header>

          <section className="space-y-4">
            <div className="flex items-center space-x-2 text-slate-800 font-medium">
              <UploadCloud className="w-5 h-5 text-blue-600" />
              <h2>{t.sec1Title}</h2>
            </div>
            
            {!hasUploaded ? (
              <FileUploader 
                lang={lang}
                onUploadSuccess={(data) => {
                  console.log("[UI] Received Facts from Engine:", data);
                  // Dynamic Data Binding: Inject baseline metrics extracted by Python into React State
                  if (data.initial_simulation_metrics) {
                    const baselines = data.initial_simulation_metrics;
                    if (baselines.spendDy !== undefined) setSpendDy(0);
                    if (baselines.spendXhs !== undefined) setSpendXhs(0);
                    if (baselines.discountJd !== undefined) setDiscountJd(0);
                    if (baselines.discountOff !== undefined) setDiscountOff(0);
                    if (baselines.p_comp_dy !== undefined) setPCompDy(baselines.p_comp_dy);
                    if (baselines.p_macro_gdp !== undefined) setPMacroGdp(baselines.p_macro_gdp);
                    if (baselines.p_cat_tmall !== undefined) setPCatTmall(baselines.p_cat_tmall);
                  }
                  setHasUploaded(true);
                }} 
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  {facts.map(fact => (
                    <Tooltip key={fact.id} text={fact.businessValue}>
                      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center group cursor-help transition-all hover:border-blue-300">
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium text-slate-500">{fact.label}</p>
                            <span className="text-[9px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded border border-slate-200">{fact.lineage}</span>
                          </div>
                          <h4 className="text-2xl font-semibold mt-1 text-slate-800">{fact.value}</h4>
                        </div>
                        <div className={`p-2 rounded-lg ${fact.trend === 'down' ? 'bg-red-50 text-red-600' : fact.trend === 'up' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-600'}`}>
                          {fact.trend === 'down' ? <AlertTriangle className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                        </div>
                      </div>
                    </Tooltip>
                  ))}
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                  className="lg:col-span-1"
                >
                  <FileUploader 
                    lang={lang}
                    compact={true}
                    onUploadSuccess={(data) => {
                      console.log("[UI] Additional data uploaded:", data);
                    }} 
                  />
                </motion.div>
              </div>
            )}
          </section>

          <section className={`space-y-4 transition-opacity duration-700 ${hasUploaded ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
            <div className="flex items-center space-x-2 text-slate-800 font-medium">
              <FileText className="w-5 h-5 text-blue-600" />
              <h2>{t.sec2Title}</h2>
            </div>
            
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 space-y-8">
              {/* Executive Summary */}
              <div className="border-l-4 border-blue-600 pl-4 py-1 bg-gradient-to-r from-blue-50 to-transparent">
                <h3 className="text-xl font-semibold text-slate-900">{t.reportAbstractTitle}</h3>
                <p className="text-slate-700 mt-2 font-medium">{t.reportAbstractBody}</p>
              </div>
              
              {/* Deep Analysis & Citations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-800 flex items-center"><Activity className="w-4 h-4 mr-2 text-blue-500" /> {t.reportAnalysisTitle}</h4>
                  <div className="space-y-4">
                    {t.reportAnalysisPoints.map((point: any, idx: number) => (
                      <div key={idx} className="space-y-1">
                        <h5 className="text-xs font-bold text-slate-800">{idx + 1}. {point.title}</h5>
                        <p className="text-slate-600 text-xs leading-relaxed">
                          {point.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-slate-800 flex items-center"><Info className="w-4 h-4 mr-2 text-purple-500" /> {t.reportSourcesTitle}</h4>
                  <ul className="text-xs text-slate-500 space-y-2 list-none">
                    <li>
                      <button onClick={() => setIsAgentOpen(true)} className="text-left hover:text-blue-600 transition-colors group flex items-start">
                        <span className="text-blue-500 mr-2 shrink-0">[1]</span>
                        <span className="group-hover:underline">Beaute Research Q4 Report (Verified)</span>
                      </button>
                    </li>
                    <li>
                      <button onClick={() => setIsAgentOpen(true)} className="text-left hover:text-blue-600 transition-colors group flex items-start">
                        <span className="text-blue-500 mr-2 shrink-0">[2]</span>
                        <span className="group-hover:underline">Scorecard: JD Promotional Data (Row 45)</span>
                      </button>
                    </li>
                    <li>
                      <button onClick={() => setIsAgentOpen(true)} className="text-left hover:text-blue-600 transition-colors group flex items-start">
                        <span className="text-blue-500 mr-2 shrink-0">[3]</span>
                        <span className="group-hover:underline">Scorecard: Offline CRM Export (Row 112)</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-500">
                  <strong className="text-slate-700">{t.factCheckStatus}</strong> {t.factCheckDesc}
                </p>
              </div>
            </div>
          </section>

          <section className={`space-y-4 pb-20 transition-opacity duration-700 delay-100 ${hasUploaded ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
            <div className="flex items-center space-x-2 text-slate-800 font-medium">
              <SlidersHorizontal className="w-5 h-5 text-blue-600" />
              <h2>{t.sec3Title}</h2>
            </div>

            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 flex items-start space-x-3 mb-6">
              <Bot className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-blue-900">{t.simBaselineTitle}</h4>
                <p className="text-xs text-blue-800 mt-1 leading-relaxed">{t.simBaselineDesc}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
                <h3 className="text-sm font-semibold text-slate-800 flex justify-between">
                  <span>{t.activeMetrics}</span>
                  <span className="text-xs font-normal text-slate-400">{t.controllable}</span>
                </h3>
                
                <div className="space-y-6">
                  {/* Douyin Spend */}
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-slate-600 font-medium">{t.m_spend_dy_name}</span>
                      <span className={`font-semibold ${spendDy === 0 ? 'text-slate-500' : spendDy > 0 ? 'text-blue-600' : 'text-red-500'}`}>
                        {formatSliderValue(spendDy, false)}
                      </span>
                    </div>
                    <input 
                      type="range" min="-50" max="50" step="5"
                      value={spendDy} onChange={(e) => setSpendDy(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                    />
                  </div>

                  {/* XHS Spend */}
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-slate-600 font-medium">{t.m_spend_xhs_name}</span>
                      <span className={`font-semibold ${spendXhs === 0 ? 'text-slate-500' : spendXhs > 0 ? 'text-blue-600' : 'text-red-500'}`}>
                        {formatSliderValue(spendXhs, false)}
                      </span>
                    </div>
                    <input 
                      type="range" min="-50" max="50" step="5"
                      value={spendXhs} onChange={(e) => setSpendXhs(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                    />
                  </div>
                  
                  {/* JD Discount */}
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-slate-600 font-medium">{t.m_discount_jd_name}</span>
                      <span className={`font-semibold ${discountJd === 0 ? 'text-slate-500' : discountJd > 0 ? 'text-blue-600' : 'text-red-500'}`}>
                        {formatSliderValue(discountJd, true)}
                      </span>
                    </div>
                    <input 
                      type="range" min="-20" max="20" step="1"
                      value={discountJd} onChange={(e) => setDiscountJd(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                    />
                  </div>

                  {/* Offline Discount */}
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-slate-600 font-medium">{t.m_discount_off_name}</span>
                      <span className={`font-semibold ${discountOff === 0 ? 'text-slate-500' : discountOff > 0 ? 'text-blue-600' : 'text-red-500'}`}>
                        {formatSliderValue(discountOff, true)}
                      </span>
                    </div>
                    <input 
                      type="range" min="-20" max="20" step="1"
                      value={discountOff} onChange={(e) => setDiscountOff(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl border border-slate-200 shadow-sm p-6 space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                  <Lock className="w-24 h-24" />
                </div>
                
                <h3 className="text-sm font-semibold text-slate-800 flex justify-between relative z-10">
                  <span>{t.passiveMetrics}</span>
                  <span className="text-xs font-normal text-slate-500 flex items-center"><Lock className="w-3 h-3 mr-1"/> {t.objective}</span>
                </h3>

                <div className="space-y-3 relative z-10">
                  {metrics.filter(m => m.type === 'passive').map(metric => (
                    <div key={metric.id} className="bg-white/60 p-3 rounded-lg border border-slate-200/60 flex justify-between items-center backdrop-blur-sm">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-2">
                            <p className="text-xs font-medium text-slate-700">{metric.name}</p>
                            {metric.lineage && (
                              <span className="text-[9px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded border border-slate-200">{metric.lineage}</span>
                            )}
                          </div>
                          {metric.isAnomaly && (
                            <button 
                              onClick={() => setIsAgentOpen(true)}
                              className="text-[10px] bg-blue-100 text-blue-700 hover:bg-blue-200 px-2 py-0.5 rounded-full flex items-center shadow-sm cursor-pointer transition-colors shrink-0"
                            >
                              <Bot className="w-3 h-3 mr-1" />
                              {lang === 'zh' ? '查竞品详情' : 'Ask Copilot'}
                            </button>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">{metric.description}</p>
                      </div>
                      <span className="text-sm font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded shrink-0">
                        {metric.value > 0 ? '+' : ''}{metric.value}{metric.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button 
                onClick={handleSimulate}
                disabled={isSimulating}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center shadow-md disabled:opacity-50"
              >
                {isSimulating ? <Activity className="w-4 h-4 mr-2 animate-spin" /> : <SlidersHorizontal className="w-4 h-4 mr-2" />}
                {isSimulating ? t.simSimulating : t.simConfirmBtn}
              </button>
            </div>

            {/* P&L Projected Impact */}
            <AnimatePresence>
              {hasSimulated && !isSimulating && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-8 space-y-6 overflow-hidden"
                >
                  <div className="flex items-center space-x-2 text-slate-800 font-semibold border-b border-slate-200 pb-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <h3>{t.simOutcomeTitle}</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                        <p className="text-xs text-green-700 font-medium">{t.simMetricGMV}</p>
                        <p className="text-2xl font-bold text-green-800 mt-1">+12.4%</p>
                     </div>
                     <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                        <p className="text-xs text-blue-700 font-medium">{t.simMetricROI}</p>
                        <p className="text-2xl font-bold text-blue-800 mt-1">1.8 <span className="text-blue-400 mx-1">→</span> 2.1</p>
                     </div>
                     <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                        <p className="text-xs text-orange-700 font-medium">{t.simMetricRisk}</p>
                        <p className="text-sm font-bold text-orange-800 mt-1">{lang === 'en' ? 'Offline Channel Conflict' : '线下渠道串货抗议'}</p>
                     </div>
                  </div>

                  <div className="bg-slate-900 text-white p-5 rounded-xl flex items-start space-x-4 shadow-lg shadow-slate-900/10">
                    <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">{t.projectedOutcome}</h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {t.projectedDesc.replace('{spendDy}', spendDy.toString()).replace('{discountJd}', discountJd.toString()).replace('{gdp}', pMacroGdp.toString())}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

        </div>
      </main>

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
                  <h3 className="text-sm font-semibold text-slate-800">{t.agentTitle}</h3>
                  <p className="text-[10px] text-slate-500">{t.contextAware}</p>
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
                <span dangerouslySetInnerHTML={{ __html: t.agentGreeting.replace('${spendDy}', spendDy.toString()) }} />
              </div>
              
              {agentMessages.map((msg, i) => (
                <div key={i} className={`flex items-start space-x-2 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {msg.role === 'user' ? (
                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                      <span className="text-[10px] text-white">U</span>
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-sm shadow-blue-600/20">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div className={`${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-50 border border-slate-100 text-slate-600'} p-3 rounded-lg text-xs leading-relaxed max-w-[85%]`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-white">
              <form className="relative flex items-center" onSubmit={handleAgentSubmit}>
                <input 
                  type="text" 
                  value={agentInput}
                  onChange={(e) => setAgentInput(e.target.value)}
                  placeholder={t.agentInputPlaceholder}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg pl-4 pr-10 py-2.5 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-500 transition-all"
                />
                <button 
                  type="submit" 
                  className="absolute right-2 p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

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
