import { createRealmContext } from "@realm/react";

import { localModels } from "./localModels";

const { RealmProvider, useRealm, useQuery } = createRealmContext({
  schema: localModels,
  deleteRealmIfMigrationNeeded: true,
});

export {
  RealmProvider as LocalRealmProvider,
  useRealm as useLocalRealm,
  useQuery as useLocalQuery,
};
