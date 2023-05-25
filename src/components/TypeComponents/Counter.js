import React from 'react'
import { styled } from 'styled-components'
import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { updateData } from '../../redux/dataSlice'

import {MdKeyboardDoubleArrowUp, MdKeyboardDoubleArrowDown} from "react-icons/md"

export const Counter = ({taskData}) => {
    const dispatch = useDispatch();

    const [count, setCount] = useState(0)
    const [editting, setEditting] = useState(false)

    useEffect(() => {
        dispatch(updateData({...taskData, value: count, completed: +taskData.goal <= count ? true : false }))
    },[count])

    useEffect(() => {
      setCount(taskData.value || 0)
    }, [taskData])

    const handleNumber = (value) => {
      const newValue = value.replace(/^0+/, '');

      setCount(newValue)
    }

  return (
    <Wrapper>
      {/* <ArrowDown
        onClick={() => setCount(count - 1)}
        title='-1'
      /> */}
      <Div>
        {!editting 
        ?<>
          <ArrowUp
          onClick={() => setCount(+count + 1)}
          title='+1'
          />
          <CountDiv
          title="click to edit"
            onClick={() =>{
              setEditting(true)
            }}
          >{count}</CountDiv>
          <ArrowDown
          onClick={() => setCount(+count - 1)}
          title='-1'
                />
        </>
        :<Input 
        value={count} 
        onChange={(e) => handleNumber(e.target.value)} 
        type="number"
        autoFocus={editting}
        onBlur={(e) => {
          handleNumber(e.target.value)
          setEditting(false)
        }}
        />}
      </Div>
      {/* <ArrowDown
        onClick={() => setCount(count - 1)}
        title='-1'
      /> */}
    </Wrapper>
  )
}

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const CountDiv = styled.div`
font-weight: bold;
cursor: pointer;
width: 30px;
text-align: center;
`

const ArrowUp = styled(MdKeyboardDoubleArrowUp)`
  font-size: 20px;
  margin-right: 10px;

  &:hover{
    cursor: pointer;
  }
`

const ArrowDown = styled(MdKeyboardDoubleArrowDown)`
  font-size: 20px;
  margin-left: 10px;

  &:hover{
    cursor: pointer;
  }
`

const Wrapper = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: center;
`

const Goal = styled.div`
`

const Input = styled.input`
  width: 60px;
  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`