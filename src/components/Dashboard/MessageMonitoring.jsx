import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessageMonitoring = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get('/api/admin/messages');
      setMessages(response.data);
    };
    fetchMessages();
  }, []);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Message Monitoring</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id} className="border-b py-2">
            <p><strong>User:</strong> {message.user}</p>
            <p><strong>Message:</strong> {message.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageMonitoring;