import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); //값이 잘 들어왔는지 확인

    const user = await userSignUp(bodyToUser(req.body));

    res.status(StatusCodes.OK).success(user);
};