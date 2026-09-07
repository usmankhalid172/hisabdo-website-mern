import { runController } from '../../../lib/nextController';
import { getCustomersWithAiInsights } from '../../../controllers/customerAiController';

export const runtime = 'nodejs';

export async function GET(request) {
  return runController(getCustomersWithAiInsights, request);
}