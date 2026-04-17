/**
 * localStorage utility functions for KaalPatra
 */

const STORAGE_KEY = 'kaalpatra_messages';

/**
 * Get all messages from localStorage
 * @returns {Array} array of message objects
 */
export const getMessages = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading messages from localStorage:', error);
    return [];
  }
};

/**
 * Save a new message to localStorage
 * @param {Object} message - message object to save
 * @returns {boolean} true if successful
 */
export const saveMessage = (message) => {
  try {
    const messages = getMessages();
    messages.push(message);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    return true;
  } catch (error) {
    console.error('Error saving message to localStorage:', error);
    return false;
  }
};

/**
 * Delete a message from localStorage
 * @param {string} id - message ID to delete
 * @returns {boolean} true if successful
 */
export const deleteMessage = (id) => {
  try {
    const messages = getMessages();
    const filtered = messages.filter(msg => msg.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting message from localStorage:', error);
    return false;
  }
};
