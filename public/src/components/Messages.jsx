
import React from "react";
import axios from "axios";
import { deleteMessageRoute } from "../utils/APIRoutes";

export default function Message({ message, onDelete }) {
  const handleDelete = async () => {
    try {
      // Call the backend API to delete the message
      await axios.delete(`${deleteMessageRoute}/${message._id}`);
      // Update the UI by calling the parent component's onDelete function
      onDelete(message._id);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
      <div className="content">
        <p>{message.message}</p>
        {message.fromSelf && (
          <button onClick={handleDelete}>Delete</button>
        )}
      </div>
    </div>
  );

}
