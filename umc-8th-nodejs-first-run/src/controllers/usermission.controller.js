import { StatusCodes } from "http-status-codes";
import { getUserMissionsService } from "../services/usermission.service.js";

export const getUserMissions = async (req, res) => {
  try {
    const user_id = Number(req.params.user_id);
    const cursor = req.query.cursor ? Number(req.query.cursor) : null; // 커서 값
    const limit = req.query.limit ? Number(req.query.limit) : 10; // 10개 조회

    console.log("받은 user_id:", user_id);
    console.log("받은 cursor:", cursor);
    console.log("받은 limit:", limit);

    const userMissionsData = await getUserMissionsService(user_id, cursor, limit);

    res.status(StatusCodes.OK).json({
      message: "User missions retrieved successfully",
      data: userMissionsData,
    });
  } catch (error) {
    res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Internal Server Error",
    });
  }
};
