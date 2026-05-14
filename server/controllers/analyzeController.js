const extractText = require('../utils/extractText');
const analyzeWithAI = require('../utils/analyzeWithAI');

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Step 1: Extract text from PDF or DOCX
    const text = await extractText(req.file);

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Could not extract text from file' });
    }

    // Step 2: Send to OpenAI for analysis
    const analysis = await analyzeWithAI(text);

    // Step 3: Return result to frontend
    res.json({
      message: 'Analysis complete',
      analysis,
    });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { uploadResume };