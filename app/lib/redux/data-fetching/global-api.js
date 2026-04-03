import { multiTenantApi } from "./root-api";

export const globalApi = multiTenantApi.injectEndpoints({
	overrideExisting: true,
	endpoints: (build) => ({
		userRegistration: build.mutation({
			query: (formData) => ({
				url: "/global/register",
				method: "POST",
				body: formData
			}),
			invalidatesTags: [{ type: "global user registration" }],
			transformErrorResponse: (results) => results.data.message
		}),
		updateUserRegistration: build.mutation({
			query: (formData) => ({
				url: "/global/register",
				method: "PATCH",
				body: formData
			}),
			invalidatesTags: [{ type: "global user registration" }],
			transformErrorResponse: (results) => results.data.message
		}),
		deleteUserRegistration: build.mutation({
			query: (formData) => ({
				url: "/global/register",
				method: "DELETE",
				body: formData
			}),
			invalidatesTags: [{ type: "global user registration" }],
			transformErrorResponse: (results) => results.data.message
		}),
		getUserRegistration: build.query({
			query: (query) => ({
				url: "/global/register",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "global user registration" }],
			transformErrorResponse: (results) => results.data.message,
			keepUnusedDataFor: 0
		}),
		loginToAccount: build.query({
			query: (query) => ({
				url: "/global/login",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "global user login" }],
			transformErrorResponse: (results) => results.data.message,
			keepUnusedDataFor: 0
		}),
		getCurrentUser: build.query({
			query: (query) => ({
				url: "/global/user",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "global current user" }],
			transformErrorResponse: (results) => results.data.message,
			keepUnusedDataFor: 0
		}),
		getMissionStats: build.query({
			query: (query) => ({
				url: "/global/mission-stats",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "global mission stats" }],
			transformErrorResponse: (results) => results.data.message,
			keepUnusedDataFor: 0
		}),
		contactUs: build.mutation({
			query: (formData) => ({
				url: "/global/contact-us",
				method: "POST",
				body: formData
			}),
			invalidatesTags: [{ type: "global contact us" }],
			transformErrorResponse: (results) => results.data.message
		}),
		cloudinaryUpload: build.mutation({
			query: (formData) => ({
				url: "/global/uploads",
				method: "POST",
				body: formData
			}),
			invalidatesTags: [{ type: "global image management" }],
			transformErrorResponse: (results) => results.data.message
		})
	})
});

export const {useCloudinaryUploadMutation, useContactUsMutation, useLazyGetMissionStatsQuery, useLazyGetCurrentUserQuery, useLazyLoginToAccountQuery, useLazyGetUserRegistrationQuery, useDeleteUserRegistrationMutation, useUpdateUserRegistrationMutation, useUserRegistrationMutation } = globalApi;
