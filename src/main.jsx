import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { global } from './styles/global';
import { Global } from '@emotion/react';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // 응답에 대한 실패가 왔을 때, 자동으로 요청을 날리는 것 
            // 0,  즉시 응답으로 만들어서 실패하면 실패한 걸로
            retry: 0,
        }
    }
});
const root = document.getElementById('root');

createRoot(root).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Global styles={global}/>
            <App />
        </BrowserRouter>
    </QueryClientProvider>
)