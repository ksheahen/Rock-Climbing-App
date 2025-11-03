import { View } from "react-native";
import {
  ClimbHistory,
  Line,
  ProfileInfo,
  TimeframeFilter,
} from "../../components";
import { styles } from "./profile.styles";

function ProfilePage() {
  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <ProfileInfo />
        <Line />
        <TimeframeFilter />
        <Line />
        <ClimbHistory />
      </View>
    </View>
  );
}

export default ProfilePage;
