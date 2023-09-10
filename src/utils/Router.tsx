import { createBrowserRouter } from 'react-router-dom';
import {
  HomePage,
  LandingPage,
  NotFoundPage,
  SignupPage,
  SearchPage,
  ProfilePage,
  LoginPage,
  NewArticlePage,
  ArticleDetailPage,
  NotificationPage,
  ArticlesPage,
} from '@pages';
import App from '@/App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'home', element: <HomePage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'news', element: <ArticlesPage /> },
      { path: 'news/create', element: <NewArticlePage /> },
      { path: 'news/:postId', element: <ArticleDetailPage /> },
      { path: 'notification', element: <NotificationPage /> },
    ],
  },
]);

export default router;
