/**
 * financeWorkflow.js
 * Calls the Python LangGraph backend for Finova Finance AI.
 */

const API_URL = 'http://localhost:8000';

export const runFinanceWorkflow = async (userInput, selectedAgent = 'auto') => {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userInput,
        agent: selectedAgent,
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Workflow Error:", error);
    throw error;
  }
};
