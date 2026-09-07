import { runController } from '../../../../lib/nextController';
import { getMonthlyInsights } from '../../../../controllers/aiController';

export const runtime = 'nodejs';

export async function GET(request) {
  return runController(getMonthlyInsights, request);
}