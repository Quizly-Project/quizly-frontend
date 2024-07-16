import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import CreateQuiz from './pages/CreateQuiz/CreateQuiz.jsx';
import Landing from './pages/Landing';
import TeacherQuizDashboard from './pages/TeacherQuizDashboard/TeacherQuizDashboard.jsx';
import Layout from './components/layout/Layout/Layout.jsx';
import useAuthStore from './store/authStore';
import GameContainer from './components/Game/GameContainer/GameContainer.jsx';
import Test from './pages/Test.jsx';
import ChatComponent from './components/common/ChatComponent/ChatComponent.jsx';
import VoiceChat from './components/Game/VoiceChat/VoiceChat.tsx';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/create/:quizType"
          element={
            <PrivateRoute>
              <CreateQuiz />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/dashboard"
          element={
            <PrivateRoute>
              <TeacherQuizDashboard />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/game" element={<Navigate to="/landing" />} />
        <Route path="/game/:code/:type" element={<GameContainer />} />
        <Route path="test" element={<Test />} />
        <Route path="/chat" element={<ChatComponent />} />
        <Route path="/voice" element={<VoiceChat />} />
      </Routes>
    </Router>
  );
}

export default App;
