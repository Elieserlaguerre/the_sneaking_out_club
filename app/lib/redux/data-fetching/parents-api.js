import { multiTenantApi } from "./root-api";

export const parentApi = multiTenantApi.injectEndpoints({
	overrideExisting: true,
	endpoints: (build) => ({
		manageFamilyMember: build.mutation({
			query: (formData) => ({
				url: "/parents/family",
				method: "POST",
				body: formData
			}),
			invalidatesTags: [{ type: "parents family management" }],
			transformErrorResponse: (results) => results.data.message
		}),
		getFamilyMembers: build.query({
			query: (query) => ({
				url: "/parents/family",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "parents family management" }],
			transformErrorResponse: (results) => results.data.message,
			keepUnusedDataFor: 0
		}),
		updateFamilyMember: build.mutation({
			query: (formData) => ({
				url: "/parents/family",
				method: "PATCH",
				body: formData
			}),
			invalidatesTags: [{ type: "parents family management" }],
			transformErrorResponse: (results) => results.data.message
		}),
		deleteFamilyMember: build.mutation({
			query: (formData) => ({
				url: "/parents/family",
				method: "DELETE",
				body: formData
			}),
			invalidatesTags: [{ type: "parents family management" }],
			transformErrorResponse: (results) => results.data.message
		})
	})
});

export const { useDeleteFamilyMemberMutation, useUpdateFamilyMemberMutation, useManageFamilyMemberMutation, useLazyGetFamilyMembersQuery } = parentApi;
