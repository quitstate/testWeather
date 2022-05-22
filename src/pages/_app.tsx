import Head from 'next/head'
import { AppProps } from 'next/app'
import '../styles/index.css'
import Context from '../contexts'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Test Weather</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Context>
                <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </Context>
        </>
    )
}

export default MyApp