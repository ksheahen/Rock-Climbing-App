import { View } from "react-native";
import BottomNavComponent from "../(components)/bottom-nav";
import ClimbHistoryComponent from "../(components)/climb-history";
import LineComponent from "../(components)/line";
import ProfileInfoComponent from "../(components)/profile-info";
import TimeframeFilterComponent from "../(components)/timeframe-filter";

function ProfilePage() {
  return (
    <View>
      <ProfileInfoComponent />
      <LineComponent />
      <TimeframeFilterComponent />
      <LineComponent />
      <ClimbHistoryComponent />
      <LineComponent />
      <BottomNavComponent />
    </View>
  );
}

export default ProfilePage;

