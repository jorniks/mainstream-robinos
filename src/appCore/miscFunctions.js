




export const getEventROI = (id, arrayToLoop) => {
  let eventROI = {}
  
  arrayToLoop?.forEach((element) => {
    if (element.id === parseInt(id)) {
      eventROI['minROI'] = element.minROI;
      eventROI['maxROI'] = element.maxROI;
    }
  });
  return eventROI;
};



export const getEventData = (id, arrayToLoop, partToGet) => {
  let eventCode = ""
  
  arrayToLoop?.forEach((element) => {
    if (element.id === parseInt(id)) {
      eventCode = element[partToGet];
    }
  });
  return eventCode;
};




export const calculateTimeLeft = (saleEndDate) => {
  let difference = +(saleEndDate * 1000) - +new Date();

  let timeLeft = {
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  };

  if (difference > 0) {
    timeLeft = {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0'),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
      minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
    };
  }

  return timeLeft;
}

