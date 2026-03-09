import { handler } from "./services/handler";


export default {
	fetch(request: Request, env: Env, ctx: ExecutionContext) {
	  return handler(request, env, ctx);
	}
  };