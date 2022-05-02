import React from "react";
import { Route, Routes } from "react-router-dom";
import { useUser } from "./hooks/useUser";
import { ChatPage } from "./views/ChatPage";
import { LoginPage } from "./views/LoginPage";

function App() {
  const user = useUser();

  return (
    <Routes>
      {user ? (
        <Route path='/chat' element={<ChatPage />} />
      ) : (
        <Route path='/login' element={<LoginPage />} />
      )}
    </Routes>
  );
}

export default App;
