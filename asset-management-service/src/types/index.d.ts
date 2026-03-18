type Context = {
	env: Env;
	waitUntil: ExecutionContext['waitUntil'];
};

type Env = {
	DB: D1Database;
};
