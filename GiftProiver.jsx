import { createContext, useState } from "react";

// ცარიელი ყუთი
export const MessageContext = createContext();

export function MessageProvider({ children }) {
  // Step 2: Create state inside the provider
  const [message, setMessage] = useState("Hello from Context!");

  return (
    // Step 3: Provide both message and function to update it
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
}

//

import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

function MessageComponent() {
  const userService = useContext(MessageContext);

  return (
    <div>
      <h1>{userService.message}</h1>

      <input
        type="text"
        placeholder="Type a new message..."
        onChange={(e) => setMessage(e.target.value)}
      />
    </div>
  );
}
