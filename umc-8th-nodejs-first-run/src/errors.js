// 이메일 중복
export class DuplicateUserEmailError extends Error {
    errorCode = "U001";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

// 닉네임 중복
export class DuplicateUserNickname extends Error {
    errorCode = "U003";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

// 가게 존재 x
export class DuplicateStoreExist extends Error {
    errorCode = "S001";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

// 사용자 존재 x
export class DuplicateUserExist extends Error {
    errorCode = "U002";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

// 리뷰 존재 x
export class DuplicateReviewExist extends Error {
    errorCode = "R001";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

// 지역 존재 x
export class DuplicateRegionExist extends Error {
    errorCode = "RE001";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

// 미션 존재 x
export class DuplicateMissionExist extends Error {
    errorCode = "M001";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}
