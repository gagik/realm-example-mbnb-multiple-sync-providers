import React, { PropsWithChildren, useState } from "react";
import { Button, Platform, SafeAreaView, StyleSheet } from "react-native";
import { AppProvider, RealmProvider, UserProvider } from "@realm/react";

import { AnonAuth } from "./AnonAuth";
import { AirbnbList } from "./AirbnbList";
import { SyncedRealmProvider, useSyncedRealm } from "./syncedRealm";
import { LocalRealmProvider, useLocalRealm } from "./localRealm";
import { Text } from "react-native";

export const AppWrapper: React.FC<{
  appId: string;
}> = ({ appId }) => {
  // If we are logged in, the RealmProviders and the app will be rendered,
  // using the sync configuration for the `SyncedRealmProvider`.
  return (
    <>
      <SafeAreaView style={styles.screen}>
        <AppProvider id={appId}>
          <UserProvider fallback={<AnonAuth />}>
            <SharedSyncRealmProviderRealmExample></SharedSyncRealmProviderRealmExample>
          </UserProvider>
        </AppProvider>
      </SafeAreaView>
    </>
  );
};

export const SharedSyncRealmProviderRealmExample = () => {
  const [page, setPage] = useState(0);
  const nextPage = () => setPage((page + 1) % 3);
  return (
    <>
      <Button title="Next" onPress={() => nextPage()} />
      <Text>Synced Realm {page}</Text>
      <LocalRealmProvider>
        {page == 0 && (
          <SyncedRealmProvider>
            <AirbnbList />
          </SyncedRealmProvider>
        )}
        {page == 1 && (
          <SyncedRealmProvider>
            <NestedRealmComponent />
          </SyncedRealmProvider>
        )}
        {page == 2 && (
          <SyncedRealmProvider>
            <NestedRealmComponent />
          </SyncedRealmProvider>
        )}
      </LocalRealmProvider>
    </>
  );
};

const NestedRealmComponent = () => {
  const syncedRealm = useSyncedRealm();
  const localRealm = useLocalRealm();

  return (
    <>
      <Text>Synced Realm Path: {syncedRealm.path}</Text>
      <Text>---</Text>
      <Text>Local Realm Path: {localRealm.path}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
});

export default AppWrapper;
