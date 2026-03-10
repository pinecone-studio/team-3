import { handler } from './services/handler';
import { corsWrapper } from './utils/cors/cors-wrapper';

export default {
	fetch: corsWrapper(handler),
};
