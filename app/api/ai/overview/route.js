import { runController } from '../../../../lib/nextController';
import { getAiOverview } from '../../../../controllers/aiController';

export const runtime = 'nodejs';

export async function GET(request) {
  return runController(getAiOverview, request);
}