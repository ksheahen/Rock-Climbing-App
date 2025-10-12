import { Tabs } from "expo-router";
import Icon from "react-native-remix-icon";
import { COLORS } from "../styles/global-styles";

// the navbar at the bottom of the screen
function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.background1,
          height: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarShowLabel: false,
          tabBarIcon: ({ size }) => (
            <Icon name="home-line" size={size} color="#000000" />
          ),
        }}
      />

      <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",
          tabBarShowLabel: false,
          tabBarIcon: ({ size }) => (
            <Icon name="bar-chart-2-line" size={size} color="#000000" />
          ),
        }}
      />
      <Tabs.Screen
        name="log"
        options={{
          title: "Log",
          tabBarShowLabel: false,
          tabBarIcon: ({ size }) => (
            <Icon name="add-circle-line" size={size} color="#000000" />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarShowLabel: false,
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
