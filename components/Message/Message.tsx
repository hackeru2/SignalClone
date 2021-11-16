import { Auth, DataStore } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { User } from "../../src/models";

const blue = "#3777f0";
const grey = "lightgrey";

const myID = "u1";

const Message = ({ message }) => {
  const [user, setUser] = useState<User | null>(undefined);
  const [isMe, setIsMe] = useState<boolean>(false);

  useEffect(() => {
    DataStore.query(User, message.userID).then(setUser);
  }, []);

  useEffect(() => {
    const checkIfMe = async () => {
      if (!user) return;
      const authUser = await Auth.currentAuthenticatedUser();
      setIsMe(user.id === authUser.attributes.sub);
    };
    checkIfMe();
  }, [user]);

  if (!user) return <ActivityIndicator />;
  return (
    <View
      style={[
        styles.container,
        isMe ? styles.rightContainer : styles.leftContainer,
      ]}
    >
      <Text style={{ color: isMe ? "black" : "white" }}>{message.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    maxWidth: "75%",
  },
  leftContainer: {
    backgroundColor: blue,
    marginLeft: 10,
    marginRight: "auto",
  },
  rightContainer: {
    backgroundColor: grey,
    marginLeft: "auto",
    marginRight: 10,
  },
});

export default Message;
