import { JwtPayload } from "jsonwebtoken";
import { UserDto } from "../dtos/user/user.dto";

declare global {
  namespace Express {
    interface Request {
      token?: string | JwtPayload;
      userDto?: UserDto;
    }
  }
}
