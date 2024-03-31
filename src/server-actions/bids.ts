"use server";

import { connectToMongoDB } from "@/config/mongodb-connection";
import BidModel from "@/models/bid-model";
import { getCurrentUserFromMongoDB } from "./users";
import { revalidatePath } from "next/cache";
import TaskModel from "@/models/task-model";
import { sendEmail } from "./mails";

connectToMongoDB();

export const placeBid = async (bidData: any) => {
  try {
    await BidModel.create(bidData);
    await TaskModel.findByIdAndUpdate(bidData.task, {
      $inc: { bidsReceived: 1 },
    });

    await sendEmail({
      recipientEmail: bidData.clientEmail,
      subject: "New bid placed on your task",
      html: `
        <p>
          Hi there! A new bid has been placed on your task. Please login to your account to view the bid. 
          <br />
          <b>Task Name</b>: ${bidData.taskName}
          <br />
          <b>Freelancer Name</b>: ${bidData.freelancerName}
          <br />
          <b>Bid Amount</b>: $ ${bidData.bidAmount}
        </p>
      `,
    });
    revalidatePath("/profile/bids");
    return {
      message: "Bid placed successfully",
      success: true,
    };
  } catch (error: any) {
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getBidsPlacedByLoggedInUser = async () => {
  try {
    const loggedInUserResponse = await getCurrentUserFromMongoDB();
    const bids = await BidModel.find({
      freelancer: loggedInUserResponse.data._id,
    })
      .populate("task")
      .populate("client")
      .sort({ createdAt: -1 });
    return {
      data: JSON.parse(JSON.stringify(bids)),
      success: true,
    };
  } catch (error: any) {
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getBidsByTaskId = async (taskId: string) => {
  try {
    const bids = await BidModel.find({ task: taskId })
      .populate("freelancer")
      .sort({ createdAt: -1 });
    return {
      data: JSON.parse(JSON.stringify(bids)),
      success: true,
    };
  } catch (error: any) {
    return {
      message: error.message,
      success: false,
    };
  }
};

export const deleteBid = async (bidId: string) => {
  try {
    await BidModel.findByIdAndDelete(bidId);
    revalidatePath("/profile/bids");
    return {
      success: true,
      message: "Bid deleted successfully",
    };
  } catch (error: any) {
    return {
      message: error.message,
      success: false,
    };
  }
};
