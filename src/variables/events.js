// All F1 events should have an ID between 71 and 89
// Other events should take up ID in other numbers

const pastAndOngoingEvents = [
  { id: 3,
    eventTitle: "F1 - US GP",
    sports: "motor_sport",
    img: '/img/events/f1Images/usGP.png',
    eventCode: "US2",
    minROI: 0.07,
    maxROI: 0.20,
    ROIInfo: 'Top 10 will be rewarded. <h6>1st place - Max ROI</h6> 10th place - Min ROI',
  },
  { id: 4,
    eventTitle: "World Cup 2022 - Quarter Finals",
    sports: "football",
    img: '/img/events/footballImages/fifa2022.jpg',
    eventCode: "WC2022",
    minROI: 0.05,
    maxROI: 0.25,
    ROIInfo: '20% discount till start of competition <h6> 10% till the end of the first game in all groups </h6> Sales end before the start of Round of 16',
  },
  { id: 2,
    eventTitle: "Test Event",
    sports: "motor_sport",
    img: '/img/events/f1Images/mexicosGP.png',
    eventCode: "web2Test",
    minROI: 0.07,
    maxROI: 0.20,
    ROIInfo: 'Top 10 will be rewarded. <h6>1st place - Max ROI</h6> 10th place - Min ROI',
  },
  { id: 1,
    eventTitle: "F1 - Japan GP",
    sports: "motor_sport",
    img: '/img/events/f1Images/japanGP.png',
    eventCode: "Japan",
    minROI: 0.07,
    maxROI: 0.20,
    ROIInfo: 'Top 10 will be rewarded. <h6>1st place - Max ROI</h6> 10th place - Min ROI',
  },
];






const futureEvents = [
  { id: 3,
    eventTitle: "F1 - Mexico GP",
    sports: "motor_sport",
    img: '/img/events/f1Images/mexicoGP.png',
    eventCode: "Mexico",
    minROI: 0.07,
    maxROI: 0.20,
    ROIInfo: 'Top 10 will be rewarded. <h6>1st place - Max ROI</h6> 10th place - Min ROI',
  },
];









export {
  futureEvents,
  pastAndOngoingEvents
}