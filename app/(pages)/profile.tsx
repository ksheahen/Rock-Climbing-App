import { ProfileInfo } from "@/components";
import { ClimbData } from "@/components/ClimbCard/ClimbCard";
import ClimbHistory from "@/components/ClimbHistory/ClimbHistory";
import AchievementsRow from "@/components/EarnedAcheivements/EarnedAcheivements";
import Line from "@/components/Line/Line";
import TimeframeFilter from "@/components/TimeframeFilter/TimeframeFilter";
import { syncAchievementsForUser } from "@/services/achievementService";
import { syncLocalClimbsSQLite } from "@/services/climbService";
import { supabase } from "@/services/supabaseClient";
import { LocalClimb } from "@/types/LocalClimb";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import styles from "../styles/profile.styles";

// import { useFocusEffect } from "expo-router";
// import { useCallback, useEffect, useState } from "react";
// import { Alert, View } from "react-native";
// import { getClimbsBySession } from "../../services/climbService";
// import { getSessionsByUser } from "../../services/sessionService";
// import { getUserById } from "../../services/userService";
// import type { User } from "../../types/User";
// import { useSession } from "../context/SessionContext";

type EarnedAchievement = {
  achievement_id: string;
  name: string;
  description: string | null;
  badge_icon: string | null;
  earned_at: string;
};
function safeDate(datetime: string | null | undefined): Date | null {
  if (!datetime?.trim()) return null;
  const d = new Date(datetime);
  return isNaN(d.getTime()) ? null : d;
}

function ProfilePage() {
  // const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState<User | null>(null);
  // const [climbs, setClimbs] = useState<Climb[]>([]);
  const [timeframe, setTimeframe] = useState<"day" | "week" | "month" | "all">(
    "all",
  );
  const db = useSQLiteContext();
  const [climbsArr, setClimbsArr] = useState<LocalClimb[]>([]);
  const [achievements, setAchievements] = useState<EarnedAchievement[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async (showLoader = true, showAlert = true) => {
    if (isSyncing) return;

    await new Promise((resolve) => setTimeout(resolve, 50));

    if (showLoader) {
      setIsSyncing(true);
    }

    try {
      await syncLocalClimbsSQLite(db, showAlert);
    } finally {
      if (showLoader) {
        setIsSyncing(false);
      }
    }
  };

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

  function filterClimbsByTimeframe(climbs: ClimbData[], tf: typeof timeframe) {
    const now = new Date();

    return climbs.filter((c, idx) => {
      if (!c.datetime) {
        console.warn(
          `[filterClimbsByTimeframe] Row ${idx} has null/empty datetime:`,
          c,
        );
        return false; // skip rows without a valid datetime
      }

      const climbDate = new Date(c.datetime);
      if (isNaN(climbDate.getTime())) {
        console.warn(
          `[filterClimbsByTimeframe] Row ${idx} has invalid date:`,
          c,
        );
        return false;
      }

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
          await syncLocalClimbsSQLite(db, false);
          const {
            data: { user },
          } = await supabase.auth.getUser();

          if (user) {
            await syncAchievementsForUser(db, user.id);
          }

          const rows = await db.getAllAsync(
            `SELECT * FROM log_climb5 WHERE deleted = 0 ORDER BY datetime DESC`,
            [],
          );
          if (!mounted) return;
          const safeRows = (rows as ClimbData[]).map((c) => ({
            ...c,
            datetime:
              c.datetime && c.datetime.trim() !== "" ? c.datetime : null,
          }));
          setClimbsArr(Array.isArray(rows) ? (rows as LocalClimb[]) : []);

          const achievementRows = user
            ? await db.getAllAsync(
                `SELECT
                    a.achievement_id,
                    a.name,
                    a.description,
                    a.badge_icon,
                    ua.earned_at
                 FROM user_achievement ua
                 JOIN achievement a
                   ON a.achievement_id = ua.achievement_id
                 WHERE ua.deleted = 0
                   AND ua.user_id = ?
                 ORDER BY ua.earned_at DESC;`,
                [user.id],
              )
            : [];
          if (!mounted) return;
          setAchievements(
            Array.isArray(achievementRows)
              ? (achievementRows as EarnedAchievement[])
              : [],
          );
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

  const handleDeleteClimb = async (id: number) => {
    try {
      await db.runAsync(
        `UPDATE log_climb5 SET deleted = 1, synced = 0 WHERE id = ?`,
        [id],
      );

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await syncAchievementsForUser(db, user.id);

        const achievementRows = await db.getAllAsync(
          `SELECT
              a.achievement_id,
              a.name,
              a.description,
              a.badge_icon,
              ua.earned_at
           FROM user_achievement ua
           JOIN achievement a
             ON a.achievement_id = ua.achievement_id
           WHERE ua.deleted = 0
             AND ua.user_id = ?
           ORDER BY ua.earned_at DESC;`,
          [user.id],
        );

        setAchievements(
          Array.isArray(achievementRows)
            ? (achievementRows as EarnedAchievement[])
            : [],
        );
      }

      setClimbsArr((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Failed to delete climb:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <ProfileInfo onSync={handleSync} isSyncing={isSyncing} />
        <AchievementsRow achievements={achievements} />
        <Line />
        <TimeframeFilter dates={timeframe} onChange={setTimeframe} />
        <ClimbHistory
          dates={timeframe}
          climbs={filteredClimbs}
          onDelete={handleDeleteClimb}
        />
      </View>

      {isSyncing && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 9999,
          }}
          pointerEvents="auto"
        >
          <ActivityIndicator size="large" color="#fff" />
          <Text
            style={{
              color: "white",
              marginTop: 10,
              fontSize: 16,
            }}
          >
            Syncing climbs...
          </Text>
        </View>
      )}
    </View>
  );
}

export default ProfilePage;
