'use client';

import { Send, X, Bot, User } from 'lucide-react';

export default function ChatWindow({
  messages,
  input,
  handleInputChange,
  handleSendMessage,
  isLoading,
  messagesEndRef,
  onClose,
}) {
  return (
    <div className="w-80 h-[28rem] flex flex-col bg-white rounded-lg shadow-2xl border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gray-100 border-b rounded-t-lg">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-blue-600" />
          <h3 className="font-semibold text-gray-800">Pandhari Mitra</h3>
        </div>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200" aria-label="Close chat">
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 my-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && <Bot className="w-6 h-6 flex-shrink-0 text-blue-600" />}
            <div className={`max-w-xs px-4 py-2 rounded-lg text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
              {msg.content}
            </div>
            {msg.role === 'user' && <User className="w-6 h-6 flex-shrink-0 text-gray-500" />}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start gap-3 my-4">
            <Bot className="w-6 h-6 flex-shrink-0 text-blue-600" />
            <div className="max-w-xs px-4 py-2 rounded-lg text-sm bg-gray-200 text-gray-800 rounded-bl-none">
              <div className="flex items-center justify-center gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-3 bg-white border-t rounded-b-lg">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me anything..."
            className="w-full px-3 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button type="submit" className="p-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 disabled:bg-blue-300" disabled={isLoading}>
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}