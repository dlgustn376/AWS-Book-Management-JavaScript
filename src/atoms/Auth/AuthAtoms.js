import { atom } from "recoil";

export const refreshState = atom({
    key: "refreshState",
    default: true
});

// 상태 하나하나를 atom으로 볼 것.
export const authenticatedState = atom({
    key: "authenticatedState",
    default: false
});