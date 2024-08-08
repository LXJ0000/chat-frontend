import useConversationStore from "@/store/modules/conversation";
import { GroupMemberRole } from "@openim/wasm-client-sdk";

export default function useCurrentMemberRole(groupID?: string) {
  const conversationStore = useConversationStore();

  const inSameGroup = computed(
    () =>
      conversationStore.storeCurrentMemberInGroup.groupID ===
      (groupID ?? conversationStore.storeCurrentGroupInfo.groupID)
  );

  const currentRole = computed(
    () => conversationStore.storeCurrentMemberInGroup.roleLevel
  );

  const isOwner = computed(
    () => inSameGroup.value && currentRole.value === GroupMemberRole.Owner
  );

  const isAdmin = computed(
    () => inSameGroup.value && currentRole.value === GroupMemberRole.Admin
  );

  const isNomal = computed(
    () => inSameGroup.value && currentRole.value === GroupMemberRole.Normal
  );

  return {
    isOwner,
    isAdmin,
    isNomal,
    inSameGroup,
    currentRole,
  };
}
