import { global } from "@/theme";
import { Tabs } from "expo-router";
import Icon from "react-native-remix-icon";

// the navbar at the bottom of the screen
function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderColor: global.colors.background_1,
          backgroundColor: global.colors.background_1,
          height: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <Icon name="home-line" size={30} color={global.colors.text_1} />
          ),
        }}
      />

      <Tabs.Screen
        name="analytics"
        options={{
          href: null,
          title: "Analytics",
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <Icon
              name="bar-chart-2-line"
              size={30}
              color={global.colors.text_1}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="log"
        options={{
          title: "Log",
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <Icon
              name="add-circle-line"
              size={30}
              color={global.colors.text_1}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <Icon
              name="account-circle-line"
              size={30}
              color={global.colors.text_1}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="edit-profile"
        options={{
          href: null,
          title: "Edit profile page",
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <Icon name="circle-line" size={30} color={global.colors.text_1} />
          ),
        }}
      />

      <Tabs.Screen
        name="individual-climb-page"
        options={{
          href: null,
          title: "Individual climb page",
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <Icon name="circle-line" size={30} color={global.colors.text_1} />
          ),
        }}
      />

      {/* <Tabs.Screen name="onboarding" /> */}
    </Tabs>
  );
}

export default TabLayout;
