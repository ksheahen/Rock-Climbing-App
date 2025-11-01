import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { useSession } from "../context/SessionContext";
import { getUserById } from "../../services/userService";
import { getSessionsByUser } from "../../services/sessionService";
import { getClimbsBySession } from "../../services/climbService";
import { supabase } from "../../services/supabaseClient";

import ButtonComponent from "../(components)/button";
import ClimbHistoryComponent, { Climb } from "../(components)/climbhistory";
import LineComponent from "../(components)/line";
import ProfileInfoComponent from "../(components)/profileinfo";
import TimeframeFilterComponent from "../(components)/timeframefilter";

import styles from "../styles/profile";
import type { User } from "../../types/User";

function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [climbs, setClimbs] = useState<Climb[]>([]);
  const [timeframe, setTimeframe] = useState<"day" | "week" | "month" | "all">("all");
  const session = useSession();
  useEffect(() => {
    if (!session?.user) return;
    fetchUserAndClimbs();
  }, [session, timeframe]);

  async function fetchUserAndClimbs() {
    try {
      setLoading(true);

      const userData = await getUserById(session!.user.id);
      if (!userData) throw new Error("User not found");
      setUser(userData);

      const userSessions = await getSessionsByUser(session!.user.id);
      const allClimbs: Climb[] = [];

      for (const s of userSessions) {
        const sessionClimbs = await getClimbsBySession(s.session_id);
        const formattedClimbs = sessionClimbs.map((c: any) => {
        const dateObj = new Date(c.datetime);
        return {
          date: dateObj.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
          time: dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          grade: c.difficulty,
          stars: c.rating,
          sub: c.attempts === 1 ? "Flash" : `${c.attempts} Tries`,
        };
      });
        allClimbs.push(...formattedClimbs);
      }

      const filteredClimbs = filterClimbsByTimeframe(allClimbs, timeframe);
      setClimbs(filteredClimbs);
    } catch (error) {
      if (error instanceof Error) Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  function filterClimbsByTimeframe(climbs: Climb[], tf: typeof timeframe) {
    if (tf === "all") return climbs;
    const now = new Date();
    return climbs.filter(c => {
      const climbDate = new Date(c.date);
      switch (tf) {
        case "day":
          return (
            climbDate.getFullYear() === now.getFullYear() &&
            climbDate.getMonth() === now.getMonth() &&
            climbDate.getDate() === now.getDate()
          );
        case "week": {
          const weekAgo = new Date(now);
          weekAgo.setDate(now.getDate() - 7);
          // Only include climbs from the last 7 days, excluding today
          return (
            climbDate > weekAgo &&
            !(climbDate.getFullYear() === now.getFullYear() &&
              climbDate.getMonth() === now.getMonth() &&
              climbDate.getDate() === now.getDate()) &&
            climbDate < now
          );
        }
        case "month": {
          const monthAgo = new Date(now);
          monthAgo.setMonth(now.getMonth() - 1);
          return climbDate >= monthAgo && climbDate <= now;
        }
      }
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        {user && <ProfileInfoComponent user={user} />}
        <LineComponent />
        <TimeframeFilterComponent timeframe={timeframe} setTimeframe={setTimeframe} />
        <LineComponent />
        <ClimbHistoryComponent climbs={climbs} timeframe={timeframe} />
        <ButtonComponent title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
}

export default ProfilePage;





