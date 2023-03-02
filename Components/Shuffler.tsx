import React, { useEffect, useState, useRef } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { Guesser } from './Guesser'

const GradientAnimation = keyframes`
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
`

const colors = [
  '#00ffc8',
  '#00f0d0',
  '#00e2d8',
  '#00d3e0',
  '#00c5e7',
  '#00b6ef',
  '#00a8f7',
  '#0099ff',
]

const ShuffleBG = styled.div<ShuffleBGProps>`
  width: 100%;
  height: 100%;
  text-align: center;
  cursor: pointer;
  background: linear-gradient(
    270deg,
    ${({ currentPreviewNo }) =>
      css`
        ${colors[currentPreviewNo % 8]}, ${colors[(currentPreviewNo + 1) % 8]}
      `}
  );
  background-size: 400% 400%;
  animation: ${({ started }: { started: boolean }) =>
    started
      ? css`
          ${GradientAnimation} 3s ease infinite
        `
      : 'none'};
  display: grid;
  place-items: center;
  > .intro {
    padding: 20px;
    display: ${({ started }: { started: boolean }) =>
      started ? 'none' : 'block'};
  }
  > .trackNo {
    display: ${({ started }: { started: boolean }) =>
      started ? 'block' : 'none'};
  }
`

const CustomAudio = styled.audio`
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

interface ShuffleBGProps {
  currentPreviewNo: number
  started: boolean
}

export const Shuffler = ({ top20 }: { top20: any }) => {
  const [allUrls, setAllUrls] = useState<string[]>([])
  const [started, setStarted] = useState<boolean>(false)
  const [currentPreviewNo, setCurrentPreviewNo] = useState<number | null>(null)
  const [finished, setFinished] = useState<boolean>(false)
  const playerRef = useRef<any>(null)

  useEffect(() => {
    const previewUrls = top20
      .filter(({ preview_url }: { preview_url: any }) => preview_url !== null)
      .map(({ preview_url }: { preview_url: any }) => preview_url)
      .slice(0, 10)
    const allUrls: string[] = []
    previewUrls.forEach((url: any, idx: number) => {
      allUrls.push(url)
      if (idx !== previewUrls.length - 1) allUrls.push('/whoosh.wav')
    })
    setAllUrls(allUrls)

    return () => {}
  }, [top20])

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentPreviewNo !== null && allUrls[currentPreviewNo + 1]) {
          setCurrentPreviewNo(currentPreviewNo + 1)
        } else if (currentPreviewNo !== null) {
          setFinished(true)
        }
      },
      (currentPreviewNo && currentPreviewNo % 2) === 0 ? 2000 : 1200
    )
    return () => clearTimeout(timer)
  }, [currentPreviewNo, allUrls])

  console.log({ allUrls, currentPreviewNo })
  if (finished) {
    return <Guesser top20={top20} />
  }
  let audioSource = null
  let analyser = null
  return allUrls ? (
    <>
      <ShuffleBG
        currentPreviewNo={Math.floor((currentPreviewNo || 0) / 2)}
        started={started}
        onClick={() => {
          const audio = playerRef?.current
          if (audio?.paused) {
            audio.play()
            setStarted(true)
          } else {
            audio.pause()
          }
        }}
      >
        <div className="intro">
          <h2>How well do you know your top tracks?</h2>
          <h3>
            Listen to a 2 second clip of your top 10 tracks and then try to name
            each track
          </h3>
          <h3>Tap anywhere to begin</h3>
        </div>
        <div className="trackNo">
          <h3>
            Track{' '}
            {currentPreviewNo ? Math.floor(currentPreviewNo / 2) + 1 : '1'}
          </h3>
        </div>

        <CustomAudio
          ref={playerRef}
          src={allUrls[currentPreviewNo || 0]}
          autoPlay={true}
          onPlay={(e) => {
            if (currentPreviewNo === null && playerRef?.current) {
              setCurrentPreviewNo(0)
            }
          }}
        />
      </ShuffleBG>
    </>
  ) : (
    <div>loading</div>
  )
}
