import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";

type props = {
  setPlaceboDays: (p: number) => void;
  placeboDays: number;
};

export default function PlaceboDays({ setPlaceboDays, placeboDays }: props) {
  return (
    <View style={styles.placeboDaysArea}>
      <Text variant="bodyLarge">Placebo days:</Text>
      <View style={styles.placeboDaysButtons}>
        <IconButton
          onPress={() => setPlaceboDays(placeboDays + 1)}
          icon="plus"
          disabled={placeboDays < 7 ? false : true}
        ></IconButton>
        <Text>{placeboDays}</Text>
        <IconButton
          onPress={() => setPlaceboDays(placeboDays - 1)}
          icon="minus"
          disabled={placeboDays > 0 ? false : true}
        ></IconButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  placeboDaysArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  placeboDaysButtons: {
    alignItems: "center",
  },
});
