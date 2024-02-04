// IMPORTED DEP-TYPES
import type { RequestHandler } from './$types';
// IMPORTED DEP-UTILS
import { exec } from 'child_process';

export const POST: RequestHandler = async () => {
	exec('git pull origin main && yarn build');
	return new Response();
};
