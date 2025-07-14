import { FilesCollection } from "meteor/ostrio:files";
import SimpleSchema from "simpl-schema";

export const Todos = new Mongo.Collection("todos");

export const Todos_Images = new FilesCollection({
  collectionName: "todoImages",
  allowClientCode: false,
  storagePath: "Users/user/desktop/images_test",
  onBeforeUpload(file) {
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    }
    return "Please upload image, with size equal or less than 10MB";
  },
});

const Schema = {};

Schema.Todo = new SimpleSchema({
  _id: {
    type: String,
  },
  title: {
    type: Number,
    required: true,
  },
  isPrivate: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  imgId: {
    type: String,
    optional: true,
  },
});

export const todoValidationContext = Schema.Todo.namedContext("todo");

Todos.attachSchema(Schema.Todo);
