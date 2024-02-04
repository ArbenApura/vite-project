// IMPORTED DEP-TYPES
import type { Handle } from '@sveltejs/kit';
// IMPORTED DEP-UTILS
import { error } from '@sveltejs/kit';
import { RateLimiter } from 'sveltekit-rate-limiter/server';

// RATE LIMITER
const limiter = new RateLimiter({
	rates: {
		IPUA: [30, 'm'],
	},
});

// -- HANDLERS -- //

export const handle: Handle = async ({ event, resolve }) => {
	// CHECK RATE LIMITER ONLY IN PRODUCTION
	if (import.meta.env.PROD && (await limiter.isLimited(event)))
		throw error(429, { message: 'Too Many Requests' });

	return await resolve(event);
};
