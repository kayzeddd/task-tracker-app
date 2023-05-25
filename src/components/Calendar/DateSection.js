import styled from 'styled-components'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addDates } from '../../redux/dataSlice'
import Calendar from 'react-calendar';
import './Calendar.css'
import { sameDate } from '../helperFunctions'

import { TaskCard } from '../TaskCard'

export const DateSection = ({data}) => {
  const dispatch = useDispatch()
    const [showList, setShowList] = useState(true)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [importantDates, setImportantDates] = useState(() => {
      return data.map( dateObj => {
        return {date: new Date(dateObj.date), text: dateObj.text}
      })
    });
    const [text, setText] = useState("")

    const tileClassName = ({date}) => {
      const important = importantDates.some(impDate => sameDate(impDate.date, date))
      const selected = sameDate(selectedDate, date);
      if(selected && important){
        return `activeTile dateStyle tileStyle`
      }
      if(selected){
        return `activeTile tileStyle`
      }
      if(important){
        return 'dateStyle tileStyle'
      }
      return 'tileStyle'
    } 

    const addDateText = (e) => {
      setText(e.target.text)
      if(e.target.value === ""){
        setImportantDates([...importantDates].filter( impDate => !sameDate(impDate.date, selectedDate)))
      }
      else if(importantDates.some(impDate => sameDate(impDate.date, selectedDate))){
        setImportantDates([...importantDates].map(impDate => {
          if(sameDate(impDate.date, selectedDate)){
            return {date: selectedDate, text: e.target.value}
          }
          return impDate
        }))
      }
      else {
        setImportantDates([...importantDates, {date: selectedDate, text: e.target.value}])
    }}

    useEffect(() => {
      const reformat = [...importantDates].map( impDate => {
        return {...impDate, date: impDate.date.toString()} })
      dispatch(addDates(reformat))
    }, [importantDates])

    useEffect(() => {
      const dateText = [...importantDates].find( impDate => sameDate(impDate.date, selectedDate))
      if(!dateText){
        setText("")
      }
      else setText(dateText.text)
    }, [selectedDate])

  return (
    <Wrapper>
        <TopDiv>
          <H1>Important Dates</H1>
        </TopDiv>
        {/* {showList && 
        <CardList>
            {data && data.map(taskData => (
                <TaskCard taskData={taskData}/>
            ))}
        </CardList>} */}
        <CalendarDiv>
            <MyCalendar 
                onChange={(value, event) => {
                  setSelectedDate(value)
                }} 
                value={selectedDate} 
                calendarType='US'
                tileClassName={tileClassName}
            />
        </CalendarDiv>
        <NotesTextarea
        placeholder='select date and type details to set important date'
          onChange={(e)=>{addDateText(e)}}
          value={text}
        ></NotesTextarea>
    </Wrapper>
  )
}

const NotesTextarea = styled.textarea`
  flex: 1;
  resize: none;
  font-size: 18px;
  border: none;
  border-top: 1px solid black;
  &:focus{
    outline: none;
  }
`

const MyCalendar = styled(Calendar)`
flex: 1;
display: flex;
flex-direction: column;
  justify-content: center;
  align-items: center;
`

const CalendarDiv= styled.div`
display: flex;
justify-content: center;
`

const ResetButton = styled.button`
position: absolute;
right: 2%;
`

const TopDiv = styled.div`
position: relative;
height: 23px;
display: flex;
justify-content: center;
align-items: center;
border-bottom: 2px solid black;
  background-color: #383838;

`

const CardList = styled.div`
`

const H1 = styled.div`
  text-align: center;
  font-weight: bold;
  color: white;
  font-size: 17px;
`

const Wrapper = styled.div`
display: flex;
flex-direction: column;
 border-bottom: 2px solid black;
 flex: 1;
`