import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import {
  HomePage,
  LandingPage,
  NotFoundPage,
  SignUpPage,
  SearchPage,
  ProfilePage,
  LoginPage,
  NewArticlePage,
  ArticleDetailPage,
  NotificationPage,
  ArticlesPage,
  ProfileEditPage,
} from '@pages/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'home', element: <HomePage /> },
      { path: 'signUp', element: <SignUpPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'profile/:userId', element: <ProfilePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'news', element: <ArticlesPage /> },
      { path: 'news/create', element: <NewArticlePage /> },
      { path: 'news/:postId', element: <ArticleDetailPage /> },
      { path: 'notification', element: <NotificationPage /> },
      { path: 'profile/edit', element: <ProfileEditPage /> },
    ],
  },
]);

export default router;
