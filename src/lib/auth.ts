import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface AuthResult {
  isAuthenticated: boolean;
  userId?: string;
  email?: string;
  role?: string;
}

export async function verifyAuth(request: Request): Promise<AuthResult> {
  try {
    // Try to get token from Authorization header
    const authHeader = request.headers.get("Authorization");
    let token: string | undefined;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else {
      // If no Authorization header, try to get token from cookies
      const cookieStore = await cookies();
      token = cookieStore.get("token")?.value;
    }

    if (!token) {
      return { isAuthenticated: false };
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as jwt.JwtPayload & {
      userId: string;
      email: string;
      role: string;
    };

    return {
      isAuthenticated: true,
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (error) {
    console.error("Auth verification error:", error);
    return { isAuthenticated: false };
  }
}
