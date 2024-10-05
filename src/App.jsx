import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/blogs",
    element: (
      <ProtectedRoute>
        <Blogs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/blogs/:blogID",
    element: (
      <ProtectedRoute>
        <BlogPost />
      </ProtectedRoute>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
