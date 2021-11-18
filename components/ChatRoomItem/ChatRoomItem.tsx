import React, { useEffect, useState } from "react";
import { Text, Image, View, Pressable, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/core";
import styles from "./styles";
import { ChatRoomUser, Message, User } from "../../src/models";
import { Auth, DataStore } from "aws-amplify";

export default function ChatRoomItem({ chatRoom }) {
  // const user = chatRoom?.users[1];
  const [user, setUser] = useState<User | null>(null);
  const [lastMessage, setLastMessage] = useState<Message | undefined>(
    undefined
  );
  // const [users, setUsers] = useState<User[]>([]);
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("ChatRoom", { id: chatRoom.id });
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const fetchedUsers = (await DataStore.query(ChatRoomUser))
        .filter((chatRoomUser) => chatRoomUser.chatroom.id === chatRoom.id)
        .map((chatRoomUser) => chatRoomUser.user);

      // setUsers(fetchedUsers);
      setUser(
        fetchedUsers.find((user) => user.id != authUser.attributes.sub) || null
      );
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    const lmID = chatRoom.chatRoomLastMessageId;
    console.log({ chatRoom, lmID });
    if (!lmID) return;
    DataStore.query(Message, lmID).then(setLastMessage);
  }, []);
  if (!user) return <ActivityIndicator />;
  // return <Text>{JSON.stringify(chatRoom)}</Text>;
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image source={{ uri: user.imageUri }} style={styles.image} />

      {chatRoom.newMessages > 0 && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
        </View>
      )}

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.text}>{lastMessage?.createdAt}</Text>
        </View>
        <Text numberOfLines={1} style={styles.text}>
          {lastMessage?.content}
        </Text>
      </View>
    </Pressable>
  );
}
