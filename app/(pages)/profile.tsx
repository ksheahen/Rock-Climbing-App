import { supabase } from "@/services/supabaseClient";
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import ButtonComponent from "../(components)/button";
import ClimbHistoryComponent from "../(components)/climbhistory";
import LineComponent from "../(components)/line";
import ProfileInfoComponent from "../(components)/profileinfo";
import TimeframeFilterComponent from "../(components)/timeframefilter";
import { useSession } from "../context/SessionContext";
import styles from "../styles/profile";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const session = useSession();
  useEffect(() => {
    if (!session) {
      console.log("Session undefined");
    }
    if (session) getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("user")
        .select("email")
        .eq("user_id", session.user.id)
        .single();

      console.log("Supabase response:", { data, error, status });
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setEmail(data.email);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <ProfileInfoComponent />
        <LineComponent />
        <TimeframeFilterComponent />
        <LineComponent />
        <ClimbHistoryComponent />
        {/* Here for testing :) */}
        <ButtonComponent
          title={"Sign Out"}
          onPress={() => supabase.auth.signOut()}
        />
        <Text>Email: {email}</Text>
      </View>
    </View>
  );
}
