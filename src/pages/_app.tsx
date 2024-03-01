import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import "../app/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (    
    <main>
      <div className='w-full min-h-screen' >
          <Component {...pageProps} />
      </div>
    </main>
  );
}

export default MyApp;