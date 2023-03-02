import { signIn } from 'next-auth/react'
import styled from 'styled-components'

const IntroBG = styled.div`
  background: linear-gradient(270deg, #00ffc8, #00f0d0);
  display: grid;
  height: 100dvh;
  width: 100%;
  place-items: center;
  align-items: center;
  > div {
    text-align: center;
  }
  button {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    font-size: 1rem;
    font-weight: 700;

    background-color: transparent;
    border: 0px;
    border-radius: 500px;
    display: inline-block;
    position: relative;
    text-align: center;
    text-decoration: none;
    text-transform: none;
    touch-action: manipulation;
    transition-duration: 33ms;
    transition-property: background-color, border-color, color, box-shadow,
      filter, transform;
    user-select: none;
    vertical-align: middle;
    transform: translate3d(0px, 0px, 0px);
    padding: 0px;
    min-inline-size: 0px;
    cursor: pointer;
    span {
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
      position: relative;
      background-color: var(--background-base, #ffffff);
      color: var(--text-base, #000000);
      display: flex;
      border-radius: 500px;
      font-size: inherit;
      min-block-size: 48px;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      padding-block: 8px;
      padding-inline: 32px;
    }
  }
`

export default function Login() {
  const handleLogin = () => {
    signIn('spotify', { callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL })
  }

  return (
    <IntroBG>
      <div>
        <h1>How well do you know your 10 top tracks on Spotify?</h1>
        <button onClick={handleLogin}>
          <span>Login to play</span>
        </button>
      </div>
    </IntroBG>
  )
}
