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
  ChangePasswordPage,
  ProtectedRouter,
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
      {
        path: 'profile/:userId',
        element: (
          <ProtectedRouter>
            <ProfilePage />
          </ProtectedRouter>
        ),
      },
      { path: 'login', element: <LoginPage /> },
      { path: 'news', element: <ArticlesPage /> },
      {
        path: 'news/create',
        element: (
          <ProtectedRouter>
            <NewArticlePage />
          </ProtectedRouter>
        ),
      },
      { path: 'news/:postId', element: <ArticleDetailPage /> },
      {
        path: 'notification',
        element: (
          <ProtectedRouter>
            <NotificationPage />
          </ProtectedRouter>
        ),
      },
      {
        path: 'profile/edit',
        element: (
          <ProtectedRouter>
            <ProfileEditPage />
          </ProtectedRouter>
        ),
      },
      {
        path: 'password',
        element: (
          <ProtectedRouter>
            <ChangePasswordPage />
          </ProtectedRouter>
        ),
      },
    ],
  },
]);

export default router;
