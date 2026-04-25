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
		}),
		createFamilyTree: build.mutation({
			query: (formData) => ({
				url: "/parents/family/tree",
				method: "POST",
				body: formData
			}),
			invalidatesTags: [{ type: "parents family tree management" }, { type: "global current user" }],
			transformErrorResponse: (results) => results.data.message
		}),
		getFamilyTree: build.query({
			query: (query) => ({
				url: "/parents/family/tree",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "parents family tree management" }],
			transformErrorResponse: (results) => results.data.message,
			keepUnusedDataFor: 0
		}),
		deleteFamilyTree: build.mutation({
			query: (formData) => ({
				url: "/parents/family/tree",
				method: "DELETE",
				body: formData
			}),
			invalidatesTags: [{ type: "parents family tree management" }],
			transformErrorResponse: (results) => results.data.message
		}),
		updateFamilyTree: build.mutation({
			query: (formData) => ({
				url: "/parents/family/tree",
				method: "PATCH",
				body: formData
			}),
			invalidatesTags: [{ type: "parents family tree management" }],
			transformErrorResponse: (results) => results.data.message
		}),
		getAncestors: build.query({
			query: (query) => ({
				url: "/parents/family/tree/structure/ancestors",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "parents family tree ancestors" }],
			transformErrorResponse: (results) => results.data.message
			//keepUnusedDataFor: 0
		}),

		manageAncestorMembership: build.mutation({
			query: (formData) => ({
				url: "/parents/family/tree/structure/ancestors",
				method: "PATCH",
				body: formData
			}),
			invalidatesTags: [{ type: "parents family tree ancestors" }, { type: "parents family tree management" }],
			transformErrorResponse: (results) => results.data.message
		}),
		deleteAncestor: build.mutation({
			query: (formData) => ({
				url: "/parents/family/tree/structure/ancestors",
				method: "DELETE",
				body: formData
			}),
			invalidatesTags: [{ type: "parents family tree ancestors" }, { type: "parents family tree management" }],
			transformErrorResponse: (results) => results.data.message
		}),
		getRootFamily: build.query({
			query: (query) => ({
				url: "/parents/family/tree/structure/root",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "parents family tree root member" }],
			transformErrorResponse: (results) => results.data.message,
			keepUnusedDataFor: 0
		}),
		manageRootFamilyMembership: build.mutation({
			query: (formData) => ({
				url: "/parents/family/tree/structure/root",
				method: "PATCH",
				body: formData
			}),
			invalidatesTags: [{ type: "parents family tree root member" }, { type: "parents family tree management" }],
			transformErrorResponse: (results) => results.data.message
		}),
		deleteRootFamilyMember: build.mutation({
			query: (formData) => ({
				url: "/parents/family/tree/structure/root",
				method: "DELETE",
				body: formData
			}),
			invalidatesTags: [{ type: "parents family tree root member" }, { type: "parents family tree management" }],
			transformErrorResponse: (results) => results.data.message
		}),
		createHousehold: build.mutation({
			query: (formData) => ({
				url: "/parents/family/branches",
				method: "POST",
				body: formData
			}),
			invalidatesTags: [{ type: "parent family branches" }],
			transformErrorResponse: (results) => results.data.message
		}),
		getHouseholds: build.query({
			query: (query) => ({
				url: "/parents/family/branches",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "parent family branches" }],
			transformErrorResponse: (results) => results.data.message,
			keepUnusedDataFor: 0
		}),
		getFamilyTreeBranches: build.query({
			query: (query) => ({
				url: "/parents/family/tree/structure/branches",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "parent family tree branches" }],
			transformErrorResponse: (results) => results.data.message,
			keepUnusedDataFor: 0
		}),
		manageFamilyBranches: build.mutation({
			query: (formData) => ({
				url: "/parents/family/tree/structure/branches",
				method: "PATCH",
				body: formData
			}),
			invalidatesTags: [{ type: "parent family tree branches" }, { type: "parents family tree management" }],
			transformErrorResponse: (results) => results.data.message
		}),
		deleteFamilyBranch: build.mutation({
			query: (formData) => ({
				url: "/parents/family/tree/structure/branches",
				method: "DELETE",
				body: formData
			}),
			invalidatesTags: [{ type: "parent family tree branches" }, { type: "parents family tree management" }],
			transformErrorResponse: (results) => results.data.message
		})
	})
});

export const {useDeleteFamilyBranchMutation, useManageFamilyBranchesMutation, useLazyGetFamilyTreeBranchesQuery, useLazyGetHouseholdsQuery, useCreateHouseholdMutation, useDeleteRootFamilyMemberMutation, useManageRootFamilyMembershipMutation, useLazyGetRootFamilyQuery, useDeleteAncestorMutation, useManageAncestorMembershipMutation, useLazyGetAncestorsQuery, useUpdateFamilyTreeMutation, useDeleteFamilyTreeMutation, useLazyGetFamilyTreeQuery, useCreateFamilyTreeMutation, useDeleteFamilyMemberMutation, useUpdateFamilyMemberMutation, useManageFamilyMemberMutation, useLazyGetFamilyMembersQuery } = parentApi;
