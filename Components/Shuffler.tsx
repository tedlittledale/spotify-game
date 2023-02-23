import React, { useEffect, useState, useRef } from 'react'

export const Shuffler = ({ top20 }: { top20: any }) => {
  const [previewUrls, setpreviewUrls] = useState([])
  const [allUrls, setAllUrls] = useState<string[]>([])
  const [currentPreviewNo, setCurrentPreviewNo] = useState<number | null>(null)
  const [finished, setFinished] = useState(false)
  const playerRef = useRef(null)
  const canvasRef = useRef(null)

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
    setpreviewUrls(previewUrls)
    setAllUrls(allUrls)

    return () => {}
  }, [top20])

  useEffect(() => {
    console.log('here', { playerRef })
    const timer = setTimeout(
      () => {
        if (currentPreviewNo !== null && allUrls[currentPreviewNo + 1]) {
          setCurrentPreviewNo(currentPreviewNo + 1)
        } else if (currentPreviewNo !== null) {
          setFinished(true)
        }
      },
      (currentPreviewNo && currentPreviewNo % 2) === 0 ? 5000 : 1200
    )
    return () => clearTimeout(timer)
  }, [currentPreviewNo, allUrls])

  console.log({ allUrls, currentPreviewNo })
  if (finished) {
    return <div>Finished</div>
  }
  let audioSource = null
  let analyser = null
  return allUrls ? (
    <>
      {/* <canvas ref={canvasRef} /> */}
      <audio
        ref={playerRef}
        src={allUrls[currentPreviewNo || 0]}
        autoPlay={true}
        onPlay={(e) => {
          if (currentPreviewNo === null && playerRef?.current) {
            setCurrentPreviewNo(0)
            // const audioCtx = new window.AudioContext()
            // audioSource = audioCtx.createMediaElementSource(playerRef?.current)
            // analyser = audioCtx.createAnalyser()
            // audioSource.connect(analyser)
            // analyser.connect(audioCtx.destination)
            // analyser.fftSize = 128
            // const bufferLength = analyser.frequencyBinCount
            // const dataArray = new Uint8Array(bufferLength)
            // console.log({ analyser })
          }
        }}
        controls
      />
    </>
  ) : (
    <div>loading</div>
  )
}
