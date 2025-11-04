import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Icon from "react-native-remix-icon";
import styles from "./Rating.styles";

const STAR_COLOR = "#F5C542";

interface RatingComponentProps {
  selectedProp: number;
  onSelectedChange?: (value: number) => void;
}

function Rating({ selectedProp, onSelectedChange }: RatingComponentProps) {
  const [rating, setRating] = useState(selectedProp);

  const handlePress = (value: number) => {
    const next = value;
    setRating(next);
    onSelectedChange?.(next);
  };

  // Sync internal state with prop whenever the prop changes
  useEffect(() => {
    setRating(selectedProp);
  }, [selectedProp]);

  // Notify parent whenever the rating changes
  useEffect(() => {
    if (onSelectedChange) {
      onSelectedChange(rating);
    }
  }, [rating, onSelectedChange]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rating</Text>

      <View style={styles.stars_container}>
        {[1, 2, 3].map((value, idx) => (
          <Pressable
            key={value}
            onPress={() => handlePress(value)}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={`Rate ${value} star${value > 1 ? "s" : ""}`}
          >
            <Icon
              name={rating >= value ? "star-fill" : "star-line"}
              size={28}
              color={STAR_COLOR}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default Rating;
