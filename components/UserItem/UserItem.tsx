import React from "react";
import { Text, Image, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/core";
import styles from "./styles";
import { Auth, DataStore } from "aws-amplify";
import { ChatRoom, User, ChatRoomUser } from "../../src/models";

export default function UserItem({ user, chatRooms }) {
  const navigation = useNavigation();

  const getChatRoom = async () => {
    // return console.log({ user, chatRooms });

    const authUser = await Auth.currentAuthenticatedUser();
    const authUserID = authUser.attributes.sub;
    const chatRoomUsers = await DataStore.query(ChatRoomUser);
    // const authChatRooms = chatRoomUsers
    //   .filter((o) => authUserID == o.user.id)
    //   .map((c) => c.chatroom);

    // const userChatRooms = chatRoomUsers
    //   .filter((o) => authUserID == o.user.id)
    //   .map((c) => c.chatroom);

    // return console.log({ userChatRooms, authChatRooms, chatRooms });
    return console.log({
      chatRoomUsers: chatRoomUsers.filter(
        (cru) =>
          chatRooms.map((a) => a.id).includes(cru.chatroom.id) &&
          cru.user.id == user.id
      ),
    });
    let chatroom = null;
    authChatRooms.forEach((authChatRoom) => {
      userChatRooms.forEach((userChatRoom) => {
        //  console.log(authChatRoom.id == userChatRoom.id);
        if (authChatRoom.id == userChatRoom.id) {
          chatroom = authChatRoom;
        }
      });
    });

    return chatroom ? chatroom : await getNewChatRoom(authUserID);
  };
  const getNewChatRoom = async (authUserID: String) => {
    const dbUser = await DataStore.query(User, authUserID);
    // console.log({ dbUser });
    if (!dbUser) {
      console.log("no dbuser! logging out ");

      return Auth.signOut();
    }
    const newChatRoom = await DataStore.save(new ChatRoom({ newMessages: 0 }));

    await DataStore.save(
      new ChatRoomUser({
        user: dbUser,
        chatroom: newChatRoom,
      })
    );
    // connect clicked user with the chat room
    await DataStore.save(
      new ChatRoomUser({
        user,
        chatroom: newChatRoom,
      })
    );
    return newChatRoom;
  };
  const onPress = async () => {
    const chatroom = await getChatRoom();
    return;
    // console.log(
    //   authUser,
    //   "/////////////////////////////////////////*************************"
    // );
    // if (chatRoom) return chatRoom;

    // TODO if there is already a chat room between these 2 users
    // then redirect to the existing chat room
    // otherwise, create a new chatroom with these users.

    // Create a chat room

    // connect authenticated user with the chat room

    navigation.navigate("ChatRoom", { id: chatroom.id });
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image source={{ uri: user.imageUri }} style={styles.image} />

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user.name}</Text>
        </View>
      </View>
    </Pressable>
  );
}
