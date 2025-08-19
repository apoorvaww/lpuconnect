
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";

type Message = {
  id: number;
  user: string;
  text: string;
};

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      const ws = new WebSocket("ws://localhost:4000");
      socketRef.current = ws;

      ws.onopen = () => console.log("✅ Connected to WebSocket server");

      ws.onmessage = (event) => {
        const msg: Message = JSON.parse(event.data);
        setMessages((prev) => [...prev, msg]);
      };

      ws.onclose = () => console.log("❌ Disconnected from WebSocket server");
    }

    // cleanup
    return () => {
      socketRef.current?.close();
      socketRef.current = null;
    };
  }, []);

  const sendMessage = () => {
    if (
      socketRef.current &&
      socketRef.current.readyState === WebSocket.OPEN &&
      newMessage.trim()
    ) {
      const msg: Message = {
        id: Date.now(),
        user: "You",
        text: newMessage,
      };
      socketRef.current.send(JSON.stringify(msg));
      setNewMessage("");
    } else {
      console.warn("⚠️ WebSocket not open, cannot send message");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-lg max-w-xs ${
              msg.user === "You"
                ? "ml-auto bg-purple-600 text-white"
                : "bg-gray-200 dark:bg-neutral-800"
            }`}
          >
            <span className="block text-sm font-semibold">{msg.user}</span>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-neutral-800 p-4 flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
