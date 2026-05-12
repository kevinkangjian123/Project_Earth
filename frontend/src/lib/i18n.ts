// Strict Bilingual Dictionary (Executive War Room Standard)
export type Language = 'en' | 'zh';

export const dict = {
  en: {
    headerTitle: 'GM ScoreCard Rebuild',
    headerSubtitle: 'Automated business health diagnostic and strategy simulator.',
    systemOnline: 'System Online',
    sec1Title: 'Data Lake & Inspection',
    uploadTitle: 'Upload Additional Data',
    uploadDesc: 'Drop your CRM, Media, or Financial data here to enrich the diagnostic context.',
    browseFiles: 'Browse Files',
    computing: 'Computing Diagnostics...',
    computingDesc: 'Running SHA-256 edge verification and invoking Python Engine...',
    sec2Title: 'Diagnostic Research Report',
    
    // Diagnostic Report Sections
    reportAbstractTitle: 'Executive Summary',
    reportAbstractBody: 'Quarterly revenue remains stable, but overall profitability has experienced an unhealthy contraction. System diagnostics indicate this is not primarily driven by macroeconomic factors, but rather by a misalignment between "acquisition spending" and "retention logic". Currently, aggressive online promotional discounts are driving short-term volume at the unintended expense of high-margin offline repeat customers. Recommendation: Rebalance cross-channel resource allocation and halt internal price cannibalization.',
    reportAnalysisTitle: 'Attribution Analysis',
    reportAnalysisPoints: [
      {
        title: '1. Where did the profit go? (Online Discounting)',
        desc: 'Logic & Data: The system tracked a massive 15% increase in eCommerce promotional discounts [2]. While this heavy subsidy drove top-line sales volume, it severely compressed the gross margin per order, acting as the primary leak for profitability.'
      },
      {
        title: '2. Why did offline retention drop? (Channel Cannibalization)',
        desc: 'Logic & Data: Aggressive online discounting inadvertently broke the omni-channel pricing structure. Cross-referencing CRM retention data [1] shows that high-value offline customers discovered the online price gap and shifted their purchases to eCommerce. This represents severe "channel cannibalization"—we are not acquiring net-new customers, but rather converting high-margin existing customers into low-margin ones.'
      },
      {
        title: '3. Why is media acquisition failing? (CAC Ceiling)',
        desc: 'Logic & Data: Why not just buy more traffic to offset the margin loss? Because external traffic has become prohibitively expensive. Authoritative market reports [3] confirm that bidding costs for Douyin\'s core audience have hit a historical ceiling. Broad-audience media buying is no longer economically viable under the current unit economics.'
      }
    ],
    reportRecommendationTitle: 'Actionable Strategic Recommendation',
    reportRecommendationBody: 'Based on the diagnostic data, the system recommends prioritizing the <strong>alleviation of internal channel cannibalization</strong>. To protect offline profitability, you may consider moderately reducing eCommerce discount rates (e.g., capping near 10%). Concurrently, we suggest reallocating the freed budget toward top-of-funnel social seeding platforms to replenish customer acquisition. Please use the [Strategic Simulator] below to adjust these levers and project the P&L impact of various resource allocation scenarios.',
    reportEvidenceTitle: 'Data Evidence',
    reportSourcesTitle: 'External Lineage',

    factCheckStatus: 'Data Lineage Trace:',
    factCheckDesc: '100% grounded. All conclusions trace back to the uploaded data or certified external think tanks. XML System Harness prevents hallucination.',
    
    sec3Title: 'Strategic Simulator',
    simBaselineTitle: 'AI Baseline Recommendation',
    simBaselineDesc: 'Before adjusting manually, the AI recommends: Immediately reduce eCommerce discount rates below 10%, and reallocate freed budget to Top-of-Funnel social seeding to halt channel cannibalization.',
    simConfirmBtn: 'Execute Full Simulation',
    simSimulating: 'Building Financial Projection Model...',
    simOutcomeTitle: 'Projected Financial Impact',
    simMetricGMV: 'Recovered GMV',
    simMetricROI: 'Blended ROI Shift',
    simMetricRisk: 'Side Effect Risk',

    activeMetrics: 'Active Metrics',
    controllable: 'Controllable',
    passiveMetrics: 'Passive Metrics',
    objective: 'Objective',
    projectedOutcome: 'Grounded Simulation Rationale',
    projectedDesc: 'By reducing JD discount depth, the system calculates a recovery of $1.5M in subsidy margin [1]. Reinvesting this margin into Douyin at your specified index (+{spendDy}%) yields an expected conversion rate of 1.2% based on historical A1-A3 engagement [2]. Factoring in a {gdp}% macroeconomic constraint, this structural pivot is projected to generate a net GMV recovery of 12.4% within 30 days. However, algorithms warn of high friction from offline distributors adapting to the new price parity.',
    agentTitle: 'ScoreCard Copilot',
    contextAware: 'Context-Aware',
    agentGreeting: 'I am actively observing the Dashboard. I see you have adjusted the Douyin Spend index. Based on the diagnostic facts, I suggest reviewing the offline friction before confirming this action. How can I assist you further?',
    agentInputPlaceholder: 'Ask the Copilot about the data...',
    m_spend_dy_name: 'Douyin Budget Shift',
    m_spend_dy_desc: 'Douyin traffic acquisition allocation.',
    m_spend_xhs_name: 'Xiaohongshu Budget Shift',
    m_spend_xhs_desc: 'KOL seeding & PR budget allocation.',
    m_discount_jd_name: 'JD Discount Depth',
    m_discount_jd_desc: 'Direct price subsidy adjustment for JD.',
    m_discount_off_name: 'Offline Discount Depth',
    m_discount_off_desc: 'Physical counter promotional adjustment.',
    p_comp_dy_name: 'Douyin Competitor Traffic',
    p_comp_dy_desc: 'Competitor A1-A3 audience acquisition rate.',
    p_macro_gdp_name: 'Macro Economy',
    p_macro_gdp_desc: 'Expected GDP growth (Objective).',
    p_cat_tmall_name: 'Tmall Category Trend',
    p_cat_tmall_desc: 'Overall search volume trend for the category.'
  },
  zh: {
    headerTitle: 'GM ScoreCard Rebuild',
    headerSubtitle: '一键体检与业务增长策略推演系统',
    systemOnline: '系统在线',
    sec1Title: '数据湖与检查',
    uploadTitle: '追加上传数据',
    uploadDesc: '将您的 CRM、媒介投放排期或财务 Excel 拖拽至此，持续丰富系统的诊断上下文。',
    browseFiles: '浏览文件',
    computing: '正在分析诊断指标...',
    computingDesc: '正在进行边缘侧 SHA-256 校验并唤起 Python 解析引擎...',
    sec2Title: '深度诊断研报',

    // Diagnostic Report Sections
    reportAbstractTitle: '核心摘要 (Executive Summary)',
    reportAbstractBody: '本季度营收大盘保持稳定，但整体利润率出现了不健康的收缩。经系统多维测算，这并非受限于外部宏观大盘（GDP 预期仍有微增），而是因为我们的“拉新预算”与“老客复购”出现了错位。目前，大量营销弹药集中在了线上电商的打折促销上，这虽换取了短期单量，却意外牺牲了线下门店的高利润老客户（复购率明显下跌）。系统建议：需立即重新平衡全渠道的资源投放，叫停内部渠道的价格内耗。',
    reportAnalysisTitle: '异动归因拆解 (Attribution Analysis)',
    reportAnalysisPoints: [
      {
        title: '1. 利润去哪儿了？（线上高额补贴透支利润）',
        desc: '逻辑与数据：系统追踪到我们在二季度末大幅提高了电商大促的折扣力度（让利空间追加约 15% [2]）。这部分重金砸进去的“价格补贴”，虽然换来了总销量的繁荣，但单笔订单的毛利空间被极度压缩，成了利润流失的第一道缺口。'
      },
      {
        title: '2. 为什么线下复购会跌？（严重的“渠道互搏”）',
        desc: '逻辑与数据：线上的激进让利，无意中击穿了全盘的价格体系。CRM 会员库留存数据 [1] 显示，线下专柜的高净值老客户发现了线上的巨大价差，导致大量原本会在线下原价复购的客人，转移到了线上“薅羊毛”。这属于典型的“渠道相食”——并没有带来真正的新客，只是把高利润客户洗成了低利润客户。'
      },
      {
        title: '3. 为什么外部买量不管用了？（公域流量遭遇天花板）',
        desc: '逻辑与数据：既然利润下降，为何不去买新流量补位？因为买不动了。外部权威研报指出，抖音核心目标人群的竞价获客成本已触及历史高位 [3]。单纯靠砸钱买泛流量的粗放策略，在当前的经济账上已经彻底算不平了，必须转向精细化的客流运营。'
      }
    ],
    reportRecommendationTitle: '总控战略建议 (Actionable Recommendation)',
    reportRecommendationBody: '基于上述诊断，系统建议优先考虑<strong>缓解内部渠道的价格内耗</strong>。为保护线下基本盘的盈利能力，您可以尝试适度收缩线上电商的折扣力度（例如控制在 10% 左右）。同时，对于由此释放出的营销预算，建议向社交种草平台的顶部漏斗倾斜，以重新进行流量蓄水。您可以直接在下方的【战略推演模拟器】中拉动滑块，自主预演不同资源配置方案对最终利润大盘的影响。',
    reportEvidenceTitle: '数据佐证 (Data Evidence)',
    reportSourcesTitle: '外部智库与数据血缘 (External Lineage)',

    factCheckStatus: '数据血缘溯源状态：',
    factCheckDesc: '100% 事实锚定。所有结论均可精确追溯至上传的原始 Excel 数据行或认证第三方智库。系统已成功拦截大模型编造外部信息的企图。',
    
    sec3Title: '战略推演模拟器',
    simBaselineTitle: 'AI 破局基准线 (Baseline Recommendation)',
    simBaselineDesc: '在您进行自主调优前，战略中枢建议：立刻将京东等核心电商的补贴折扣率控制在 10% 以内，并将由此释放的预算按 3:1 比例紧急转移至小红书与抖音的种草层，以强行终止当前的渠道相食循环。',
    simConfirmBtn: '执行全盘推演',
    simSimulating: '正在构建财务预测模型...',
    simOutcomeTitle: 'P&L 财务级投影结果 (Projected Financial Impact)',
    simMetricGMV: 'GMV 修复预测',
    simMetricROI: '综合 ROI 变动',
    simMetricRisk: '潜在副作用风险',

    activeMetrics: '主动干预指标',
    controllable: '可调配战略资源',
    passiveMetrics: '被动客观环境',
    objective: '不可干预的外部约束',
    projectedOutcome: '推演链路与因果论证',
    projectedDesc: '根据您的沙盘调整，系统测算如下：因收缩京东折扣力度，预计将在 15 天内释放约 150 万的补贴利润池 [1]。我们将这笔资金以 {spendDy}% 的增量杠杆投入抖音星图。基于 A1-A3 人群的历史流转漏斗 [2]，预计转化率可稳定在 1.2%。在宏观 GDP 增速 {gdp}% 的客观约束下，这套资金腾挪策略预计能在 30 天内带来 12.4% 的 GMV 净修复。但系统发出最高级红色预警：因线上价格体系的剧变，线下核心经销商极可能在首周爆发串货抗议。',
    agentTitle: 'ScoreCard 决策助理',
    contextAware: '全局上下文感知',
    agentGreeting: '您好，我正在实时监控您的沙盘操作。发现竞品在抖音的流量拦截异常凶猛 [↑25%]，需要我帮您调取星图数据，深扒一下具体是哪家竞品在截流吗？',
    agentInputPlaceholder: '向助理下达查数据的指令...',
    m_spend_dy_name: '抖音预算调整幅度',
    m_spend_dy_desc: '用于抖音生态内的流量获取投入增减比例',
    m_spend_xhs_name: '小红书预算调整幅度',
    m_spend_xhs_desc: '用于小红书 KOL 矩阵的心智渗透增减比例',
    m_discount_jd_name: '京东补贴加码/收缩',
    m_discount_jd_desc: '针对京东渠道的直接价格让步比例',
    m_discount_off_name: '线下促销加码/收缩',
    m_discount_off_desc: '实体门店的会员折让与满减比例',
    p_comp_dy_name: '竞品抖音人群渗透指数',
    p_comp_dy_desc: '核心竞品在抖音抢占的A1-A3人群规模',
    p_macro_gdp_name: '宏观经济大盘',
    p_macro_gdp_desc: 'GDP 预期增速 (客观决定，不可干预)',
    p_cat_tmall_name: '天猫类目搜索指数',
    p_cat_tmall_desc: '天猫该类目的整体搜索与成交大盘走向'
  }
};
