import { multiTenantApi } from "./root-api";

export const parentApi = multiTenantApi.injectEndpoints({
	overrideExisting: true,
	endpoints: (build) => ({
		createFamilyMember: build.mutation({
			query: (formData) => ({
				url: "/parents/family/members",
				method: "POST",
				body: formData
			}),
			invalidatesTags: [{ type: "parents family management" }],
			transformErrorResponse: (results) => results.data.message
		}),
		getFamilyMembers: build.query({
			query: (query) => ({
				url: "/parents/family/members",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "parents family management" }],
			transformErrorResponse: (results) => results.data.message,
			keepUnusedDataFor: 0
		}),
		updateFamilyMember: build.mutation({
			query: (formData) => ({
				url: "/parents/family/members",
				method: "PATCH",
				body: formData
			}),
			invalidatesTags: [{ type: "parents family management" }],
			transformErrorResponse: (results) => results.data.message
		}),
		deleteFamilyMember: build.mutation({
			query: (formData) => ({
				url: "/parents/family/members",
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
			providesTags: [{ type: "parents family tree management" }, { type: "parents search history" }, { type: "parents search history" }],
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
			invalidatesTags: [{ type: "parents family branches" }, { type: "global current user" }],
			transformErrorResponse: (results) => results.data.message
		}),
		editHousehold: build.mutation({
			query: (formData) => ({
				url: "/parents/family/branches",
				method: "PATCH",
				body: formData
			}),
			invalidatesTags: [{ type: "parents family branches" }, { type: "global current user" }],
			transformErrorResponse: (results) => results.data.message
		}),
		getHouseholds: build.query({
			query: (query) => ({
				url: "/parents/family/branches",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "parents family branches" }],
			transformErrorResponse: (results) => results.data.message,
			keepUnusedDataFor: 0
		}),
		getFamilyTreeBranches: build.query({
			query: (query) => ({
				url: "/parents/family/tree/structure/branches",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "parents family tree branches" }],
			transformErrorResponse: (results) => results.data.message,
			keepUnusedDataFor: 0
		}),
		manageFamilyTreeBranches: build.mutation({
			query: (formData) => ({
				url: "/parents/family/tree/structure/branches",
				method: "PATCH",
				body: formData
			}),
			invalidatesTags: [{ type: "parents family tree branches" }, { type: "parents family tree management" }],
			transformErrorResponse: (results) => results.data.message
		}),
		deleteFamilyTreeBranch: build.mutation({
			query: (formData) => ({
				url: "/parents/family/tree/structure/branches",
				method: "DELETE",
				body: formData
			}),
			invalidatesTags: [{ type: "parents family tree branches" }, { type: "parents family tree management" }],
			transformErrorResponse: (results) => results.data.message
		}),
		getFamilyTreeLeadershipCandidates: build.query({
			query: (query) => ({
				url: "/parents/family/tree/structure/leadership",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "parents family tree leadership" }],
			transformErrorResponse: (results) => results.data.message,
			keepUnusedDataFor: 0
		}),
		manageFamilyTreeLeadership: build.mutation({
			query: (formData) => ({
				url: "/parents/family/tree/structure/leadership",
				method: "PATCH",
				body: formData
			}),
			invalidatesTags: [{ type: "parents family tree leadership" }, { type: "parents family tree management" }],
			transformErrorResponse: (results) => results.data.message
		}),
		getConnections: build.query({
			query: (query) => ({
				url: "/parents/dashboard/connections",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "parents connections" }],
			transformErrorResponse: (results) => results.data.message,
			keepUnusedDataFor: 0
		}),
		sendFriendRequest: build.mutation({
			query: (formData) => ({
				url: "/parents/dashboard/connections",
				method: "POST",
				body: formData
			}),
			invalidatesTags: [{ type: "parents connections" }, { type: "global user notifications" }],
			transformErrorResponse: (results) => results.data.message
		}),
		manageFavoriteConnections: build.mutation({
			query: (formData) => ({
				url: "/parents/dashboard/connections",
				method: "PATCH",
				body: formData
			}),
			invalidatesTags: [{ type: "parents connections" }],
			transformErrorResponse: (results) => results.data.message
		}),
		unfriend: build.mutation({
			query: (formData) => ({
				url: "/parents/dashboard/connections",
				method: "DELETE",
				body: formData
			}),
			invalidatesTags: [{ type: "parents connections" }],
			transformErrorResponse: (results) => results.data.message
		}),
		getPrograms: build.query({
			query: (query) => ({
				url: "/parents/dashboard/programs",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "parents programs" }],
			transformErrorResponse: (results) => results.data.message
			//keepUnusedDataFor: 0
		})
	})
});

export const { useGetProgramsQuery, useUnfriendMutation, useManageFavoriteConnectionsMutation, useSendFriendRequestMutation, useLazyGetConnectionsQuery, useEditHouseholdMutation, useManageFamilyTreeLeadershipMutation, useLazyGetFamilyTreeLeadershipCandidatesQuery, useDeleteFamilyTreeBranchMutation, useManageFamilyTreeBranchesMutation, useLazyGetFamilyTreeBranchesQuery, useLazyGetHouseholdsQuery, useCreateHouseholdMutation, useDeleteRootFamilyMemberMutation, useManageRootFamilyMembershipMutation, useLazyGetRootFamilyQuery, useDeleteAncestorMutation, useManageAncestorMembershipMutation, useLazyGetAncestorsQuery, useUpdateFamilyTreeMutation, useDeleteFamilyTreeMutation, useLazyGetFamilyTreeQuery, useCreateFamilyTreeMutation, useDeleteFamilyMemberMutation, useUpdateFamilyMemberMutation, useCreateFamilyMemberMutation, useLazyGetFamilyMembersQuery } = parentApi;
