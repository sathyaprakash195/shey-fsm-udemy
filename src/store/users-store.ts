import { UserType } from "@/interfaces";
import { create } from "zustand";

const useUsersStore = create((set) => ({
  loggedInUserData: null,
  SetLoggedInUserData: (data: UserType) => set({ loggedInUserData: data }),
}));

export default useUsersStore;

export interface UsersStoreType {
  loggedInUserData: UserType | null;
  SetLoggedInUserData: (data: UserType) => void;
}
