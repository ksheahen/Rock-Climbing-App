import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Icon from "react-native-remix-icon";
import styles from "../styles/rating";

const STAR_COLOR = "#F5C542";

function RatingComponent({
  initial = 0,
  onChange,
}: {
  initial?: number;
  onChange?: (value: number) => void; // optional callback for parent
}) {
  const [rating, setRating] = useState(initial);

  const handlePress = (value: number) => {
    const next = value;
    setRating(next);
    onChange?.(next);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rating</Text>

      <View style={styles.stars_container}>
        {[1, 2, 3, 4, 5].map((value, idx) => (
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

export default RatingComponent;

