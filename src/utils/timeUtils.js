/**
 * Time utility functions for KaalPatra
 */

/**
 * Check if a message should be unlocked based on current time
 * @param {string} unlockAt - ISO timestamp when message unlocks
 * @returns {boolean} true if current time >= unlock time
 */
export const isUnlocked = (unlockAt) => {
  const now = new Date().getTime();
  const unlockTime = new Date(unlockAt).getTime();
  return now >= unlockTime;
};

/**
 * Format a timestamp for display
 * @param {string} timestamp - ISO timestamp
 * @returns {string} formatted date and time
 */
export const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);
  
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  
  return date.toLocaleString('en-US', options);
};

/**
 * Get time remaining until unlock
 * @param {string} unlockAt - ISO timestamp when message unlocks
 * @returns {string} human-readable time remaining
 */
export const getTimeRemaining = (unlockAt) => {
  const now = new Date().getTime();
  const unlockTime = new Date(unlockAt).getTime();
  const diff = unlockTime - now;

  if (diff <= 0) {
    return 'Unlocked';
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `${days}d ${hours}h remaining`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m remaining`;
  } else if (minutes > 0) {
    return `${minutes}m remaining`;
  } else {
    return 'Less than a minute';
  }
};

/**
 * Get detailed time remaining for live countdown widgets
 * @param {string} unlockAt - ISO timestamp when message unlocks
 * @returns {Object} { days, hours, minutes, seconds, isUnlocked }
 */
export const getDetailedTimeRemaining = (unlockAt) => {
  const now = new Date().getTime();
  const unlockTime = new Date(unlockAt).getTime();
  const diff = unlockTime - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isUnlocked: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { 
    days, 
    hours, 
    minutes, 
    seconds, 
    isUnlocked: false 
  };
};

/**
 * Calculates the current consecutive day streak from a list of progress logs.
 * A streak is maintained if there is a log for today or yesterday.
 * @param {Array<{date: string}>} logs - Array of log entries with ISO date strings
 * @returns {number} The current streak count
 */
export const getConsecutiveDayStreak = (logs) => {
  if (!logs || logs.length === 0) return 0;

  // 1. Extract unique dates (YYYY-MM-DD)
  const uniqueDates = [...new Set(logs.map(log => {
    const d = new Date(log.date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }))];

  // 2. Sort descending (newest first)
  uniqueDates.sort((a, b) => new Date(b) - new Date(a));

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

  // 3. Check if streak is broken (no log today AND no log yesterday)
  if (uniqueDates[0] !== todayStr && uniqueDates[0] !== yesterdayStr) {
    return 0;
  }

  // 4. Count consecutive days backwards
  let streak = 0;
  let expectedDate = new Date(uniqueDates[0]); // Start counting from the most recent log (either today or yesterday)

  for (let i = 0; i < uniqueDates.length; i++) {
    const logDateStr = uniqueDates[i];
    const expectedDateStr = `${expectedDate.getFullYear()}-${String(expectedDate.getMonth() + 1).padStart(2, '0')}-${String(expectedDate.getDate()).padStart(2, '0')}`;
    
    if (logDateStr === expectedDateStr) {
      streak++;
      expectedDate.setDate(expectedDate.getDate() - 1); // Move expected date back by 1 day
    } else {
      break; // Gap found, streak ends
    }
  }

  return streak;
};

