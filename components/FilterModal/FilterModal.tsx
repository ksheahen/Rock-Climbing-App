import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./FilterModal.styles";

export interface FilterOptions {
  grades: string[];
  tries: string[];
  stars: number[];
  dateRange: "today" | "week" | "month" | "all";
}

export interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

const GRADES = [
  // Boulder grades
  "4a/V0",
  "4b/V0",
  "4c/V0",
  "5a/V1",
  "5b/V1",
  "5c/V2",
  "6a/V3",
  "6a+/V3",
  "6b/V4",
  "6b+/V4",
  "6c/V5",
  "6c+/V5",
  "7a/V6",
  "7a+/V7",
  "7b/V8",
  "7b+/V8",
  "7c/V9",
  "7c+/V10",
  "8a/V11",
  "8a+/V12",
  "8b/V13",
  "8b+/V14",
  "8c/V15",
  "8c+/V16",
  "9a/V17",
  // Route grades
  "5c/5.8",
  "6a/5.9",
  "6a+/5.10a",
  "6b/5.10b",
  "6b+/5.10c",
  "6c/5.10d",
  "6c+/5.11a",
  "7a/5.11b",
  "7a+/5.11c",
  "7b/5.11d",
  "7b+/5.12a",
  "7c/5.12b",
  "7c+/5.12c",
  "8a/5.12d",
  "8a+/5.13a",
  "8b/5.13b",
  "8b+/5.13c",
  "8c/5.13d",
];
const TRIES_OPTIONS = [
  { label: "1-2 Tries", value: "1-2" },
  { label: "3-5 Tries", value: "3-5" },
  { label: "6-10 Tries", value: "6-10" },
  { label: "10+ Tries", value: "10+" },
];
const STAR_OPTIONS = [1, 2, 3];
const DATE_RANGES = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "All Time", value: "all" },
] as const;

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
  currentFilters,
}) => {
  const [selectedGrades, setSelectedGrades] = useState<string[]>(
    currentFilters.grades,
  );
  const [selectedTries, setSelectedTries] = useState<string[]>(
    currentFilters.tries,
  );
  const [selectedStars, setSelectedStars] = useState<number[]>(
    currentFilters.stars,
  );
  const [selectedDateRange, setSelectedDateRange] = useState<
    "today" | "week" | "month" | "all"
  >(currentFilters.dateRange);

  const toggleGrade = (grade: string) => {
    setSelectedGrades((prev) =>
      prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade],
    );
  };

  const toggleTries = (tries: string) => {
    setSelectedTries((prev) =>
      prev.includes(tries) ? prev.filter((t) => t !== tries) : [...prev, tries],
    );
  };

  const toggleStar = (star: number) => {
    setSelectedStars((prev) =>
      prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star],
    );
  };

  const handleReset = () => {
    setSelectedGrades([]);
    setSelectedTries([]);
    setSelectedStars([]);
    setSelectedDateRange("all");
  };

  const handleApply = () => {
    onApply({
      grades: selectedGrades,
      tries: selectedTries,
      stars: selectedStars,
      dateRange: selectedDateRange,
    });
    onClose();
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedGrades.length > 0) count++;
    if (selectedTries.length > 0) count++;
    if (selectedStars.length > 0) count++;
    if (selectedDateRange !== "all") count++;
    return count;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable
          style={styles.modalContent}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.modalBody}
            showsVerticalScrollIndicator={false}
          >
            {/* Date Range Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Date Range</Text>
              <View style={styles.optionsRow}>
                {DATE_RANGES.map((range) => (
                  <TouchableOpacity
                    key={range.value}
                    style={[
                      styles.optionChip,
                      selectedDateRange === range.value &&
                        styles.optionChipSelected,
                    ]}
                    onPress={() => setSelectedDateRange(range.value)}
                  >
                    <Text
                      style={[
                        styles.optionChipText,
                        selectedDateRange === range.value &&
                          styles.optionChipTextSelected,
                      ]}
                    >
                      {range.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Difficulty/Grade Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Difficulty (Grade)</Text>
              <View style={styles.optionsGrid}>
                {GRADES.map((grade) => (
                  <TouchableOpacity
                    key={grade}
                    style={[
                      styles.optionChip,
                      selectedGrades.includes(grade) &&
                        styles.optionChipSelected,
                    ]}
                    onPress={() => toggleGrade(grade)}
                  >
                    <Text
                      style={[
                        styles.optionChipText,
                        selectedGrades.includes(grade) &&
                          styles.optionChipTextSelected,
                      ]}
                    >
                      {grade}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Tries Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Number of Tries</Text>
              <View style={styles.optionsRow}>
                {TRIES_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.optionChip,
                      selectedTries.includes(option.value) &&
                        styles.optionChipSelected,
                    ]}
                    onPress={() => toggleTries(option.value)}
                  >
                    <Text
                      style={[
                        styles.optionChipText,
                        selectedTries.includes(option.value) &&
                          styles.optionChipTextSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Star Rating Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Star Rating</Text>
              <View style={styles.optionsRow}>
                {STAR_OPTIONS.map((star) => (
                  <TouchableOpacity
                    key={star}
                    style={[
                      styles.optionChip,
                      selectedStars.includes(star) && styles.optionChipSelected,
                    ]}
                    onPress={() => toggleStar(star)}
                  >
                    <Ionicons
                      name="star"
                      size={16}
                      color={selectedStars.includes(star) ? "#FFF" : "#FFD700"}
                    />
                    <Text
                      style={[
                        styles.optionChipText,
                        selectedStars.includes(star) &&
                          styles.optionChipTextSelected,
                      ]}
                    >
                      {star}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>
                Apply{" "}
                {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
