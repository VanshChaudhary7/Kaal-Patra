import { configureStore } from '@reduxjs/toolkit';
import commitmentsReducer from '../features/commitments/commitmentsSlice';
import statsReducer from '../features/stats/statsSlice';

// Configure store (Unit 4 - Redux Toolkit, Redux DevTools enabled implicitly)
export const store = configureStore({
  reducer: {
    commitments: commitmentsReducer,
    stats: statsReducer,
  },
});
