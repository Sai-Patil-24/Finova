/**
 * financeWorkflow.js
 * Calls the Python LangGraph backend for Finova Finance AI.
 */

const API_URL = 'http://localhost:8000';

export const runFinanceWorkflow = async (userInput, selectedAgent = 'auto', webSearch = false, userId = null, sessionId = null) => {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userInput,
        agent: selectedAgent,
        web_search: webSearch,
        user_id: userId,
        session_id: sessionId
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

export const fetchSessions = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/sessions/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch sessions");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchSessionMessages = async (sessionId) => {
  try {
    const response = await fetch(`${API_URL}/sessions/messages/${sessionId}`);
    if (!response.ok) throw new Error("Failed to fetch messages");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
