import Head from 'next/head'
import styled from 'styled-components'
import { GetServerSideProps } from 'next'
import { isAuthenticated } from '../utils/isAuthenticated'
import { customGet } from '../utils/customGet'
import Image from 'next/image'

import { getSession } from 'next-auth/react'
import styles from '@/styles/Home.module.css'
import { SearchResults } from '../types/types'
import { Shuffler } from '../Components/Shuffler'

const CustomMain = styled.main`
  height: 100dvh;
  width: 100%;
`

export default function Home({ top20 }: { top20: any }) {
  console.log({ top20 })
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CustomMain>
        {!top20 ? <h1>Loading...</h1> : <Shuffler top20={top20.items} />}
      </CustomMain>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  if (!(await isAuthenticated(session))) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const top20 = await customGet(
    `https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=20`,
    session
  )
  console.log({ top20 })

  return { props: { top20: top20 } }
}
