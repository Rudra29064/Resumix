const Groq = require('groq-sdk');

const rewriteResume = async (resumeText) => {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const prompt = `
You are an expert resume writer and career coach.

Rewrite the resume below to make it stronger, more ATS-friendly, and more impressive for recruiters.

Rules:
- Use strong action verbs (developed, implemented, optimized, designed, built, led)
- Add measurable impact where possible (e.g. "improved performance by 30%")
- Make project descriptions more specific and technical
- Keep the same structure and sections
- Do NOT add fake experience or skills
- Return ONLY the rewritten resume text, nothing else

Resume:
${resumeText}
`;

  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.5,
  });

  return response.choices[0].message.content.trim();
};

module.exports = rewriteResume;