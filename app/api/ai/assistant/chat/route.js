import { readJson, runController } from '../../../../../lib/nextController';
import { chatWithAssistant } from '../../../../../controllers/assistantController';

export const runtime = 'nodejs';

export async function POST(request) {
  return runController(chatWithAssistant, request, { body: await readJson(request) });
}