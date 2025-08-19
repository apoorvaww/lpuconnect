import { MessagesSquare } from "lucide-react";
import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document{
    _id: mongoose.Types.ObjectId,
    isRead: boolean,
    content: string,
    createdAt: Date,
}

export interface User extends Document {
    _id: mongoose.Types.ObjectId,
    username: string,
    fullName: string,
    email: string,
    password: string,
    verificationCode: string,
    verificationCodeExpiry: Date,
    isVerified: boolean,
    isAcceptingMessages: boolean,
    messages: Message[],
    profilePicture: string,
    lastLogin: Date,
    createdAt: Date,
    updatedAt: Date,
}

const MessageSchema:Schema = new Schema<Message>({
    isRead: {
        type: Boolean,
        default: false,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const UserSchema:Schema = new Schema<User>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    verificationCode: {
        type: String,
    },
    verificationCodeExpiry: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
    },
    isAcceptingMessages: {
        type: Boolean,
    },
    messages: {
        type: [MessagesSquare],
        default: [],
    },
    profilePicture: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fanonymous-user&psig=AOvVaw0gnqcGWfzB2v938fVOOLLU&ust=1755088038917000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJDV4MuihY8DFQAAAAAdAAAAABAE"
    },
    lastLogin: {
        type: Date,
    }
    ,
},
    {
        timestamps: true,
    }
)

export const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);


export const MessageModel = (mongoose.models.Message as mongoose.Model<Message>) || mongoose.model<Message>("Message", MessageSchema)
