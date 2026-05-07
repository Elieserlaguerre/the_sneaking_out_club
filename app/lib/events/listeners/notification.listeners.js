import { eventBus } from "../eventBus";
import { handleFriendRequestAcceptedEvent, handleFriendRequestDeniedEvent, handleFriendRequestNotificationEvent } from "../handlers/notifications";

eventBus.on("user.friend_request", handleFriendRequestNotificationEvent);

eventBus.on("user.request_accepted", handleFriendRequestAcceptedEvent);

eventBus.on("user.request_denied", handleFriendRequestDeniedEvent);
