import React from 'react'
import { styled } from 'styled-components'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { removeData, updateData } from '../redux/dataSlice'

import { Timer } from './TypeComponents/Timer'
import { Checkbox } from './TypeComponents/Checkbox'
import { Counter } from './TypeComponents/Counter'
import {GrNotes} from "react-icons/gr"
import {MdDeleteForever} from "react-icons/md"
import {AiOutlineCloseSquare} from "react-icons/ai"

export const TaskCard = ({taskData}) => {
    const dispatch = useDispatch();
    const [showNote, setShowNote] = useState(false)
    const [note, setNote] = useState(taskData.notes)

    const handleNote = (e) => {
        setNote(e.target.value)
    }

    useEffect( () => {
        dispatch(updateData({...taskData, notes: note}))
    }, [note])

  return (
    <>
        {taskData &&
        (<Wrapper key={taskData.id} color={taskData.completed ? "#56b344" : "#fff04d"}>
            <LeftDiv>
                <Div>
                    <Name>{taskData.name}</Name>
                    {taskData.goal && <Goal>goal: {taskData.goal}</Goal>}
                </Div>
            </LeftDiv>
            <RightDiv>
                <NotesBtn onClick={() => setShowNote(true)} title='Notes'/>
                {showNote &&
                    <NotesWrapper>
                        <NotesDiv>
                            <HideBtn 
                            onClick={() => setShowNote(false)}
                            />
                            <Notes
                                onChange={(e) => handleNote(e)}
                                value={note}
                                placeholder='Notes...'
                            ></Notes>
                        </NotesDiv>
                    </NotesWrapper>
                }
                <TypeDiv>
                    {taskData.type === "checkbox"
                        ? <Checkbox taskData={taskData}/>
                        : taskData.type === "counter"
                        ? <Counter taskData={taskData}/>
                        : taskData.type === "timer"
                        ? (<Timer taskData={taskData}/>)
                        : null
                    }
                </TypeDiv>
            <DeleteBtn title='delete task' onClick={() => {dispatch(removeData(taskData))}}/>
            </RightDiv>
        </Wrapper>
        )}
    </>
  )
}

const HideBtn = styled(AiOutlineCloseSquare)`
    font-size: 20px;
    align-self: end;
    cursor: pointer;
`

const TypeDiv = styled.div`
flex: 1;
display: flex;
    margin-left: auto;
    margin-right: 0px;
`

const Goal = styled.div`
    font-size: 14px;
`

const Div = styled.div`
    display: flex;
    flex-direction:column;
    row-gap: 2px;
`

const LeftDiv = styled.div`
display: flex;
align-items: center;

`

const RightDiv = styled.div`
    display: flex;
    width: 170px;
    margin-right: 0;
    margin-left: auto;
    align-items: center;
    height: 25px;
    
`

const DeleteBtn = styled(MdDeleteForever)`
    font-size: 25px;
    cursor: pointer;
`

const CloseBtn = styled.button`
`
const Notes = styled.textarea`
flex: 1;
resize: none;
font-size: 18px;
`

const NotesWrapper = styled.div`
    position: absolute;
    background-color: rgb(220, 220, 220, 0.8);
    width: 100%;
    height: 100%;
    z-index: 10;
    top: 0;
    left: 0;
`

const NotesDiv = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: #f7f7f7;
    border: 2px solid black;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    width: 400px;
    height: 290px;
`

const NotesBtn = styled(GrNotes)`
font-size: 23px;
margin-right: 5px;
&:hover{
    cursor: pointer;
}
`

const Name = styled.div`
    font-weight: bold;
`

const Wrapper = styled.div`
    display: flex;
    border-bottom: 2px solid black;
    background-color: ${props => props.color};
    padding: 2px 5px;
    align-items: center;
    height: 36px;
`