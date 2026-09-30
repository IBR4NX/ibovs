"use server";
import { NextRequest, NextResponse } from "next/server";
// GET /api/users أو /api/users?email=test@example.com
import { setAuthCookies, getVerifiedPayload } from "@/lib/auth";
import { login, signup, updateUser, deleteUserById, updatePassword } from "@/controllers/user.controller";
import { getUserById } from "@/controllers/repositories/user.repository";
import { verifyTokenUser } from "@/lib/auth";
export async function GET(req: NextRequest) {
	console.log("%%%%%%%%%% get user route %%%%%%%%%%");
	const url = new URL(req.url);
	const email = url.searchParams.get("email");
	const tokenUser = await verifyTokenUser(req);
	if (!tokenUser.is) NextResponse.redirect(tokenUser.path);
	const user = await getUserById(tokenUser.id);
	if (!user) return NextResponse.json(
		{ message: "User not found" },
		{ status: 404 }
	);
	const data = user.toJSON();
	delete data.storeId;
	return NextResponse.json(data);

}

// POST /api/users login and signup
export async function POST(req: NextRequest) {
	const body = await req.json();
	const { action, name, email, password } = body;
	console.log(body);
	let message: "Login successful" | "Signup successful";
	try {
		if (body.action === "login") {
			const user = await login(email, password);
			await setAuthCookies(user);
			message = "Login successful";
			console.log(user);
		} else if (body.action === "signup") {
			console.log("to is here route 41");
			const user = await signup(name, email, password);
			await setAuthCookies(user);
			message = "Signup successful";
			console.log(user);
		}

		return NextResponse.redirect(new URL('/', req.url));
	} catch (error: any) {
		console.error(error);
		return NextResponse.json({ error: "C: " + error.message }, { status: 400 });
	}
	console.log("redirect");
	return NextResponse.redirect(new URL('/', req.url));
}

// PUT /api/users/:id
export async function PUT(req: NextRequest) {
	const session = await getVerifiedPayload();
	const keysToKeep = ["action", "name", "email", "password", "new", "imgUrl"];
	try {
		const data = await req.json();
		const fltrUser = Object.fromEntries(Object.entries(data).filter(([key]) => keysToKeep.includes(key)));
		if (fltrUser.action === "password") {
			const upUser = await updatePassword(session.id, data);
		} else {
			const updated = await updateUser(session.id, fltrUser);
		}
		return NextResponse.json({ message: "successful updated" });
	} catch (error: any) {
		console.error(error);
		return NextResponse.json({ error: "C: " + error.message }, { status: 400 });
	}
}

