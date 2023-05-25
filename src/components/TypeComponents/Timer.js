import React from 'react'
import { styled } from 'styled-components'
import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { updateData } from '../../redux/dataSlice'
import { formatTime } from '../helperFunctions'
import {FaPlay, FaPause} from "react-icons/fa"
import {AiFillEdit} from "react-icons/ai"

export const Timer = ({taskData}) => {
    const dispatch = useDispatch();
    const timeInputRef = useRef();

    const [time, setTime] = useState(+taskData.value || 0)
    const [clock, setClock] = useState(`00:00:00`)
    const [intervalId, setIntervalId] = useState(null)
    const [editting, setEditting] = useState(false)
    const [goalSecs, setGoalSecs] = useState(() => {
      if(!taskData.goal){
        return 99999999999999999
      }
      const timeArr = taskData.goal.split(":");
      return +timeArr[0]*3600 + +timeArr[1]*60 + +timeArr[2]
    })

    const startTimer = () => {
      const interval = setInterval(() => {
        setTime(time => time + 1)
      }, 1000)
      setIntervalId(interval)
    }
  
    const stopTimer = () => {
      clearInterval(intervalId)
      setIntervalId(null)
    }

    useEffect(() => {
      setTime(taskData.value || 0)
    }, [taskData])
    
    useEffect(() => {
      dispatch(updateData({...taskData, value: time, completed: time >= goalSecs ? true : false}))
      setClock(formatTime(time))
    },[time])

    useEffect(() => {
      return () => {
        stopTimer()
      }
    }, [])

    const changeTime = (value) => {
      const timeArr = (value).split(":");
      if(/^[0-9:]+$/.test(value) && timeArr.length <=3){
        setTime(+timeArr[0]*3600 + +timeArr[1]*60 + +timeArr[2])
      }
    }

  return (
    <TimerDiv>
        {!editting 
          ?<TimeDiv>
            {intervalId 
              ? <PauseBtn onClick={stopTimer}/>
              : <PlayBtn onClick={startTimer}/>
            }
            <Time 
            title='click to edit'
            onClick={() => {
                  setEditting(true)
                  stopTimer()
            }}>{clock}
            </Time>
            <EditBtn onClick={(e) =>{
                setEditting(true)
              }}
              title='Edit Time'
            />   
          </TimeDiv>
          :<EditDiv>
            <EditTime 
              id="time"
              type="text"
              onBlur={(e) =>{
                changeTime(e.target.value)
                setEditting(false)
              }}
              defaultValue={clock}
              ref={timeInputRef}
              autoFocus={true}
            />
            <EditBtn onClick={(e) =>{
                changeTime(timeInputRef.current.value || "00:00:00")
                setEditting(false)
              }
            }
            title='Save Edit'/>     
          </EditDiv>
        }
        
    </TimerDiv>
  )
}

const EditBtn = styled(AiFillEdit)`
&:hover{
  cursor: pointer;
}
`

const PauseBtn = styled(FaPause)`
`

const PlayBtn = styled(FaPlay)`
`

const TimeDiv = styled.div`
  display: flex;
  column-gap: 4px;
  align-items: center;
`


const EditTime = styled.input` 
  width: 80px;
`


const EditDiv = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`


const TimerDiv = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
`

const Time = styled.div`
border: 4px solid black;
background-color: black;
color: white;
cursor: pointer;
`