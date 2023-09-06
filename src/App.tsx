import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1 className="text-3xl font-bold underline">안녕하세요</h1>;
    </QueryClientProvider>
  );
}

export default App;
