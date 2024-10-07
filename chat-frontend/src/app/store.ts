import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { usersReducer } from '../features/users/usersSlice';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { messagesReducer } from '../features/messages/messagesSlice';

const userPersistConfig = {
  key: 'chat:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  messages: messagesReducer,
  users: persistReducer(userPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER],
      },
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
