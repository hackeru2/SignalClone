import React, { useEffect, useState } from "react";

import {
  Text,
  Image,
  View,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import ChatRoomItem from "../components/ChatRoomItem";

//import chatRoomsData from "../assets/dummy-data/ChatRooms";
import Auth from "@aws-amplify/auth";
import { ChatRoom, ChatRoomUser } from "../src/models";
import { DataStore } from "aws-amplify";

export default function HomeScreen(props) {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const userData = await Auth.currentAuthenticatedUser();
      console.log({ userData });
      const chatRooms = (await DataStore.query(ChatRoomUser))
        .filter(
          (chatRoomUser) => chatRoomUser.user.id === userData.attributes.sub
        )
        .map((chatRoomUser) => chatRoomUser.chatroom);

      console.log({ chatRooms });
      // if (!chatRooms.length) return
      setChatRooms(chatRooms);
      //console.log({ navigation, props });
    };
    fetchUsers();
  }, []);
  const toUsersScreen = () => {
    props.navigation.replace("UsersScreen");
  };
  const logOut = () => {
    Auth.signOut();
  };
  if (!chatRooms.length) {
    return (
      <Pressable
        onPress={toUsersScreen}
        style={{
          backgroundColor: "lightgreen",
          height: 50,
          margin: 10,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>got to users screen</Text>
      </Pressable>
    );
  }
  return (
    <View style={styles.page}>
      <FlatList
        data={chatRooms}
        renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
        showsVerticalScrollIndicator={false}
      />
      <Pressable
        onPress={logOut}
        style={{
          backgroundColor: "red",
          height: 50,
          margin: 10,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});
