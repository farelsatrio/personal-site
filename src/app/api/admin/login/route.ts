import { NextResponse } from "next/server";
import { verifyCredentials, setSessionCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email/Username and password are required." },
        { status: 400 }
      );
    }

    const isValid = verifyCredentials(email, password);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials. Please try again." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
      redirect: "/admin/blog",
    });

    setSessionCookie(response, email);
    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Authentication error." },
      { status: 500 }
    );
  }
}
