import './App.css';
import '@ionic/react/css/core.css';
import { Routes, Route } from 'react-router-dom'
import { ProfilePage } from './pages/Profile'
import { HomePage } from './pages/Home';
import { SignInWithPrelude as SignInPage } from "./components/SignInWithPrelude";
import { SignUpPage } from './pages/SignUp';
import { Tabs } from './components/Tabs';
import { UserPage } from "./pages/UserPage"
import { Chats } from './pages/Chat';

function App() {
  return (
    <>
      <main className="flex-auto flex">
        <Routes>
          <Route path="/chat/users" element={<Chats />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/main/*" element={<Tabs />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<SignInPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
