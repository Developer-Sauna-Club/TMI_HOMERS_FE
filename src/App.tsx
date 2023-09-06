import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Home,
  Landing,
  NotFound,
  Signup,
  Search,
  Profile,
  Login,
  NewPost,
  PostDetail,
  Notification,
  PostList,
} from './pages';

const MILLISECOND = 1000;
const SECOND = 60;
const MINUTE = 5;

const STALE_TIME = MILLISECOND * SECOND * MINUTE;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'home', element: <Home /> },
      { path: 'signup', element: <Signup /> },
      { path: 'search', element: <Search /> },
      { path: 'profile', element: <Profile /> },
      { path: 'login', element: <Login /> },
      { path: 'news', element: <PostList /> },
      { path: 'news/create', element: <NewPost /> },
      { path: 'news/:postId', element: <PostDetail /> },
      { path: 'notification', element: <Notification /> },
    ],
  },
]);

function Root() {
  return <Outlet />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
