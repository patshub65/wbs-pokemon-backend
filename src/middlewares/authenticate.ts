import { JWT_SECRET } from "#config";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const authenticate: RequestHandler = (req, _res, next) => {
  const authHeader = req.header("authorization"); // Bearer <access-token>
  const accessToken = authHeader?.split(" ")[1];
  if (!accessToken)
    throw new Error("Not authenticated", { cause: { status: 401 } });

  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET) as jwt.JwtPayload;

    if (!decoded.userId) {
      throw new Error("Invalid access token", { cause: { status: 403 } });
    }

    req.user = {
      id: decoded.userId,
      email: decoded.email,
    };

    next();
  } catch (error) {
    // If the error is because the token expired, call next with a 401 error and an `ACCESS_TOKEN_EXPIRED` code.
    if (error instanceof jwt.TokenExpiredError) {
      next(
        new Error("Expired access token", {
          cause: { status: 401, code: "ACCESS_TOKEN_EXPIRED" },
        }),
      );
    } else {
      // Call next with a new 401 error indicating an invalid access token.
      next(new Error("Invalid access token.", { cause: { status: 401 } }));
    }
  }
};

export default authenticate;
