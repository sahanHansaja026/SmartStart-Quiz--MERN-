import React, { useState } from 'react';
import axios from 'axios';
import '../css/bot.css'; // Import the CSS file for styles

const AITextGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:9000/api/generate-text', { prompt });
      setGeneratedText(response.data.generated_text);
    } catch (err) {
      console.error("Error generating text:", err);
      setError('Failed to generate text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bot">
      <h1>Mark AI Text Generator</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="message-container">
        {prompt && (
          <div className="message user-message">
            <p><strong>You:</strong> {prompt}</p>
          </div>
        )}
        {generatedText && (
          <div className="message ai-message">
            <p><strong>Mark AI:</strong> {generatedText}</p>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt"
        />
        <button type="submit" disabled={loading || !prompt}>
          {loading ? 'Generating...' : 'Generate Text'}
        </button>
      </form>
    </div>
  );
};

export default AITextGenerator;
