import time

print("\n" + "="*60)
print("🧬 MARS ENGINE: STEP 6 SYSTEM-LEVEL I/O & RL MUTATION")
print("="*60 + "\n")

# --- Initial State (T0) ---
print(">>> [T0 State] Loading Ontology Link Weights...")
ontology_links = {
    "JD_FORCE_to_OFFLINE_FRIC": {"weight": 1.0, "confidence": "Medium"}
}
print(f"    [Graph] Link [JD_FORCE_001 -> OFFLINE_FRIC_001] | Current Weight: {ontology_links['JD_FORCE_to_OFFLINE_FRIC']['weight']}")

print("\n>>> [T0 Action] System Prescribed: 'Cut JD Discount by 15%'")
print("    [Action] Entering 30-Day Silent Observation Period...\n")

time.sleep(1.5)
print("..." * 15)
print("              ( 30 DAYS LATER - T+1 CYCLE )")
print("..." * 15 + "\n")

# --- System-Level I/O ---
print(">>> [T+1 Input] Ingesting New Scorecard Data (System-Level I/O)...")

def simulate_rl_loop(scenario_name, offline_cvr_change):
    print(f"\n--- 🔄 Running {scenario_name} ---")
    print(f"    [T+1 Data] Offline CVR Change: {offline_cvr_change}")
    
    current_weight = ontology_links["JD_FORCE_to_OFFLINE_FRIC"]["weight"]
    
    # RL Reward/Punishment Logic
    if "+" in offline_cvr_change:
        print("    [Diagnosis Check] Offline traffic recovered. T0 Prescription was CORRECT.")
        print("    [RL Action] Triggering Positive REWARD (+0.5).")
        new_weight = current_weight + 0.5
        confidence = "High"
    else:
        print("    [Diagnosis Check] Offline traffic still bleeding. T0 Prescription FAILED (Misdiagnosis).")
        print("    [RL Action] Triggering Negative PUNISHMENT (-0.8).")
        new_weight = current_weight - 0.8
        confidence = "Low (Link almost severed)"
        
    print(f"    [O] System-Level Output: Ontology Mutated!")
    print(f"    [Graph] New Link Weight: {new_weight:.1f} | Confidence: {confidence}")
    
    if new_weight < 0.5:
        print("    [Alert] Link weight critically low. Step 2.5 Engine will ignore this path next month and search for new hidden root causes (e.g., New Competitor).")

# Simulate both possible futures to prove the engine learns
time.sleep(1)
simulate_rl_loop("Scenario A (The Cure Worked)", "+12% (Recovered)")

time.sleep(1)
simulate_rl_loop("Scenario B (The Cure Failed - Misdiagnosis)", "-5% (Still Bleeding)")

print("\n[SUCCESS] Step 6 I/O Loop Complete. The Living Digital Twin has evolved.")
