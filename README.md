# Project MARS: Intelligence Engine (JTBD Radar v2)

Project MARS 是一款为 C-Level 高管打造的企业级、具备高度智能代理 (Agentic) 能力的市场战略沙盘。它将极具未来感的“科幻数据中心”前端界面与底层的强大物理模拟引擎相融合，通过处理海量用户生成内容 (UGC) 和复杂的蒙特卡洛非线性寻优，交付具备极强商业洞察与落地指导意义的战略建议。

## 🌟 核心架构突破 (Latest Architecture)

本项目采用云原生 Monorepo 架构，近期完成了极其重要的**“算力收口与商业机密防护”**升级。

### 1. 纯净前端 (Next.js Edge Renderer)
- **极简渲染层**：移除了所有带有商业机密（IP）的前端微积分计算，前端彻底脱敏，仅保留标准的四阶龙格-库塔 (RK4) 方程用于基础视觉曲线渲染。
- **防止逆向工程**：通过将核心逻辑收敛至后端，彻底阻断了竞争对手通过浏览器 DevTools 逆向窃取核心参数（如 HHI、KOL 权重）的可能。
- **技术栈**：Next.js 14 (App Router) + TailwindCSS + Framer Motion (微动效) + Recharts。

### 2. 高阶代理后端 (FastAPI + Python)
- **高管级战略顾问 (v12.1)**：大模型角色被深度重塑，全面屏弃科幻/军事词汇，采用极致克制、专业的商业咨询语境（如将 Tipping Threshold 翻译为“心智破圈阈值”）。
- **物理沙盘引擎 (MARS v9)**：后端运行复杂的数学模型计算动力势能、情感极性与垄断壁垒。新增 **势能穿透周期预估 (Estimated Tipping Cycle)**，精准预判击穿红海所需的时长（如“预计 5 天即可触达临界阈值”）。
- **Anti-Prompt-Injection (防黑客套话)**：在 System Prompt 顶层加装了高规格防火墙，任何企图让系统“忽略指令”或“打印设定”的攻击请求，都会被大模型冷酷切断并拒绝，保障核心 Prompt 不被窃取。
- **异步技能调度 (Semantic Router)**：极速并发调用 `DynamicGroundingSkill`、`KOLStrategySkill` 等子代理。

### 3. 数据湖底座 (SQLite Data Lakehouse)
- **稳健吞吐**：使用 `mars_silver_lake.db` 作为唯一清洗后的事实源，通过 WAL 模式支持高并发读写。

---

## 🧠 MARS Agent 核心战术能力

我们对 Agent 的认知逻辑进行了深度优化，它不再是一个简单的问答机器人，而是真正的“战略参谋”：

- **反陷阱提问 (Trap Handling)**：当用户提出诸如“帮我做一个旗舰机策略”这类宽泛的“陷阱问题”时，Semantic Router 会瞬间短路执行流，主动向高管反问（“您的预算是想以小博大还是正面强攻？主打场景是什么？”），拒绝生搬硬造的幻觉。
- **Platform-First 战术下钻**：强制大模型将预算严格按比例分配到【抖音】与【小红书】，并独立输出两端的挑战、内容特征与 KOL 选型。
- **真实原声倒逼 (Authentic Quotes)**：在输出 JTBD（焦糖布丁/用户任务）痛点时，必须援引底层数据库中 2-3 条“原汁原味的消费者吐槽/赞叹”，做到言之有物。
- **场景化沟通锚定 (Scene Anchors)**：废除“夜景强”这种干瘪卖点词汇，大模型被强制要求输出极具画面感的植入场景（例如：“在昏暗的 Livehouse 里，无需打光就能清晰拍出乐队主唱情绪的瞬间”）。

---

## 🕷️ 自动化数据管道 (Crawler Sandbox)

`experimental_crawler_sandbox` 包含一个高度弹性的反爬虫数据获取管道。
- **自动化编排**：通过 `start_all_crawlers.sh` 串行执行各行业的全量回填。
- **仿生防封**：内置熔断机制与仿生睡眠模型。
- **数据适配器 (`mc_to_mars_adapter.py`)**：清洗 JSONL 脏数据，提取品牌本体，并计算基础物理指标（Gravity Mass），最终入库“Silver Lakehouse”。

---

## 🚀 部署拓扑 (Zeabur Cloud)

系统专为 **Zeabur** 平台的零配置自动化部署而优化。

- **后端安全隔离**：核心算法运行在 Zeabur 的独立 Docker 容器内，物理隔离外部探针。
- **启动入口**：根目录下的 `main.py` 作为 FastAPI 的服务网关。
- **环境变量要求**：必须在平台上配置 `GEMINI_API_KEY`（大模型引擎驱动）以及 `PORT`（服务端口）。

## 🛠️ 本地开发指南 (Local Development)

### 环境要求
- Node.js (v18+)
- Python 3.11+

### 后端启动
1. 初始化虚拟环境: `python3 -m venv backend/venv`
2. 激活环境: `source backend/venv/bin/activate`
3. 安装依赖: `pip install -r requirements.txt`
4. 配置环境变量（需在根目录准备 `.env` 文件）。
5. 启动沙盘服务: `python main.py` (默认绑定 8000 端口)。

### 前端启动
1. 进入 `frontend` 目录。
2. 安装依赖: `npm install`
3. 启动开发服务器: `npm run dev`

---
*Powered by Deepmind Agentic Architecture & MARS Intelligence Engine.*
