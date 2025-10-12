import { Tabs } from "expo-router";
import Icon from "react-native-remix-icon";

// the navbar at the bottom of the screen
function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ size }) => (
            <Icon name="home-line" size={size} color="#000000" />
          ),
        }}
      />

      <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",
          headerShown: false,
          tabBarIcon: ({ size }) => (
            <Icon name="bar-chart-2-line" size={size} color="#000000" />
          ),
        }}
      />
      <Tabs.Screen
        name="log"
        options={{
          title: "Log",
          headerShown: false,
          tabBarIcon: ({ size }) => (
            <Icon name="add-circle-line" size={size} color="#000000" />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ size }) => (
            <Icon name="account-circle-line" size={size} color="#000000" />
          ),
        }}
      />

      <Tabs.Screen
        name="individual-climb-page"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
