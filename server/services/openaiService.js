const OpenAI = require("openai");
const client = new OpenAI();

require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getChatResponse(message) {
  const response = await client.responses.create({
    model: "gpt-4.1",
    input: "Write a one-sentence bedtime story about a unicorn.",
});

console.log(response);
console.log(response.output_text);

  

  return response.choices[0].message.content;
}

module.exports = { getChatResponse };

