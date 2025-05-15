// 이메일 중복
export class DuplicateUserEmailError extends Error {
    errorCode = "U001";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

// 가게 존재 x
export class DuplicateStoreExist extends Error {
    errorCode = "U002";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

// 사용자 존재 x
export class DuplicateUserExist extends Error {
    errorCode = "U003";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}
