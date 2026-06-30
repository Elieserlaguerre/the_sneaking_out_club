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
		}),
		getUserNotifications: build.query({
			query: (query) => ({
				url: "/global/user/notifications",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "global user notifications" }],
			transformErrorResponse: (results) => results.data.message,
			keepUnusedDataFor: 0
		}),
		deleteUserNotification: build.mutation({
			query: (formData) => ({
				url: "/global/user/notifications",
				method: "DELETE",
				body: formData
			}),
			invalidatesTags: [{ type: "global user notifications" }],
			transformErrorResponse: (results) => results.data.message
		}),
		notificationResponse: build.mutation({
			query: (formData) => ({
				url: "/global/user/notifications",
				method: "PATCH",
				body: formData
			}),
			invalidatesTags: [{ type: "global user notifications" }],
			transformErrorResponse: (results) => results.data.message
		}),
		cancelFriendRequest: build.mutation({
			query: (formData) => ({
				url: "/global/user/notifications",
				method: "DELETE",
				body: formData
			}),
			invalidatesTags: [{ type: "global user notifications" }],
			transformErrorResponse: (results) => results.data.message
		}),
		createSearchHistory: build.mutation({
			query: (formData) => ({
				url: "/global/search-history",
				method: "POST",
				body: formData
			}),
			invalidatesTags: [{ type: "global search history" }],
			transformErrorResponse: (results) => results.data.message
		}),
		getSearchHistory: build.query({
			query: (query) => ({
				url: "/global/search-history",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "global search history" }],
			transformErrorResponse: (results) => results.data.message,
			keepUnusedDataFor: 0
		}),
		deleteSearchHistory: build.mutation({
			query: (formData) => ({
				url: "/global/search-history",
				method: "DELETE",
				body: formData
			}),
			invalidatesTags: [{ type: "global search history" }],
			transformErrorResponse: (results) => results.data.message
		}),
		reactToPost: build.mutation({
			query: (formData) => ({
				url: "/global/posts",
				method: "PATCH",
				body: formData
			}),
			invalidatesTags: [{ type: "global posts" }],
			transformErrorResponse: (results) => results.data.message
		}),
		saveItem: build.mutation({
			query: (formData) => ({
				url: "/global/saved-items",
				method: "POST",
				body: formData
			}),
			invalidatesTags: [{ type: "global saved items" }],
			transformErrorResponse: (results) => results.data.message
		}),
		createComment: build.mutation({
			query: (formData) => ({
				url: "/global/posts/comments",
				method: "POST",
				body: formData
			}),
			invalidatesTags: [{ type: "global comments" }, { type: "global posts" }],
			transformErrorResponse: (results) => results.data.message
		}),
		getPostComments: build.query({
			query: (query) => ({
				url: "/global/posts/comments",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "global comments" }],
			transformErrorResponse: (results) => results.data.message
			//keepUnusedDataFor: 0
		}),
		reactToComment: build.mutation({
			query: (formData) => ({
				url: "/global/posts/comments",
				method: "PATCH",
				body: formData
			}),
			invalidatesTags: [{ type: "global comments" }, { type: "global replies" }],
			transformErrorResponse: (results) => results.data.message
		}),
		respondToComments: build.mutation({
			query: (formData) => ({
				url: "/global/posts/comments",
				method: "PUT",
				body: formData
			}),
			invalidatesTags: [{ type: "global comments" }, { type: "global replies" }],
			transformErrorResponse: (results) => results.data.message
		}),
		getCommentReplies: build.query({
			query: (query) => ({
				url: "/global/posts/comments/replies",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "global replies" }],
			transformErrorResponse: (results) => results.data.message,
			keepUnusedDataFor: 0
		}),
		sharePost: build.mutation({
			query: (formData) => ({
				url: "/global/posts/share",
				method: "POST",
				body: formData
			}),
			invalidatesTags: [{ type: "global share post" }, { type: "global posts" }],
			transformErrorResponse: (results) => results.data.message
		}),
		deletePost: build.mutation({
			query: (formData) => ({
				url: "/global/posts",
				method: "DELETE",
				body: formData
			}),
			invalidatesTags: [{ type: "global posts" }],
			transformErrorResponse: (results) => results.data.message
		}),
		savePost: build.mutation({
			query: (formData) => ({
				url: "/global/posts/save",
				method: "POST",
				body: formData
			}),
			invalidatesTags: [{ type: "global saved posts" }],
			transformErrorResponse: (results) => results.data.message
		}),
		getSavedPosts: build.query({
			query: (query) => ({
				url: "/global/posts/save",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "global saved posts" }],
			transformErrorResponse: (results) => results.data.message
			// keepUnusedDataFor: 0
		}),
		deleteSavedPost: build.mutation({
			query: (formData) => ({
				url: "/global/posts/save",
				method: "DELETE",
				body: formData
			}),
			invalidatesTags: [{ type: "global saved posts" }],
			transformErrorResponse: (results) => results.data.message
		}),
		createCollection: build.mutation({
			query: (formData) => ({
				url: "/global/posts/save/collections",
				method: "POST",
				body: formData
			}),
			invalidatesTags: [{ type: "global saved collections" }],
			transformErrorResponse: (results) => results.data.message
		}),
		getCollections: build.query({
			query: (query) => ({
				url: "/global/posts/save/collections",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "global saved collections" }],
			transformErrorResponse: (results) => results.data.message,
			keepUnusedDataFor: 0
		}),
		getCollectionToAdd: build.query({
			query: (query) => ({
				url: "/global/posts/save/collections/management",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "global add to collection" }],
			transformErrorResponse: (results) => results.data.message
			//keepUnusedDataFor: 0
		}),
		addToCollection: build.mutation({
			query: (formData) => ({
				url: "/global/posts/save/collections/management",
				method: "PATCH",
				body: formData
			}),
			invalidatesTags: [{ type: "global add to collection" }, { type: "global saved posts" }],
			transformErrorResponse: (results) => results.data.message
		}),
		reportSavedItem: build.mutation({
			query: (formData) => ({
				url: "/global/posts/save/complaints",
				method: "POST",
				body: formData
			}),
			invalidatesTags: [{ type: "global report saved item" }],
			transformErrorResponse: (results) => results.data.message
		}),
		deleteCollection: build.mutation({
			query: (formData) => ({
				url: "/global/posts/save/collections",
				method: "DELETE",
				body: formData
			}),
			invalidatesTags: [{ type: "global saved collections" }, { type: "global saved posts" }],
			transformErrorResponse: (results) => results.data.message
		}),
		editCollection: build.mutation({
			query: (formData) => ({
				url: "/global/posts/save/collections",
				method: "PATCH",
				body: formData
			}),
			invalidatesTags: [{ type: "global saved collections" }],
			transformErrorResponse: (results) => results.data.message
		}),

		getManagedGroups: build.query({
			query: (query) => ({
				url: "/global/posts/groups/managed",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "global managed groups" }],
			transformErrorResponse: (results) => results.data.message
			//keepUnusedDataFor: 0
		}),
		getJoinedGroups: build.query({
			query: (query) => ({
				url: "/global/posts/groups/joined",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "global joined groups" }],
			transformErrorResponse: (results) => results.data.message
			//keepUnusedDataFor: 0
		}),
		createGroup: build.mutation({
			query: (formData) => ({
				url: "/global/posts/groups",
				method: "POST",
				body: formData
			}),
			invalidatesTags: [{ type: "global groups" }, { type: "global managed groups" }],
			transformErrorResponse: (results) => results.data.message
		}),
		createPost: build.mutation({
			query: (formData) => ({
				url: "/global/posts",
				method: "POST",
				body: formData
			}),
			invalidatesTags: [{ type: "global posts" }],
			transformErrorResponse: (results) => results.data.message
		}),
		getPosts: build.query({
			query: (query) => ({
				url: "/global/posts",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "global posts" }],
			transformErrorResponse: (results) => results.data.message,
			keepUnusedDataFor: 0
		})
	})
});

export const { useLazyGetPostsQuery, useCreatePostMutation, useLazyGetJoinedGroupsQuery, useLazyGetManagedGroupsQuery, useCreateGroupMutation, useEditCollectionMutation, useDeleteCollectionMutation, useReportSavedItemMutation, useAddToCollectionMutation, useLazyGetCollectionToAddQuery, useLazyGetCollectionsQuery, useCreateCollectionMutation, useDeleteSavedPostMutation, useLazyGetSavedPostsQuery, useSavePostMutation, useDeletePostMutation, useSharePostMutation, useLazyGetCommentRepliesQuery, useRespondToCommentsMutation, useReactToCommentMutation, useLazyGetPostCommentsQuery, useCreateCommentMutation, useSaveItemMutation, useReactToPostMutation, useCreateSearchHistoryMutation, useDeleteSearchHistoryMutation, useLazyGetSearchHistoryQuery, useCancelFriendRequestMutation, useNotificationResponseMutation, useDeleteUserNotificationMutation, useLazyGetUserNotificationsQuery, useCloudinaryUploadMutation, useContactUsMutation, useLazyGetMissionStatsQuery, useLazyGetCurrentUserQuery, useLazyLoginToAccountQuery, useLazyGetUserRegistrationQuery, useDeleteUserRegistrationMutation, useUpdateUserRegistrationMutation, useUserRegistrationMutation } = globalApi;
