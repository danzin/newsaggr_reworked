import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { NotificationContextProvider } from './context/NotificationContext.js';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ArticlesProvider } from './context/ArticlesContext.js';
import { AuthProvider } from './context/AuthContext.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

const time = 1000 * 60 * 60 * 24;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: time,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <NotificationContextProvider>
            <ArticlesProvider>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </ArticlesProvider>
          </NotificationContextProvider>
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
