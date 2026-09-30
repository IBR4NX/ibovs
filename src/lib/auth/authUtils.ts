"use server";
import {
	verifyToken,
	signToken,
	setAuthCookies,
	getAuthCookies,
	defaultTokens,
} from "@/lib/auth/authCookies";
import {TokenConfig, IUser} from "./interface"
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { Types } from "mongoose";
import { colors } from "@/utils/colors";
/**
 * checkAuth
 * يتحقق من access token الموجود في الكوكيز
 * @returns payload إذا التوكن صالح
 * @throws خطأ إذا غير صالح أو منتهي
 */
export async function checkAuth(): Promise<any> {
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;
	if (!token) console.log(cookieStore);
	const payload = await verifyToken(token as string, "access");
	console.log(colors.green("token :"), payload?.id, " ", payload?.role);
	return payload;
}
import { NextRequest, NextResponse } from "next/server";
export async function verifyJWT(req: Request): Promise<any> {
	console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	const { token, refresh } = await getAuthCookies();
	const path = new URL(req.url);
	if (!token) {
		if (refresh) {
			const successful = await checkRefresh(refresh);
			if (!successful) redirect("/login");
			redirect(`${path}`);
		} else {
			// throw new Error("!Types.ObjectId.isValid auth verifyJWT 35");
      return {is:false,path:"/login"}
		}
	}
	const payload = await verifyToken(token, "access");
	if (!payload) return NextResponse.redirect(new URL("/login", req.url));
	if (!Types.ObjectId.isValid(payload.id)) {
		throw new Error("!Types.ObjectId.isValid auth verifyJWT 35");
	}
	return {is:true,...payload};
}

/**
/**
 * refreshToken
 * يستخدم refresh token لتجديد access token و refresh token
 * @param userData بيانات المستخدم لتجديد التوكنات
 * @param tokensConfig مصفوفة إعدادات التوكن (اختياري)
 */
export async function refreshToken(userData: IUser, tokensConfig: TokenConfig[] = defaultTokens) {
	const cookieStore = await cookies();
	const refresh = cookieStore.get("refresh")?.value;

	if (!refresh) throw new Error("Refresh token not found");

	// تحقق من صلاحية refresh token
	const payload = await verifyToken(refresh, "refresh");

	// تجديد التوكنات
	await setAuthCookies(userData, tokensConfig);

	return payload; // ترجع بيانات المستخدم القديمة (payload)
}
export async function refresh() {}
export async function checkRefresh(refreshToken: string) {
	try {
		const refreshPayload = await verifyToken(refreshToken, "refresh");
		console.log(refreshPayload);
		const userData: IUser = {
			_id: refreshPayload.id,
			role: refreshPayload.role,
			storeId: refreshPayload.storeId ? [refreshPayload.storeId] : [],
		};

		// اضبط التوكنات الجديدة في الكوكيز
		await setAuthCookies(userData);

		return true;
	} catch {
		// refresh token غير صالح أو منتهي
		return false;
	}
}
