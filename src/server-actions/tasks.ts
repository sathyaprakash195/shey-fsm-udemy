"use server";
import { connectToMongoDB } from "@/config/mongodb-connection";
import TaskModel from "@/models/task-model";
import { getCurrentUserFromMongoDB } from "./users";
import { revalidatePath } from "next/cache";

connectToMongoDB();

export const createNewTask = async (taskData: any) => {
  try {
    const newTask = new TaskModel(taskData);
    await newTask.save();
    revalidatePath("/profile/tasks");
    return {
      success: true,
      message: "Task created successfully.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const editTask = async ({
  taskId,
  taskData,
}: {
  taskId: string;
  taskData: any;
}) => {
  try {
    await TaskModel.findByIdAndUpdate(taskId, taskData);
    revalidatePath("/profile/tasks");
    return {
      success: true,
      message: "Task updated successfully.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    await TaskModel.findByIdAndDelete(taskId);
    revalidatePath("/profile/tasks");
    return {
      success: true,
      message: "Task deleted successfully.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getTasksPostedByLoggedInUser = async () => {
  try {
    const loggedInUser = await getCurrentUserFromMongoDB();
    const tasks = await TaskModel.find({ user: loggedInUser.data?._id }).sort({
      createdAt: -1,
    });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(tasks)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getTaskById = async (taskId: string) => {
  try {
    const task = await TaskModel.findById(taskId).populate("user");
    return {
      success: true,
      data: JSON.parse(JSON.stringify(task)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getAllTasks = async (query: string) => {
  try {
    const tasks = await TaskModel.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { subTitle: { $regex: query, $options: "i" } },
      ],
    })
      .populate("user")
      .sort({ createdAt: -1 });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(tasks)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
