import React, { useEffect } from "react";
import { Text, Image, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/core";
import styles from "./styles";
import { DataStore } from "@aws-amplify/datastore";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import User from "../src/models";
export default function UserItem({ user }) {
  const navigation = useNavigation();
  const onPress = () => {
    console.warn("pressed on ", user.name);
    navigation.navigate("user", { id: user.id });
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
