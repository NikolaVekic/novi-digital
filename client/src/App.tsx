import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import FullPageLoader from "./components/FullPageLoader";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { user, loading, refresh, logout } = useAuth();

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={logout} />

      {loading ? (
        <FullPageLoader />
      ) : (
        <main className="page-fade mx-auto max-w-5xl px-4 py-8">
          <Routes>
            <Route path="/register" element={<Register onAuthed={refresh} />} />
            <Route path="/login" element={<Login onAuthed={refresh} />} />
            <Route path="/home" element={<Home user={user} />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </main>
      )}
    </BrowserRouter>
  );
}
