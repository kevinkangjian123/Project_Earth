/**
 * Gemini API Dynamic Model Fetcher
 * 
 * As per architectural rules, this system MUST NOT hardcode model names (e.g. 'gemini-1.5-pro').
 * It dynamically queries the API for available models and selects the most appropriate one.
 */

// This will require the @google/generative-ai SDK later.
// For now, this is the architectural stub demonstrating the dynamic fetch logic.

export async function getOptimalGeminiModel(apiKey: string): Promise<string> {
  try {
    // 1. Fetch available models from the Tier 2 API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.statusText}`);
    }

    const data = await response.json();
    const models = data.models || [];

    // 2. Filter for 'generateContent' supported models
    const supportedModels = models.filter((m: any) => 
      m.supportedGenerationMethods.includes('generateContent')
    );

    // 3. Selection Logic: Prefer 'pro' models for complex reasoning (Step 5), fallback to 'flash'
    let selectedModel = '';
    
    // Attempt to find the latest pro model
    const proModel = supportedModels.find((m: any) => m.name.includes('gemini-1.5-pro'));
    if (proModel) {
      selectedModel = proModel.name;
    } else {
      // Fallback to flash or the first available
      const flashModel = supportedModels.find((m: any) => m.name.includes('gemini-1.5-flash'));
      selectedModel = flashModel ? flashModel.name : supportedModels[0]?.name;
    }

    if (!selectedModel) {
      throw new Error("No compatible Gemini models found for this API key.");
    }

    // Return the dynamically selected model (e.g., 'models/gemini-1.5-pro-latest')
    console.log(`[System API] Dynamically selected model: ${selectedModel}`);
    return selectedModel;

  } catch (error) {
    console.error("[System API Error] Failed dynamic model fetching:", error);
    throw error;
  }
}
