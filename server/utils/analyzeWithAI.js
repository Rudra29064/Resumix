const Groq = require('groq-sdk');

const analyzeWithAI = async (resumeText) => {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  const prompt = `
You are an expert ATS (Applicant Tracking System) and resume coach.

Analyze the resume below and return a JSON response with EXACTLY this structure, nothing else:

{
  "atsScore": <number from 0 to 100>,
  "strengths": [<list of strings>],
  "weaknesses": [<list of strings>],
  "missingSkills": [<list of strings>],
  "keywords": [<list of ATS-friendly keyword strings>],
  "suggestions": [<list of improvement suggestion strings>],
  "internshipReadiness": <number from 0 to 100>,
  "overallFeedback": "<one short paragraph summary>"
}

Rules:
- Return ONLY the JSON. No explanation, no markdown, no backticks.
- Be specific and actionable in suggestions.
- missingSkills should be skills commonly expected for the roles in this resume.
- keywords should be power words and technical terms missing from the resume.

Resume:
${resumeText}
`;

  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.4,
  });

  const raw = response.choices[0].message.content.trim();
  const cleaned = raw.replace(/```json|```/g, '').trim();
  const parsed = JSON.parse(cleaned);
  return parsed;
};

module.exports = analyzeWithAI;