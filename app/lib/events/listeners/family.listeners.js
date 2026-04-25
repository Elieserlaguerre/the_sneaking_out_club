import { eventBus } from "../eventBus";
import { handleFamilyMemberRemovalEvent, handleNewFamilyMemberEvent, handleUpdateFamilyTreeEvent, handleUserProfileUpdateEvent } from "../handlers/family";


/*
    =======================
    FAMILY MEMBER LISTENERS
    =======================
    */

eventBus.on("family.new_member_added", handleNewFamilyMemberEvent);

eventBus.on("family.update_family_tree", handleUpdateFamilyTreeEvent);

eventBus.on("family.member_removed", handleFamilyMemberRemovalEvent);

eventBus.on("family.user_profile_update", handleUserProfileUpdateEvent);

/*
    =====================
    FAMILY PLAN LISTENERS
    =====================
 */

// eventBus.on("family.new_family_plan", "");
// eventBus.on("family.new_plan_goal", "");
// eventBus.on("family.goal_updated", "");
// eventBus.on("family.goal_removed", "");
// eventBus.on("family.new_plan_participant", "");
// eventBus.on("family.plan_participan_removed", "");
// eventBus.on("family.deleted_family_plan", "");

/*
    =======================
    FAMILY HEALTH LISTENERS
    =======================
    */


// eventBus.on("family.new_health_profile", "");
// eventBus.on("family.health_profile_updated", "");
// eventBus.on("family.health_profile_deleted", "");

/*
    =======================
    FAMILY ESTATE LISTENERS
    =======================
    */

// eventBus.on("family.new_family_estate", "");
// eventBus.on("family.estate_updated", "");
// eventBus.on("family.estate_deleted", "");
