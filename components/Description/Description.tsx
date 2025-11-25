import { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { styles } from "./Description.styles";

function Description() {
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [draft, setDraft] = useState("");

  const openModal = () => {
    setDraft(description);
    setModalVisible(true);
  };

  const save = () => {
    setDescription(draft);
    setModalVisible(false);
  };

  const cancel = () => {
    setModalVisible(false);
    setDraft(description);
  };

  return (
    <>
      {/* Row with label + preview box */}
      <View style={styles.container}>
        <Text style={styles.title}>Description</Text>

        <TouchableOpacity
          style={styles.preview_container}
          onPress={openModal}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.preview_text,
              !description && styles.preview_placeholder,
            ]}
            numberOfLines={2}
          >
            {description || "Add description..."}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modal_backdrop}>
          <View style={styles.modal_card}>
            <Text style={styles.modal_title}>Description</Text>

            <TextInput
              value={draft}
              onChangeText={setDraft}
              style={styles.modal_input}
              multiline
              maxLength={150}
              textAlignVertical="top"
            />

            <Text style={styles.counter}>{draft.length}/150</Text>

            <View style={styles.modal_actions}>
              <Pressable onPress={cancel} style={styles.btn_secondary}>
                <Text>Cancel</Text>
              </Pressable>

              <Pressable onPress={save} style={styles.btn_primary}>
                <Text style={{ color: "white" }}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

export default Description;
