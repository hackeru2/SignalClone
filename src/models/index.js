// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Message, User, Post, ChatRoom } = initSchema(schema);

export {
  Message,
  User,
  Post,
  ChatRoom
};