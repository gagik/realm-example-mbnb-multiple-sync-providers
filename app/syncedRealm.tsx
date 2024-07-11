import { createRealmContext, useApp } from "@realm/react";
import { syncedModels } from "./syncedModels";
import { OpenRealmBehaviorType, Realm } from "realm";
import { PropsWithChildren, useEffect, useState } from "react";

const { RealmProvider, useQuery, useRealm } = createRealmContext();

export const SyncedRealmProvider = ({ children }: PropsWithChildren) => {
  const app = useApp();
  const [realm, setRealm] = useState<Realm | null>(null);
  useEffect(() => {
    const newRealm = new Realm({
      shouldCompact: () => true,
      sync: {
        // This is important: pass the app provider's user here.
        user: app.currentUser,
        flexible: true,
        onError: (_, error) => {
          // Comment out to hide errors
          console.error(error);
        },
        existingRealmFileBehavior: {
          type: OpenRealmBehaviorType.OpenImmediately,
        },
      },
      schema: syncedModels,
    });
    setRealm(newRealm);
    return () => {
      newRealm.close();
      setRealm(null);
    };
  }, [app]);

  return realm && <RealmProvider realm={realm}>{children}</RealmProvider>;
};

export { useQuery as useSyncedQuery, useRealm as useSyncedRealm };
