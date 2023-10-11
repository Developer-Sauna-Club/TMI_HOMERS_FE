/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import { HomePage, LandingPage } from '@pages/index';

const SignUpPage = lazy(() => import('@/pages/SignupPage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const NewArticlePage = lazy(() => import('@/pages/NewArticlePage'));
const ArticleDetailPage = lazy(() => import('@/pages/ArticleDetailPage'));
const NotificationPage = lazy(() => import('@/pages/NotificationPage'));
const ArticlesPage = lazy(() => import('@/pages/ArticlesPage'));
const ProfileEditPage = lazy(() => import('@/pages/ProfileEditPage'));
const ChangePasswordPage = lazy(() => import('@/pages/ChangePasswordPage'));
const ProtectedRouter = lazy(() => import('@/pages/ProtectedRouter'));
const ArticleEditPage = lazy(() => import('@/pages/ArticleEditPage'));

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
        path: 'news/edit',
        element: (
          <ProtectedRouter>
            <ArticleEditPage />
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
