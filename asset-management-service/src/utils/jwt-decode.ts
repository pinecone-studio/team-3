import { jwtVerify } from 'jose';
export async function verifyAssignmentToken(token: string, secret: string) {
	const encodedSecret = new TextEncoder().encode(secret);
	const { payload } = await jwtVerify(token, encodedSecret);
	return payload as { assignmentId: string };
}
