import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

type Item = {
  id: number
  name: string
  searchName: string
}

interface GuesserProps {
  top20: any
}
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

const GuesserBG = styled.div`
  background: linear-gradient(270deg, #00ffc8, #00f0d0);
  height: 100%;
  display: grid;
  grid: auto auto 1fr 1fr / 1fr;
  grid-gap: 20px;
  align-items: space-around;
  padding: 20px 0;
  margin: 0;
  > * {
    margin: 0 20px;
  }
  > ul {
    margin: 0;
    padding: 0;
    li {
      padding: 10px 20px;
      font-size: 18px;
      &:nth-child(1) {
        background: linear-gradient(270deg, #00ffc8, #00f0d0);
      }
      &:nth-child(2) {
        background: linear-gradient(270deg, #00f0d0, #00e2d8);
      }
      &:nth-child(3) {
        background: linear-gradient(270deg, #00e2d8, #00d3e0);
      }
      &:nth-child(4) {
        background: linear-gradient(270deg, #00d3e0, #00c5e7);
      }
      &:nth-child(5) {
        background: linear-gradient(270deg, #00c5e7, #00b6ef);
      }
      &:nth-child(6) {
        background: linear-gradient(270deg, #00b6ef, #00a8f7);
      }
      &:nth-child(7) {
        background: linear-gradient(270deg, #00a8f7, #0099ff);
      }
      &:nth-child(8) {
        background: linear-gradient(270deg, #0099ff, #00a8f7);
      }
      &:nth-child(9) {
        background: linear-gradient(270deg, #00a8f7, #00b6ef);
      }
      &:nth-child(10) {
        background: linear-gradient(270deg, #00b6ef, #00c5e7);
      }
    }
  }
  > p {
    text-align: center;
  }
`

export const Guesser: React.FC<GuesserProps> = ({ top20 }) => {
  console.log({ top20 })
  const inputRef = useRef<HTMLInputElement>(null)
  const [clearing, setClearing] = useState<Boolean>(false)
  const [matches, setMatches] = useState<String[]>([])
  const [matchesCount, setMatchesCount] = useState<number>(0)
  const trackItems = top20
    .filter(({ preview_url }: { preview_url: any }) => preview_url !== null)
    .map(
      ({ name, artists }: { name: string; artists: any[] }, idx: number) => ({
        id: idx,
        name: `${name} - ${artists[0].name}`,
        searchName: name,
      })
    )
  console.log({ trackItems })

  const handleOnSearch = (string: string, results: any[]) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result: any) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item: Item) => {
    // the item selected
    const { name, id } = item
    const newMatches = [...matches]
    console.log({ name, id })
    if (!matches[id]) {
      newMatches[id] = name
      setMatches(newMatches)
      setClearing(true)
      setTimeout(() => {
        setClearing(false)
      }, 10)
      setMatchesCount(matchesCount + 1)
    }
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }
  console.log(matches.length)
  return (
    <GuesserBG>
      <h3>Now name those tracks</h3>
      <div ref={inputRef}>
        {!clearing ? (
          <ReactSearchAutocomplete<Item>
            items={trackItems}
            fuseOptions={{
              keys: ['searchName'],
              minMatchCharLength: 4,
              threshold: 0.2,
              ignoreLocation: true,
            }}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            placeholder="Search for a song name"
          />
        ) : (
          <div></div>
        )}
      </div>
      <ul>
        {Array(10)
          .fill(0)
          .map((_, idx) => (
            <li key={idx}>
              {idx + 1} {matches[idx] ? `- ${matches[idx]}` : '...'}
            </li>
          ))}
      </ul>
      <p>
        {matchesCount === 10 ? 'Congratulations, your know what you like!' : ''}
      </p>
    </GuesserBG>
  )
}
