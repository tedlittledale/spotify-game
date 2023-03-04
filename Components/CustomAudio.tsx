import React from 'react'
import styled from 'styled-components'

export const CustomAudio = styled.audio`
  &::-webkit-media-controls-panel,
  &::-webkit-media-controls-mute-button,
  &::-webkit-media-controls-play-button,
  &::-webkit-media-controls-timeline-container,
  &::-webkit-media-controls-current-time-display,
  &::-webkit-media-controls-time-remaining-display,
  &::-webkit-media-controls-timeline,
  &::-webkit-media-controls-volume-slider-container,
  &::-webkit-media-controls-volume-slider,
  &::-webkit-media-controls-seek-back-button,
  &::-webkit-media-controls-seek-forward-button,
  &::-webkit-media-controls-fullscreen-button,
  &::-webkit-media-controls-rewind-button,
  &::-webkit-media-controls-return-to-realtime-button,
  &::-webkit-media-controls-toggle-closed-captions-button,
  &::-webkit-media-controls-panel {
    background: red;
    -webkit-appearance: none;
    opacity: 0;
  }
`
