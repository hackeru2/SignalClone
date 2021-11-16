import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/core";
import Message from "../components/Message";
import { ChatRoom, Message as MessageModel } from "../src/models";
// import chatRoomData from "../assets/dummy-data/Chats";
import MessageInput from "../components/MessageInput";
import { DataStore } from "aws-amplify";

export default function ChatRoomScreen(props) {
  const route = useRoute();

  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);

  async function fetchChatRoom() {
    if (!route.params?.id) return console.log("NO CHATROOM ID PROVIDED");
    const chatroom = await DataStore.query(ChatRoom, route.params.id);
    if (!chatroom) return console.error("COULDNT FIND CHATROOM WITH THIS ID");
    else setChatRoom(chatroom);
  }

  async function fetchMessages() {
    if (!chatRoom) return;
    const fetchedMessages = await DataStore.query(MessageModel, (message) =>
      message.chatroomID("eq", chatRoom.id)
    );
    //console.log(`fetchedMessages`, fetchedMessages);
    setMessages(fetchedMessages);
  }
  useEffect(() => {
    fetchChatRoom();
  }, []);
  useEffect(() => {
    fetchMessages();
  }, [chatRoom]);
  const navigation = useNavigation();

  console.warn("Displaying chat room: ", route.params?.id);

  navigation.setOptions({ title: chatRoom?.id });
  if (!chatRoom) return <ActivityIndicator />;
  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Message message={item} />}
        inverted
      />
      <MessageInput chatRoom={chatRoom} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});
