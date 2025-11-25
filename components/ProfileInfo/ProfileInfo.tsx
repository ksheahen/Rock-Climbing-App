import { Pressable, Text, View } from "react-native";
import Icon from "react-native-remix-icon";
import { styles } from "./ProfileInfo.styles";

// interface ProfileInfoProps {
//   user?: {
//     name: string;
//   };
// }

// function ProfileInfoComponent({ user }: ProfileInfoProps) {
// const navigation = useNavigation();
function ProfileInfo() {
	return (
		// <View style={styles.container}>
		//   <View style={styles.headerRow}>
		//     <View style={styles.avatarPlaceholder} />
		//     <Pressable
		//       style={styles.editButton}
		//       onPress={() => navigation.navigate("edit-profile" as never)}
		//     >
		//       <Text style={styles.editButtonText}>Edit Profile</Text>
		//     </Pressable>
		//   </View>
		//   <Text style={styles.name}>{user?.name ?? "Your name here"}</Text>
		// </View>
		<View style={styles.container}>
			<View style={styles.headerRow}>
				<View style={styles.avatarPlaceholder} />
				<Pressable style={styles.editButton}>
					<Text style={styles.editButtonText}>Edit Profile</Text>
				</Pressable>
			</View>
			<Text style={styles.name}>Thane Tate</Text>
			<View style={styles.socialRow}>
				<Icon name="instagram-line" size="20" />
				<Text style={styles.handle}>thanefalls</Text>
			</View>
		</View>
	);
}

export default ProfileInfo;
