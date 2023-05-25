export const formatTime = (seconds) => {
    let sec = seconds % 60
    let totalMinutes = Math.floor(seconds / 60)
    let minutes = totalMinutes % 60
    let hours = Math.floor(totalMinutes/60)
    if(sec < 10){
        sec = `0${sec}`
    }
    if(minutes < 10){
        minutes = `0${minutes}`
    }
    if(hours < 10){
        hours = `0${hours}`
    }
    return `${hours}:${minutes}:${sec}`
}

export const calcSecs = (timeStr) => {
    const timeArr = (timeStr).split(":");
    if(/^[0-9:]+$/.test(timeStr) && timeArr.length <=3){
      return +timeArr[0]*3600 + +timeArr[1]*60 + +timeArr[2]
    }
  }

export const sameDate = (date1, date2) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getDate() === date2.getDate()
    )
}