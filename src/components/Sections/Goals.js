import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addGoal } from '../../redux/dataSlice';

export const Goals = ({data}) => {
  const dispatch = useDispatch()
  const [text, setText] = useState(data.text || "")

  const handleText = (value) => {
    setText(value)
  }

  useEffect(() => {
    dispatch(addGoal({text}))
  }, [text])

  return (
    <GoalsDiv>
        <TopDiv>
            <H1>Goals</H1>
        </TopDiv>
        <TextDiv>
            <TextArea onChange={(e) => handleText(e.target.value)} placeholder='1. Go to space!'>{text}</TextArea>
        </TextDiv>
    </GoalsDiv>
  )
}
const TextDiv = styled.div`
    flex: 1;
    padding: 5px;
    display: flex;
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


const GoalsDiv = styled.div`
flex: 1;
  display: flex;
  flex-direction: column;
  border-left: 2px solid black;
`

const TextArea = styled.textarea`
flex: 1;
resize: none;
border: none;
font-size: 18px;

&:focus{
    outline: none;
}
`
