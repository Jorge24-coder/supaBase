import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import * as fs from 'fs';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function indexDocument(filePath: string) {
  const text = fs.readFileSync(filePath, 'utf-8');

  // Si el texto es largo, divídelo en fragmentos (~500 a 1000 palabras)
  const chunks = [text]; // O tu función de split/chunking

  for (const chunk of chunks) {
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: chunk,
    });

    const embedding = embeddingResponse.data[0].embedding;

    await supabase.from('documents').insert({
      content: chunk,
      embedding: embedding,
      metadata: { file: filePath }
    });
  }
}
