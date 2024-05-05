import React, { useEffect } from "react";

// Notification component - renders the actual notification message
const Notification = ({message}) => {
    if(message === null) {
        return null
    }

    return <div className={message.status}>{message.text}</div>;
}

// NotificationManager component - manages the display of notifications
const NotificationManager = ({message, setMessage}) => {
  useEffect(() => {
    if(message !== null) {
        const timer = setTimeout(() => {
            setMessage(null);
        }, message.timeout);
        
        return () => clearTimeout(timer);
    }
  }, [message, setMessage])

  // Render the Notification component with the current message
  return <Notification message={message}/>
};

export default NotificationManager;