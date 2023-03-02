import { MySession } from '../types/types'

export const customGet = async (url: string, session: MySession | null) => {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    }).then((res) => {
      console.log({ res })
      if (res.statusText === 'Forbidden') {
        return {
          error: 'Unauthorized',
        }
      }
      return res.json()
    })
    return res
  } catch (error) {
    console.log({ error })
    return {}
  }
}
