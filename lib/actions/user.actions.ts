"use server";

import { connectToDB } from "../mongoose";
import User from "../models/user.model";

interface Props {
  nickname: string;
  email: string;
  password: string;
  image?: string;
}

export async function createUser({ nickname, email, password, image }: Props) {
  try {
    connectToDB();

    const user = await User.findOne({
      $or: [{ email: email }, { nickname: nickname }],
    });
    if (user) {
      throw new Error("This Email Or Nickname Registered!");
    }

    const newUser = new User({
      nickname,
      email,
      password,
      image,
    });

    const createUser = await newUser.save();
    if (createUser?._id) {
      return true;
    }

    return createUser;
  } catch (error) {
    throw error;
  }
}

export async function checkedUser(nickname?: string, email?: string) {
  try {
    connectToDB();
    if (nickname) {
      const user = await User.findOne({ nickname: nickname });
      if (user) {
        throw new Error("This Nickname Registered!");
      }
    }
    if (email) {
      const user = await User.findOne({ nickname: nickname });
      if (user) {
        throw new Error("This Email Registered!");
      }
    }
    return true;
  } catch (error) {
    throw error;
  }
}

export async function QueryUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    connectToDB();

    const user = await User.findOne({ email: email });

    if (user) {
      if (user.password === password) return user;

      throw new Error("Your password didn't correct.");
    }
    throw new Error("Your account cann't find.");
  } catch (error) {
    throw error;
  }
}
