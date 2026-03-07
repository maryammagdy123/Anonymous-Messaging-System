import { messageRepo, userRepo } from "../../DB/Repo/index.js";
import {
  decryptMessage,
  encryptMessage,
  NotFoundException,
} from "../../Utils/index.js";

export const sendMessage = async (senderId, receiverId, message) => {
  const findReceiver = await userRepo.findById({ id: receiverId });

  if (!findReceiver) {
    NotFoundException({ message: "User Not Found!" });
  }

  const encryptedMessage = encryptMessage(message, findReceiver.publicKey);

  const result = await messageRepo.create({
    content: encryptedMessage,
    receiverId: receiverId,
    senderId: senderId,
  });

  return result;
};

export const sendAnonymousMessage=async(receiverId, message)=>{
 const findReceiver = await userRepo.findById({ id: receiverId });

  if (!findReceiver) {
    NotFoundException({ message: "User Not Found!" });
  }

  const encryptedMessage = encryptMessage(message, findReceiver.publicKey);

  const result = await messageRepo.create({
    content: encryptedMessage,
    receiverId: receiverId,
  });

  return result;
}

export const getUserMessages = async (userId) => {
  const owner = await userRepo.findOne({ filter: { _id: userId } });
  console.log(owner.privateKey)
  const messages = await messageRepo.find({
    receiverId: userId,
    populate: [
      {
        path: "senderId",
        select: "username email",
      },
    ],
    options: {
      sort: { createdAt: -1 },
    },
  });

  const decryptedMessages = messages.map((msg) => {
    let decryptedContent;
    try {
      decryptedContent = decryptMessage(msg.content, owner.privateKey);
    } catch (error) {
      decryptedContent = "[Cannot decrypt message]";
    }

    return {
      ...msg.toObject(),
      content: decryptedContent,
    };
  });

  return decryptedMessages;
};
