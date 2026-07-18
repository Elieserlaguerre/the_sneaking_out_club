import { eventBus } from "../eventBus";
import { handleNotificationEvent } from "../handlers/notifications";

eventBus.on("user.friend_request", handleNotificationEvent);

eventBus.on("user.request_accepted", handleNotificationEvent);

eventBus.on("user.request_denied", handleNotificationEvent);

eventBus.on("group.join_request", handleNotificationEvent);

eventBus.on("group.request_accepted", handleNotificationEvent);

eventBus.on("group.request_denied", handleNotificationEvent);
