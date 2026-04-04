const fs = require("fs/promises");
const path = require("path");

const contactMessagesFilePath = path.join(__dirname, "contactMessages.json");

const readContactMessages = async () => {
  try {
    const fileContents = await fs.readFile(contactMessagesFilePath, "utf8");
    const parsedMessages = JSON.parse(fileContents || "[]");

    return Array.isArray(parsedMessages) ? parsedMessages : [];
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(contactMessagesFilePath, "[]");
      return [];
    }

    throw error;
  }
};

const writeContactMessages = async (messages) => {
  await fs.writeFile(contactMessagesFilePath, JSON.stringify(messages, null, 2));
};

const addContactMessage = async (messagePayload) => {
  const messages = await readContactMessages();
  const nextId =
    messages.length === 0 ? 1 : Math.max(...messages.map((message) => Number(message.id) || 0)) + 1;

  const newMessage = {
    id: nextId,
    ...messagePayload,
    createdAt: new Date().toISOString(),
  };

  messages.push(newMessage);
  await writeContactMessages(messages);

  return newMessage;
};

module.exports = {
  addContactMessage,
};
