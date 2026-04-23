import { createSlice } from '@reduxjs/toolkit';
import { fetchCommitments } from '../commitments/commitmentsSlice';
import { getConsecutiveDayStreak } from '../../utils/timeUtils';

/**
 * Calculate integrity stats (score + resolved counts) from the full commitment list.
 * Uses Array ES6 methods (Unit 1 requirement).
 */
const calculateStats = (commitments) => {
  if (!commitments || commitments.length === 0) {
    return { score: 0, streak: 0, totalFailed: 0, totalSuccess: 0 };
  }

  // ── Integrity score ───────────────────────────────────────────────────────
  const resolved = commitments.filter(
    (c) => c.status === 'success' || c.status === 'failed'
  );
  const successCount = resolved.filter((c) => c.status === 'success').length;
  const score =
    resolved.length === 0
      ? 0
      : Math.round((successCount / resolved.length) * 100);

  // ── Global daily check-in streak ─────────────────────────────────────────
  // Aggregate every progress-log entry across ALL active commitments into
  // a single synthetic array and reuse the per-commitment streak algorithm.
  // "Active" = still running (locked) or awaiting judgment (pending_judgment).
  // If there are no active commitments the streak is treated as neutral (0),
  // because there is nothing to log.
  const activeCommitments = commitments.filter(
    (c) => c.status === 'locked' || c.status === 'pending_judgment'
  );
  const allLogs = activeCommitments.flatMap((c) =>
    (c.progressLogs || []).map((entry) => ({ date: entry.date }))
  );
  const streak = getConsecutiveDayStreak(allLogs);

  return {
    score,
    streak,
    totalFailed: resolved.length - successCount,
    totalSuccess: successCount,
  };
};

const statsSlice = createSlice({
  name: 'stats',
  initialState: {
    score: 0,
    streak: 0,
    totalFailed: 0,
    totalSuccess: 0
  },
  reducers: {},
  extraReducers: (builder) => {
    // We update stats whenever commitments change successfully
    const handleCommitmentChange = (state, action) => {
      // For fetch, the payload is the whole array.
      // For add/update/delete, we would ideally need the whole array again.
      // To keep it simple in Redux, derived state is often just selected in components via selectors using reselect.
      // But for this requirement, we'll listen to fetch.
    };

    builder.addCase(fetchCommitments.fulfilled, (state, action) => {
      const stats = calculateStats(action.payload);
      state.score = stats.score;
      state.streak = stats.streak;
      state.totalFailed = stats.totalFailed;
      state.totalSuccess = stats.totalSuccess;
    });
  }
});

export default statsSlice.reducer;

// Selectors
export const selectStats = (state) => state.stats;

// Selector to calculate stats purely from commitments state (Best Practice for derived data)
export const selectDerivedStats = (state) => calculateStats(state.commitments.items);
