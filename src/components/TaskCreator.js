import React from 'react'
import { styled } from 'styled-components'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addData } from '../redux/dataSlice';
import { formatTime, calcSecs } from './helperFunctions';
import { v4 as uuidv4 } from 'uuid';
import {AiOutlineCloseSquare} from "react-icons/ai"

const sections = ["today", "this-week", "count", "dates", "to-do"]
const types = ["checkbox", "counter", "timer"]

export const TaskCreator = ({setShowTaskCreator, taskSection}) => {
    const dispatch = useDispatch()
    const initialState = {id: uuidv4(),section: taskSection, type:"checkbox", value: null, completed: false, goal: null, notes:""}
    const [data, setData] = useState({...initialState})
    const [popup, setPopup] = useState(false)

    const handleChange = (id, value) => {
        setData({...data, [id]: value})
    }

    const handleTime = (timeStr) => {
        const timeArr = (timeStr).split(":");
      if(/^[0-9:]+$/.test(timeStr) && timeArr.length <=3){
        let seconds = +timeArr[0]*3600 + +timeArr[1]*60 + +timeArr[2]
        setData({...data, goal: formatTime(seconds)})
      }
    }

  return (
    <Wrapper>
        <TaskForm>
            <HideBtn onClick={() => setShowTaskCreator(false)}></HideBtn>
            <NameDiv>
                <NameInput id="name" type="text" onChange={(e) => handleChange(e.target.id, e.target.value)} required={true} placeholder='Task Name' maxLength={30}></NameInput>
            </NameDiv>
            <TypeDiv>
                <TypeLabel for="type">Type:</TypeLabel>
                <TypeSelect id="type" onChange={(e) => handleChange(e.target.id, e.target.value)}>
                    {types.map((type) => (
                        <Option value={type}>{type}</Option>
                    ))}
                </TypeSelect>
                {data.type === "counter" &&
                <GoalDiv>
                    <GoalLabel for="goal">Count Goal:</GoalLabel>
                    <GoalInput id="goal" type="number" onChange={(e) => handleChange(e.target.id, e.target.value)} required={true}/>
                </GoalDiv>
                }
                {data.type === "timer" &&
                <GoalDiv>
                    <GoalLabel for="goal">Time Goal</GoalLabel>
                    <GoalInput id="goal" type="text" defaultValue="00:00:00" onChange={(e) => handleTime(e.target.value)} required={true}/>
                </GoalDiv>
                }   
            </TypeDiv>
                <NotesTextArea id="notes" onChange={(e) => handleChange(e.target.id, e.target.value)} placeholder='Notes...'/>
            <SubmitBtn onClick={(e) => {
                e.preventDefault()
                if(data.name){
                    dispatch(addData(data))
                    setShowTaskCreator(false)
                }
                else setPopup(true)
            }} type="submit">Add Task</SubmitBtn>
            {popup && <PopupText>*Task name required!*</PopupText>}
        </TaskForm>
    </Wrapper>
  )
}

const PopupText = styled.div`
    text-align: center;
    color: red;
    font-size: 14px;
`

const GoalInput = styled.input`
    width: 90px;
    font-size: 16px;
`

const GoalLabel = styled.label`
    width: 90px;
`

const GoalDiv = styled.div`
    display: flex;
    align-items: center;
    
`

const NotesTextArea = styled.textarea`
flex: 1;
font-size: 17px;
resize: none;
/* height: 200px; */
`

const NotesLabel = styled.label`
`

const NotesDiv = styled.div`
`

const TypeSelect = styled.select`
    font-size: 17px;
`

const TypeLabel = styled.label`
`

const TypeDiv = styled.div`
    display: flex;
    column-gap: 10px;
    align-items: center;
`

const Option = styled.option`
`

const DropDown = styled.select`
`

const SectionLabel = styled.label`
`

const SectionDiv = styled.div`
`

const SubmitBtn = styled.button`
    padding-top: 4px;
    border: 2px solid black;
    background-color: black;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
`

const NameLabel = styled.label`

`

const NameInput = styled.input`
font-size: 17px;
flex: 1
`

const NameDiv = styled.div`
    display: flex;
    
`

const TaskForm = styled.form`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #f7f7f7;
    padding: 20px;
    border: 2px solid black;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    width: 400px;
    height: 290px;
`

const HideBtn = styled(AiOutlineCloseSquare)`
    font-size: 20px;
    align-self: end;
    cursor: pointer;
`

const Wrapper = styled.div`
    position: absolute;
    background-color: rgb(220, 220, 220, 0.8);
    width: 100%;
    height: 100%;
    z-index: 10;
    top: 0;
    left: 0;
`
