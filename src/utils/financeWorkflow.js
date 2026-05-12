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

/**
 * Streaming version — uses SSE to stream AI response tokens in real-time.
 * @param {string} userInput
 * @param {string} selectedAgent
 * @param {boolean} webSearch
 * @param {string|null} userId
 * @param {string|null} sessionId
 * @param {object} callbacks  { onSteps, onToken, onDone, onError }
 * @returns {function} abort — call to cancel the stream
 */
export const runFinanceWorkflowStream = (
  userInput,
  selectedAgent = 'auto',
  webSearch = false,
  userId = null,
  sessionId = null,
  { onSteps, onToken, onDone, onError } = {}
) => {
  const controller = new AbortController();

  (async () => {
    try {
      const response = await fetch(`${API_URL}/chat/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userInput,
          agent: selectedAgent,
          web_search: webSearch,
          user_id: userId,
          session_id: sessionId,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Backend error: ${response.statusText}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const jsonStr = line.slice(6).trim();
          if (!jsonStr) continue;

          try {
            const event = JSON.parse(jsonStr);

            if (event.type === 'steps' && onSteps) {
              onSteps(event.steps, event.usage);
            } else if (event.type === 'token' && onToken) {
              onToken(event.token);
            } else if (event.type === 'done' && onDone) {
              onDone();
            } else if (event.type === 'error' && onError) {
              onError(new Error(event.message));
            }
          } catch (parseErr) {
            // skip malformed SSE lines
          }
        }
      }
    } catch (error) {
      if (error.name === 'AbortError') return;
      console.error('Stream Error:', error);
      if (onError) onError(error);
    }
  })();

  return () => controller.abort();
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
