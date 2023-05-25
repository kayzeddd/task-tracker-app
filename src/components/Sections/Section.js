import styled from 'styled-components'
import React from 'react'
import { useDispatch } from 'react-redux'
import { resetData } from '../../redux/dataSlice'
import {GoDiffAdded} from "react-icons/go"
import {HiRefresh} from "react-icons/hi"
import { TaskCard } from '../TaskCard'

export const Section = ({data, section, addStyle, setShowTaskCreator, setTaskSection, dataId}) => {
  const dispatch = useDispatch()

  return (
    <Wrapper style={addStyle}>
        <TopDiv>
          <AddBtn 
          onClick={() => {
            setTaskSection(dataId)
            setShowTaskCreator(true)
            }}
            style={{ color: "white" }}
            title='Add Task'
            />
          <H1>{section}</H1>
          {["Today", "This Week"].includes(section) && 
            <ResetBtn 
            onClick={() => {
              if(data.length > 0){
                dispatch(resetData({section: data[0].section}))
              }}
            }
            title='Reset Tasks'
            />
            }
        </TopDiv>
        <Content>
          <CardList>
              {data && data.map(taskData => (
                  <TaskCard taskData={taskData}/>
              ))}
          </CardList>
        </Content>
    </Wrapper>
  )
}

const AddBtn = styled(GoDiffAdded)`
  position: absolute;
  left: 2%;
  font-size: 20px;
  color: white !important;

  &:hover{
    cursor: pointer;
  }
`

const ResetBtn = styled(HiRefresh)`
position: absolute;
right: 2%;
font-size: 20px;
  color: white !important;
  &:hover{
    cursor: pointer;
  }
`

const ResetButton = styled.button`
position: absolute;
right: 2%;
`

const TopDiv = styled.div`
position: relative;
height: 22px;
display: flex;
justify-content: center;
align-items: center;
border-bottom: 2px solid black;
  background-color: #383838;
  z-index: 1;
  
`

const Content = styled.div`
overflow: auto;
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
flex: 1;
overflow: hidden;
`