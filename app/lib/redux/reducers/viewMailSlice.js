"use client";
import { createSlice } from "@reduxjs/toolkit";

export const viewMailSlice = createSlice({
	name: "viewMessages",
	initialState: {
		_id: "",
		firstName: "",
		lastName: "",
		email: "",
		subject: "",
		status: "",
		message: "",
		from: "",
		to: "",
		responses: []
	},
	reducers: {
		setMessage: (state, action) => {
			((state._id = action.payload._id), (state.firstName = action?.payload?.firstName ?? ""), (state.lastName = action?.payload?.lastName ?? ""), (state.email = action?.payload?.email ?? ""), (state.subject = action?.payload?.subject ?? ""), (state.status = action?.payload?.status ?? ""), (state.message = action?.payload?.message ?? ""), (state.from = action?.payload?.from ?? ""), (state.to = action?.payload?.to ?? ""), (state.responses = action?.payload?.responses ?? []));
		}
	}
});

export const { setMessage } = viewMailSlice.actions;

export default viewMailSlice.reducer;
