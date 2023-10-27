import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PaperAirplane from "@/icons/paperAirplane";
import { useSendChatMutation } from "@/store/api/chat";
import { TextareaAutosize } from "@mui/material";

const AiChat = ({ questionId, code, messages, setMessages }) => {
  const [userInput, setUserInput] = useState("");
  const [suggestedQuestions] = useState([
    "Why is my code not working?",
    "Explain the question simply.",
    "How do I use the map function in JS?"
  ]);

  const [sendChat, { isLoading }] = useSendChatMutation();

  const handleSuggestedQuestionClick = (question) => {
    setUserInput(question);
  };

  const scroll = () => {
    const chat = document.getElementById("chat");
    chat.scrollTop = chat.scrollHeight;
  };

  const formatCodeSnippets = (text) => {
    // Use regular expressions to find code snippets within ```
    const formattedText = text.replace(/```([^`]+)```/g, (match, code) => {
      return `<pre class="bg-gray-700 py-2 px-4 rounded-lg text-gray-100 my-2">${code}</pre>`;
    });

    // Use regular expressions to find code snippets within `..`
    return formattedText.replace(/`([^`]+)`/g, (match, code) => {
      return `<pre class="bg-gray-700 p-2 rounded-lg text-gray-100 my-2">${code}</pre>`;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInput.trim() === "") return;

    const isUserMessage = userInput.trim() !== "Hello, how can I assist you?";
    const senderLabel = isUserMessage ? "You" : "Coach";

    const newUserMessage = { text: formatCodeSnippets(userInput), isUser: isUserMessage, sender: senderLabel };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    const message = userInput;

    setUserInput("");

    try {
      const response = await sendChat({
        id: questionId,
        code,
        message: message
      });

      const aiResponse = { text: formatCodeSnippets(response.data.data.content), isUser: false, sender: "Coach" };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    } catch (err) {
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_CENTER
      });
    }

    scroll();
  };

  useEffect(() => {
    // Automatically scroll to the bottom when new messages arrive
    scroll();
  }, [messages]);

  return (
    <div className="w-full h-full flex flex-col justify-end relative">
      <div id="chat" className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`bg-gray-200 p-3 rounded-lg ${
                  message.isUser ? "bg-secondary text-white ml-auto" : "bg-gray-300 text-secondary"
                }`}
              >
                <div
                  className={`text-[10px] font-semibold text-gray-500 flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender}
                </div>
                <span dangerouslySetInnerHTML={{ __html: message.text }} />
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center w-full h-full  justify-center">
              <div className="animate-spin w-8 h-8 border-t-2 my-20 border-secondary rounded-full"></div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full p-4 gap-3">
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
        <div className="flex w-full">
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
              className="self-end h-[58px] w-[100px] bg-secondary text-white rounded-lg hover:opacity-75 focus:outline-none focus:ring flex justify-center items-center"
              disabled={isLoading}
            >
              <PaperAirplane className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
