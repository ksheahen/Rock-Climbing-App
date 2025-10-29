import {
	ActivityIndicator,
	Alert,
	Button,
	FlatList,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native";
import AttemptComponent from "../(components)/attempt";
import BackbtnComponent from "../(components)/backbtn";
import CategoryComponent from "../(components)/category";
import CompleteComponent from "../(components)/complete";
import DateTimeComponent from "../(components)/datetime";
import DescriptionComponent from "../(components)/description";
import DifficultyComponent from "../(components)/difficulty";
import LineComponent from "../(components)/line";
import RatingComponent from "../(components)/rating";
import SettingsbtnComponent from "../(components)/settingsbtn";
import TypeComponent from "../(components)/type";
import styles from "../styles/individual-climb-page";

//create a test component that collects users data
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

function IndividualClimbPage() {
  // ALL TO INPUT THE FORM
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  //ticket to interact with sql database
  const db = useSQLiteContext();

  const handleSubmit = async () => {
    try {
      //validation logic
      //todo

      //insert data into db
      // ? stops a sql injection
      await db.runAsync(
        `
			INSERT INTO users (firstname, lastname, email, phone) VALUES (?, ?, ?, ?)`,
        [form.firstName, form.lastName, form.email, form.phone],
      );

      Alert.alert("Success", "User added succesfully");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "an error happened when inserting user into db.";
      Alert.alert("Error", errorMessage);
    }
  };

  // DISPLAY THE FORM
  const [users, setusers] = useState<
    {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    }[]
  >([]);
  const [isloading, setisloading] = useState(true);
  // const db = useSQLiteContext();

  const loadUsers = async () => {
    try {
      const results = await db.getAllAsync(`SELECT * FROM users`);
      setusers(
        results as {
          id: number;
          firstName: string;
          lastName: string;
          email: string;
          phone: string;
        }[],
      );
    } catch (error) {
      console.error("db error");
    } finally {
      setisloading(false);
    }
  };

  //trigger the data loading
  useEffect(() => {
    loadUsers();
  }, []);

  if (isloading) {
    return <ActivityIndicator size={"large"}></ActivityIndicator>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.leftright_container}>
        <View style={styles.left}>
          <BackbtnComponent />
        </View>
        <View style={styles.right}>
          <SettingsbtnComponent />
        </View>
      </View>
      <View style={styles.media}></View>
      <CategoryComponent />
      <LineComponent />
      <TypeComponent />
      <LineComponent />
      <CompleteComponent />
      <LineComponent />
      <AttemptComponent />
      <LineComponent />
      <DifficultyComponent />
      <LineComponent />
      <RatingComponent />
      <LineComponent />
      <DateTimeComponent />
      <LineComponent />
      <DescriptionComponent />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={form.firstName}
        onChangeText={(text) => setForm({ ...form, firstName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={form.lastName}
        onChangeText={(text) => setForm({ ...form, lastName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={form.phone}
        onChangeText={(text) => setForm({ ...form, phone: text })}
      />
      <Button title="Add User" onPress={handleSubmit} />

      <Text>-------------</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
            }}
          >
            <Text>
              {item.firstName} {item.lastName}
            </Text>
            <Text>{item.email}</Text>
            <Text>{item.phone}</Text>
          </View>
        )}
        nestedScrollEnabled={true}
        ListEmptyComponent={<Text>no users found</Text>}
      />
    </ScrollView>
  );
}

export default IndividualClimbPage;
