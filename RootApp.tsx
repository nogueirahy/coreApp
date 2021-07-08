import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text} from 'react-native';

import DeviceInfo from 'react-native-device-info';

import CoreApi from 'core-api';

const Stack = createStackNavigator();

const RootApp = () => {
  const coreApi = new CoreApi(DeviceInfo);
  return (
    <NavigationContainer>
      <React.Suspense
        fallback={
          <View>
            <Text>Loading...</Text>
          </View>
        }>
        <Stack.Navigator>
          {[
            ...coreApi.miniAppHome().components,
            ...coreApi.miniAppProfile().components,
          ].map(screen => (
            <Stack.Screen
              initialParams={{coreApi}}
              key={screen.id}
              name={screen.id}
              component={screen.Component}
            />
          ))}
        </Stack.Navigator>
      </React.Suspense>
    </NavigationContainer>
  );
};

export default RootApp;
