import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type MessageMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'updatedAt';
}

type PostMetaData = {
  readOnlyFields: 'updatedAt';
}

type ChatRoomMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Message {
  readonly id: string;
  readonly content: string;
  readonly Users?: (User | null)[];
  readonly chatroomID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Message, MessageMetaData>);
  static copyOf(source: Message, mutator: (draft: MutableModel<Message, MessageMetaData>) => MutableModel<Message, MessageMetaData> | void): Message;
}

export declare class User {
  readonly id: string;
  readonly email: string;
  readonly name?: string;
  readonly owner?: string;
  readonly biography?: string;
  readonly website?: string;
  readonly createdAt: string;
  readonly posts?: (Post | null)[];
  readonly imageUri?: string;
  readonly status?: string;
  readonly messageID?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Post {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly body: string;
  readonly createdAt: string;
  readonly author?: User;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Post, PostMetaData>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post, PostMetaData>) => MutableModel<Post, PostMetaData> | void): Post;
}

export declare class ChatRoom {
  readonly id: string;
  readonly newMessages?: number;
  readonly lastMessage?: Message;
  readonly Messages?: (Message | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ChatRoom, ChatRoomMetaData>);
  static copyOf(source: ChatRoom, mutator: (draft: MutableModel<ChatRoom, ChatRoomMetaData>) => MutableModel<ChatRoom, ChatRoomMetaData> | void): ChatRoom;
}