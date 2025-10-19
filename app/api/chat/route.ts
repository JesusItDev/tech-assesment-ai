import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  console.log("hello from next api");
  console.log(req);
  const { prompt: input } = await req.json();

  const result = await client.responses.create({
    model: "gpt-5-nano",
    input,
    max_output_tokens: 1000,
  });

  return Response.json(result.output_text);
}
