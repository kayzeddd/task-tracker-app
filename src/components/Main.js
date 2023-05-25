import React from 'react'
import styled from 'styled-components'
import { useState } from 'react';
import { useSelector } from 'react-redux';

import {Section} from './Sections/Section'
import { DateSection } from './Calendar/DateSection';
import {TaskCreator} from './TaskCreator'
import { CheckIn } from './Sections/CheckIn';
import { Rules } from './Sections/Rules';
import { Goals } from './Sections/Goals';

export const Main = () => {
    const data = useSelector((state) => state.data)
    const [ showTaskCreator, setShowTaskCreator ] = useState(false)
    const [taskSection, setTaskSection] = useState("today")

  return (
    <Wrapper>
        <TaskContainer>
        <Section dataId="today" data={data.today} section="Today" setShowTaskCreator={setShowTaskCreator} setTaskSection={setTaskSection}/>
        <Div>
          <Section dataId="this-week" data={data["this-week"]} section="This Week" addStyle={{ borderBottom: "2px solid black" }} setShowTaskCreator={setShowTaskCreator} setTaskSection={setTaskSection}/>
          <Section dataId="to-do" data={data["to-do"]} section="To Do" setShowTaskCreator={setShowTaskCreator} setTaskSection={setTaskSection}/>
        </Div>
        <Div>
          <DateSection data={data.dates}/>
          <Section dataId="count" data={data.count} section="Count / Streaks" setShowTaskCreator={setShowTaskCreator} setTaskSection={setTaskSection}/>
        </Div>
      </TaskContainer>
      <OtherContainer>
        <CheckIn data={data["check-in"]}/>
        <Goals data={data.goals}/>
        <Rules data={data.rules}/>
      </OtherContainer>
      {showTaskCreator && <TaskCreator taskSection={taskSection} setShowTaskCreator={setShowTaskCreator}/>}
    </Wrapper>
  )
}

const AddTaskBtn = styled.button`
`


const Wrapper = styled.div`
display: flex;
flex-direction: column;
 flex: 1;
`

const H1 = styled.div`
  text-align: center;
  font-weight: bold;
  border-bottom: 2px solid black;
  background-color: #383838;
  color: white;
`

const CheckInDiv = styled.div`
flex: 1.5;
  display: flex;
  flex-direction: column;
`

const GoalsDiv = styled.div`
flex: 1;
display: flex;
flex-direction: column;
border-left: 2px solid black;
`

const RulesDiv = styled.div`
flex: 1;
display: flex;
flex-direction: column;
border-left: 2px solid black;
`

const Label = styled.label`
`

const TextArea = styled.textarea`
`

const OtherContainer = styled.div`
  display: flex;
  flex: 1;
`

const Div = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-left: 2px solid black;
`

const TaskContainer = styled.div`
  display: flex;
  height: 72vh;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
`