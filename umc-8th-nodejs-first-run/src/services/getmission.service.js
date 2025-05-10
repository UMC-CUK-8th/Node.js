import { getAllStoreMissions } from "../repositories/getmission.repository.js";

export const listStoreMission = async (storeId, cursor) => {
    try {
        return await getAllStoreMissions(storeId, cursor);
    } catch (error) {
        console.error("미션 조회 서비스 오류:", error);
        throw new Error("미션 조회 서비스에서 문제가 발생했습니다.");
    }
};
