import { ProfileInfo } from "@/components";
import ClimbHistory from "@/components/ClimbHistory/ClimbHistory";
import Line from "@/components/Line/Line";
import TimeframeFilter from "@/components/TimeframeFilter/TimeframeFilter";
import { LocalClimb } from "@/types/LocalClimb";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { View } from "react-native";
import styles from "../styles/profile.styles";

// import { useFocusEffect } from "expo-router";
// import { useCallback, useEffect, useState } from "react";
// import { Alert, View } from "react-native";
// import { getClimbsBySession } from "../../services/climbService";
// import { getSessionsByUser } from "../../services/sessionService";
// import { getUserById } from "../../services/userService";
// import type { User } from "../../types/User";
// import { useSession } from "../context/SessionContext";

function ProfilePage() {
  // const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState<User | null>(null);
  // const [climbs, setClimbs] = useState<Climb[]>([]);
  const [timeframe, setTimeframe] = useState<"day" | "week" | "month" | "all">(
    "day",
  );
  const db = useSQLiteContext();
  const [climbsArr, setClimbsArr] = useState<LocalClimb[]>([]);
  // const session = useSession();
  // useEffect(() => {
  //   if (!session?.user) return;
  //   fetchUserAndClimbs();
  // }, [session, timeframe]);

  // useFocusEffect(
  //   useCallback(() => {
  //     if (!session?.user) return;
  //     fetchUserAndClimbs();
  //   }, [session, timeframe]),
  // );

  // async function fetchUserAndClimbs() {
  //   try {
  //     setLoading(true);

  //     const userData = await getUserById(session!.user.id);
  //     if (!userData) throw new Error("User not found");
  //     setUser(userData);

  //     const userSessions = await getSessionsByUser(session!.user.id);
  //     const allClimbs: Climb[] = [];

  //     for (const s of userSessions) {
  //       const sessionClimbs = await getClimbsBySession(s.session_id);
  //       const formattedClimbs = sessionClimbs.map((c: any) => {
  //         const dateObj = new Date(c.datetime);
  //         return {
  //           date: dateObj.toISOString(),
  //           time: dateObj.toLocaleTimeString([], {
  //             hour: "2-digit",
  //             minute: "2-digit",
  //           }),
  //           grade: c.difficulty,
  //           stars: c.rating,
  //           sub: c.attempts === 1 ? "Flash" : `${c.attempts} Tries`,
  //         };
  //       });
  //       allClimbs.push(...formattedClimbs);
  //     }

  //     const filteredClimbs = filterClimbsByTimeframe(allClimbs, timeframe);

  //     const displayClimbs = filteredClimbs.map((c) => ({
  //       ...c,
  //       displayDate: new Date(c.date).toLocaleDateString(undefined, {
  //         year: "numeric",
  //         month: "short",
  //         day: "numeric",
  //       }),
  //     }));
  //     setClimbs(displayClimbs);
  //   } catch (error) {
  //     if (error instanceof Error) Alert.alert(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  function filterClimbsByTimeframe(climbs: LocalClimb[], tf: typeof timeframe) {
    const now = new Date();

    return climbs.filter((c) => {
      const climbDate = new Date(c.datetime);
      switch (tf) {
        case "day":
          return (
            climbDate.getFullYear() === now.getFullYear() &&
            climbDate.getMonth() === now.getMonth() &&
            climbDate.getDate() === now.getDate()
          );
        case "week": {
          const weekAgo = new Date();
          weekAgo.setDate(now.getDate() - 7);
          return climbDate >= weekAgo && climbDate <= now;
        }
        case "month": {
          const monthAgo = new Date(now);
          monthAgo.setMonth(now.getMonth() - 1);
          return climbDate >= monthAgo && climbDate <= now;
        }
        default:
          return true;
      }
    });
  }

  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      const loadClimbs = async () => {
        try {
          const rows = await db.getAllAsync(
            `SELECT * FROM log_climb3 ORDER BY datetime DESC`,
            [],
          );
          if (!mounted) return;
          setClimbsArr(Array.isArray(rows) ? (rows as LocalClimb[]) : []);
        } catch (err) {
          console.error("Failed to load climbs on focus", err);
        }
      };
      loadClimbs();
      return () => {
        mounted = false;
      };
    }, [db]),
  );

  const filteredClimbs = filterClimbsByTimeframe(climbsArr, timeframe);

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <ProfileInfo />
        <Line />
        <TimeframeFilter dates={timeframe} onChange={setTimeframe} />
        {/* <Line /> */}
        <ClimbHistory dates={timeframe} climbs={filteredClimbs} />
      </View>
    </View>
  );
}

export default ProfilePage;
