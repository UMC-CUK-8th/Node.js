import { StatusCodes } from "http-status-codes";
import { createMissionDTO } from "../dtos/mission.dto.js";
import { addMissionService } from "../services/mission.service.js";

export const createMission = async (req, res) => {
    try {
      const store_id = Number(req.params.store_id);
      console.log("🔹 받은 store_id:", store_id); // ✅ store_id 확인
  
      console.log("🔹 받은 request body:", req.body); // ✅ 요청 body 확인
  
      const missionData = createMissionDTO(req.body); // DTO 변환 및 검증
      console.log("🔹 DTO 변환 후 missionData:", missionData); // ✅ DTO 변환 후 데이터 확인
  
      const newMission = await addMissionService(store_id, missionData);
  
      res.status(201).json({
        message: "Mission created successfully",
        mission: newMission,
      });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
};
  
