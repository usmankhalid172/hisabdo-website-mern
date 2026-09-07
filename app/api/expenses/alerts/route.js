import { runController } from '../../../../lib/nextController';
import { getExpenseAlerts } from '../../../../controllers/expenseAiController';

export const runtime = 'nodejs';

export async function GET(request) {
  return runController(getExpenseAlerts, request);
}