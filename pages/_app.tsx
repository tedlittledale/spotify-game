import type { AppProps } from 'next/app'
import { createGlobalStyle } from 'styled-components'
import { SessionProvider } from 'next-auth/react'
import '@fontsource/figtree'

const GlobalStyle = createGlobalStyle`
html{
  box-sizing: border-box;

  display:block;
  
 
  margin:0 auto;
  padding: 0;
}

body{
  background-color:#fafafa;
  min-height:100dvh;
  margin:0;
  padding:0;
  font-family:"Figtree",Helvetica, Arial, sans-serif;
 
}
* {
  box-sizing: border-box;
}
ul{
  list-style: none;
}

`

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <GlobalStyle />
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}
