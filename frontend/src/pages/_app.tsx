import Frame from '@/components/Frame';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

// TODO: import font CSS from public/fonts/style.css

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Frame />
    <Component {...pageProps} />
  </>;
  // return <Component {...pageProps} />
}
