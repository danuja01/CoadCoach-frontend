import { useState } from "react";
import { TextareaAutosize } from "@mui/material";

const AiChat = () => {
  const [messages, setMessages] = useState([{ text: "Hello, how can I assist you?", isUser: false, sender: "Coach" }]);
  const [userInput, setUserInput] = useState("");
  const [suggestedQuestions] = useState([
    "Why is my code not working?",
    "Explain the question simply.",
    "How do I use the map function?"
  ]);

  const handleSuggestedQuestionClick = (question) => {
    // Handle the click on a suggested question
    setUserInput(question);
  };

  // scroll to bottom
  const scroll = () => {
    const chat = document.getElementById("chat");
    chat.scrollTop = chat.scrollHeight;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim() === "") return;

    // Determine if the message is from the user or the AI
    const isUserMessage = userInput.trim() !== "Hello, how can I assist you?";
    const senderLabel = isUserMessage ? "You" : "Coach";

    // Create a new user message
    const newUserMessage = { text: userInput, isUser: isUserMessage, sender: senderLabel };

    // Use the functional form of setState to update messages
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    // Simulate AI response (replace with GPT-3 integration)
    setTimeout(() => {
      const aiResponse = { text: "I am a chatbot and this is a simulated response.", isUser: false, sender: "Coach" };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    }, 500);

    setTimeout(() => {
      scroll();
    }, 100);

    setUserInput("");
  };

  return (
    <div className="w-full h-full flex flex-col justify-end relative">
      <div id="chat" className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`bg-gray-200 p-3 rounded-lg ${
                  message.isUser ? "bg-secondary text-white ml-auto" : "bg-gray-300 text-secondary "
                }`}
              >
                <div
                  className={`text-[10px] font-semibold text-gray-500 flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender}
                </div>
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full p-4 gap-3 ">
        <div className="flex gap-2">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSuggestedQuestionClick(question)}
              className="px-3 py-2 bg-[#4C587199] text-secondary rounded-lg hover:bg-secondary hover:text-gray-300 focus:outline-none focus:ring focus:text-gray-300 focus:bg-secondary"
            >
              {question}
            </button>
          ))}
        </div>
        <div className="flex w-full ">
          <form className="flex w-full gap-2">
            <TextareaAutosize
              type="text"
              placeholder="Type your message..."
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring"
              value={userInput}
              minRows={1}
              maxRows={3}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className=" px-4 py-2 self-end h-[58px] w-[130px] bg-secondary text-white rounded-lg hover:opacity-75 focus:outline-none focus:ring "
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
