import { listUserReviewsService } from "../services/getuserreview.service.js";
import { checkUserExists } from "../services/getuserreview.service.js";
import { StatusCodes } from "http-status-codes";

export const handleListUserReviews = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.user_id);
        const cursor = req.query.cursor ? parseInt(req.query.cursor) : 0;

        if (isNaN(userId)) {
            throw new Error("userId가 올바르지 않습니다.");
        }

        console.log(`userId: ${userId}, cursor: ${cursor}`);

        const reviews = await listUserReviewsService(userId, cursor);

        // 사용자가 존재하는지 확인
        try {
            const user = await checkUserExists(userId);
            res.status(StatusCodes.OK).success({
                message: "내가 작성한 리뷰 목록 조회 성공",
                data: reviews,
            });
        } catch (error) {
            return next(error);
        }

    } catch (error) {
        console.error("리뷰 목록 조회 오류:", error);
        res.status(500).json({ message: "리뷰 목록 조회 실패", error: error.message });
    }
};
