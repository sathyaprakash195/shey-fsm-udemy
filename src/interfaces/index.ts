export interface UserType {
  _id: number;
  name: string;
  email: string;
  clerkUserId: string;
  profilePic: string;
}

export interface TaskType {
  _id: string;
  title: string;
  subTitle: string;
  description: string;
  skillsRequired: string[];
  lastDateToPlaceBid: string;
  attachments: { name: string; url: string }[];
  isActive: boolean;
  bidsReceived: number;
  user: UserType;
  createdAt: string;
}

export interface BidType {
  _id: string;
  task: TaskType;
  freelancer: UserType;
  client: UserType;
  bidAmount: number;
  estimatedDays: number;
  message: string;
  createdAt: string;
}
