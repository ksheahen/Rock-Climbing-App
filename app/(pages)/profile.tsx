import { View } from "react-native";
import ClimbHistoryComponent from "../(components)/climbhistory";
import LineComponent from "../(components)/line";
import ProfileInfoComponent from "../(components)/profileinfo";
import TimeframeFilterComponent from "../(components)/timeframefilter";
import styles from "../styles/profile";

function ProfilePage() {
  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <ProfileInfoComponent />
        <LineComponent />
        <TimeframeFilterComponent />
        <LineComponent />
        <ClimbHistoryComponent />
      </View>
    </View>
  );
}

export default ProfilePage;


