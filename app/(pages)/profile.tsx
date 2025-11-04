import { ClimbHistory } from "@/components";
import Line from "@/components/Line/Line";
import ProfileInfo from "@/components/ProfileInfo/ProfileInfo";
import TimeframeFilter from "@/components/TimeframeFilter/TimeframeFilter";
import { View } from "react-native";
import styles from "./profile.styles";

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
