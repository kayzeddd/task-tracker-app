import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCheckIn } from '../../redux/dataSlice';

export const CheckIn = ({data}) => {
    const dispatch = useDispatch();
    const [morningText, setMorningText] = useState(data.morning || "")
    const [nightText, setNightText] = useState(data.night || "")

    const handleMorningText = (value) => {
        setMorningText(value)
    }

    const handleNightText = (value) => {
        setNightText(value)
    }

    useEffect(() => {
        dispatch(addCheckIn({section: "morning", text: morningText}))
    }, [morningText])

    useEffect(() => {
        dispatch(addCheckIn({section: "night", text: nightText}))
    }, [nightText])

  return (
    <CheckInDiv>
        <TopDiv>
            <H1>Check In</H1>
        </TopDiv>
          <TextDiv>
              {/* <Label>Morning Notes:</Label> */}
              <TextArea onChange={(e) => handleMorningText(e.target.value)} placeholder='Morning Notes...'>{morningText}</TextArea>
              {/* <Label>Night Notes:</Label> */}
              <TextArea  onChange={(e) => handleNightText(e.target.value)} placeholder='Night Notes...'>{nightText}</TextArea>
          </TextDiv>
    </CheckInDiv>
  )
}

const TextDiv = styled.div`
    flex: 1;
    padding: 5px;
    display: flex;
    flex-direction: column;
`

const TopDiv = styled.div`
    display: flex;
    height: 22px;
    align-items: center;
    justify-content: center;
    background-color: #383838;
`

const H1 = styled.div`
  text-align: center;
  font-weight: bold;
  background-color: #383838;
  color: white;
  font-size: 17px;
`

const CheckInDiv = styled.div`
flex: 1.5;
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
`

const TextArea = styled.textarea`
flex: 1;
resize: none;
border: none;
font-size: 18px;
`
