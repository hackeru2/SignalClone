import React, { useState, useEffect } from "react";

import { View, StyleSheet, FlatList, Text, Pressable } from "react-native";
import { DataStore } from "@aws-amplify/datastore";

import UserItem from "../components/UserItem";
import { ChatRoom, ChatRoomUser, User } from "../src/models";
import { Auth } from "aws-amplify";

export default function UsersScreen(props: Object) {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const userData = await Auth.currentAuthenticatedUser();
      console.log({ userData });
      const chatRooms = (await DataStore.query(ChatRoomUser))
        .filter(
          (chatRoomUser) => chatRoomUser.user.id === userData.attributes.sub
        )
        .map((chatRoomUser) => chatRoomUser.chatroom);

      // console.log({ chatRooms });
      // if (!chatRooms.length) return
      setChatRooms(chatRooms);
      //console.log({ navigation, props });
    };
    fetchUsers();
  }, [users]);

  const filterUsers = async (dbUsers) => {
    const authUser = await Auth.currentAuthenticatedUser();
    dbUsers = dbUsers.filter((usr) => usr.id != authUser.attributes.sub);
    setUsers(dbUsers);
  };
  useEffect(() => {
    DataStore.query(User).then(filterUsers);
  }, []);
  const logOut = () => {
    Auth.signOut();
  };

  return (
    <View style={styles.page}>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserItem  chatRooms={chatRooms} user={item} />}
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
