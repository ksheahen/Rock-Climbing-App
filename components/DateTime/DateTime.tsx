import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useMemo, useState } from "react";
import { FlatList, Modal, Platform, Pressable, Text, View } from "react-native";
import styles from "./DateTime.styles";

function formatDate(d: Date) {
  // No weekday
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
function formatTime(d: Date) {
  return d.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}
function formatChip(d: Date) {
  return `${formatDate(d)} • ${formatTime(d)}`;
}

// Build 15-min options 00:00 → 23:45
function buildTimeOptions() {
  const res: { label: string; minutes: number }[] = [];
  for (let m = 0; m < 24 * 60; m += 15) {
    const h = Math.floor(m / 60);
    const mm = m % 60;
    res.push({
      minutes: m,
      label: new Date(2000, 0, 1, h, mm).toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
      }),
    });
  }
  return res;
}

type Props = {
  initial?: Date;
  onChange?: (value: Date) => void;
  editToggle: boolean;
};

function DateTime({ initial, onChange, editToggle }: Props) {
  const [value, setValue] = useState<Date>(initial ?? new Date());
  const [showModal, setShowModal] = useState(false); // single modal for both date+time (iOS) or time (Android)
  const timeOptions = useMemo(buildTimeOptions, []);
  const activeMinutes = value.getHours() * 60 + value.getMinutes();

  const commit = (next: Date) => {
    setValue(next);
    onChange?.(next);
  };

  const openPicker = () => {
    if (Platform.OS === "android") {
      // 1) Android date dialog first
      DateTimePickerAndroid.open({
        mode: "date",
        value,
        onChange: (event, picked) => {
          if (event.type !== "set" || !picked) return;
          const next = new Date(value);
          next.setFullYear(
            picked.getFullYear(),
            picked.getMonth(),
            picked.getDate(),
          );
          commit(next);
          // 2) Then open modal with time list
          setShowModal(true);
        },
      });
    } else {
      // iOS: open combined modal (inline date + time list)
      setShowModal(true);
    }
  };

  // iOS inline date changes live inside the modal
  const onIOSDateChange = (_: any, picked?: Date) => {
    if (!picked) return;
    const next = new Date(value);
    next.setFullYear(picked.getFullYear(), picked.getMonth(), picked.getDate());
    commit(next);
  };

  const selectTimeMinutes = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const next = new Date(value);
    next.setHours(h, m, 0, 0);
    commit(next);
  };

  const nearest15 = activeMinutes - (activeMinutes % 15);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Date/Time</Text>

      {/* SINGLE CHIP */}
      {/* when editToggle = true, show everthing */}
      {/* when editToggle = false, show just view mode */}
      {editToggle ? (
        <Pressable style={styles.pillCompact} onPress={openPicker} hitSlop={8}>
          <Text style={styles.pillCompactText} numberOfLines={1}>
            {formatChip(value)}
          </Text>
        </Pressable>
      ) : (
        <View style={styles.pillCompact} hitSlop={8}>
          <Text style={styles.pillCompactText} numberOfLines={1}>
            {formatChip(value)}
          </Text>
        </View>
      )}
      {/* ONE MODAL FOR BOTH (iOS shows date+time; Android shows time only after date chosen) */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Select date & time</Text>

            {Platform.OS === "ios" && (
              <DateTimePicker
                mode="date"
                value={value}
                display="inline"
                onChange={onIOSDateChange}
                style={{ alignSelf: "stretch" }}
              />
            )}

            <FlatList
              data={timeOptions}
              keyExtractor={(it) => String(it.minutes)}
              initialScrollIndex={Math.floor(activeMinutes / 15)}
              getItemLayout={(_, index) => ({
                length: 44,
                offset: 44 * index,
                index,
              })}
              renderItem={({ item }) => {
                const isActive = item.minutes === nearest15;
                return (
                  <Pressable
                    onPress={() => selectTimeMinutes(item.minutes)}
                    style={[styles.timeRow, isActive && styles.timeRowActive]}
                  >
                    <Text
                      style={[
                        styles.timeRowText,
                        isActive && styles.timeRowTextActive,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                );
              }}
              style={{ alignSelf: "stretch" }}
            />

            <View style={styles.modalActions}>
              <Pressable
                onPress={() => setShowModal(false)}
                style={styles.modalActionBtn}
              >
                <Text style={styles.modalActionText}>Done</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default DateTime;
