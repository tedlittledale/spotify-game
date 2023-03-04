import React from 'react'
import styled from 'styled-components'

const CustomButton = styled.button`
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
  transition-property: background-color, border-color, color, box-shadow, filter,
    transform;
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
`

export const Button = ({
  children,
  ...props
}: {
  children: JSX.Element
  onClick: any
}) => {
  return (
    <CustomButton {...props}>
      <span>{children}</span>
    </CustomButton>
  )
}
