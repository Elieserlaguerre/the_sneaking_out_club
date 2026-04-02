import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const currentDepartment = atomWithStorage("current_department", "");

export const currentUser = atomWithStorage("current_user", "");

export const openMessages = atom(false);
