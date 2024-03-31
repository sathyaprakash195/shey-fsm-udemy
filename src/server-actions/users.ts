"use server";

import { connectToMongoDB } from "@/config/mongodb-connection";
import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs";

connectToMongoDB();

export const getCurrentUserFromMongoDB = async () => {
  try {
    const clerkUser = await currentUser();
    const user = await UserModel.findOne({ clerkUserId: clerkUser?.id });
    if (user) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(user)),
      };
    }

    const newUser = new UserModel({
      name: clerkUser?.firstName + " " + clerkUser?.lastName,
      email: clerkUser?.emailAddresses[0]?.emailAddress,
      clerkUserId: clerkUser?.id,
      profilePic: clerkUser?.imageUrl,
    });

    await newUser.save();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newUser)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateUserInMongoDB = async ({
  userId,
  payload,
}: {
  userId: string;
  payload: any;
}) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, payload, {
      new: true,
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(updatedUser)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
