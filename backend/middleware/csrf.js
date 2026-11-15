import crypto from "crypto";

// Generate CSRF token if not present in session/cookie
export const csrfToken = (req, res, next) => {
  if (!req.cookies.csrf_token) {
    const token = crypto.randomBytes(32).toString("hex");
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("csrf_token", token, {
      httpOnly: false, // Frontend needs to read it
      secure: isProduction,
      sameSite: isProduction ? "lax" : "lax",
      path: "/",
    });
    req.csrfToken = token;
  } else {
    req.csrfToken = req.cookies.csrf_token;
  }
  next();
};

// Validate CSRF token on state-changing requests (POST, PUT, PATCH, DELETE)
export const csrfProtection = (req, res, next) => {
  // Skip CSRF for safe methods
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    return next();
  }

  // Skip CSRF for public auth endpoints (login/register use rate limiting instead)
  const publicAuthPaths = ["/api/auth/login", "/api/auth/register"];
  if (publicAuthPaths.includes(req.path)) {
    return next();
  }

  const tokenFromCookie = req.cookies.csrf_token;
  const tokenFromHeader = req.headers["x-csrf-token"];
  const tokenFromBody = req.body && req.body._csrf;

  if (!tokenFromCookie || !tokenFromHeader && !tokenFromBody) {
    return res.status(403).json({
      success: false,
      message: "CSRF token missing.",
    });
  }

  const token = tokenFromHeader || tokenFromBody;
  if (token !== tokenFromCookie) {
    return res.status(403).json({
      success: false,
      message: "CSRF token mismatch.",
    });
  }

  next();
};
