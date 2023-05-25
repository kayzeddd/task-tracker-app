import React from 'react'
import { styled } from 'styled-components'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateData } from '../../redux/dataSlice'
import {ImCheckboxChecked, ImCheckboxUnchecked} from "react-icons/im"

export const Checkbox = ({taskData}) => {
    const dispatch = useDispatch();

    const [checked, setChecked] = useState(taskData.value || false)

    useEffect(() => {
      dispatch(updateData({...taskData, value: checked, completed: checked}))
    },[checked])

    useEffect(() => {
        setChecked(!!taskData.value)
    }, [taskData])

  return (
    <Wrapper>
      {!checked
        ? <CheckBox
          onClick={() => {
              setChecked(true)
          }} />
        : <CheckedBox
          onClick={() => {
            setChecked(false)
          }} 
          />
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`

const CheckBox = styled(ImCheckboxUnchecked)`
font-size: 17px;
  &:hover{
    cursor: pointer;
  }
`

const CheckedBox = styled(ImCheckboxChecked)`
font-size: 17px;
&:hover{
    cursor: pointer;
  }
`

const Input = styled.input`
`
