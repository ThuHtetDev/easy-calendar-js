let selectedDate = "2020-01-01";
const date = new Date(selectedDate);

//! Render Calendar Func (All Process)
const renderCalendar = () => {

  date.setDate(1); // set date into current Date

  const monthDays = document.querySelector(".days");

  //! Get last day of current monthYear
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  //! Get previous last day of previous monthYear
  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();
 
  //! Get FirstDay and LastDay Index
  //! getDay() => sunday 0 ..monday 1 
  const firstDayIndex = date.getDay();
  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  //! Get Next days of next month in Current Month
  const nextDays = 7 - lastDayIndex - 1;

  //! In order to show Months
  const months = ["January","February", "March","April","May", "June","July","August","September",  "October","November","December"];

  const monthsInNum = ["01","02", "03", "04","05","06", "07", "08", "09","10","11","12"];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = date.toDateString().split(" ")[3];

  //! Looping Days Section
  let days = "";
  let selectedTextAfterRender = $("#selectedDayDate").text();
  
  //! Previous Last Day Looping
  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">
      ${prevLastDay - x + 1}
    </div>`;
  }

  //! All Days in selected Month Looping
  for (let i = 1; i <= lastDay; i++) {
      let v;
      if(i <10){
        v = "0"+i;
      }else{ v = i;}
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today" data-at="${date.getFullYear()}-${monthsInNum[date.getMonth()]}-${v}">${i}</div>`;
    } else {
      let dataAt = date.getFullYear() +'-'+monthsInNum[date.getMonth()]+'-'+v;
      days += `<div class=" ${dataAt == selectedTextAfterRender ? 'selectedDay': ''}" data-at="${date.getFullYear()}-${monthsInNum[date.getMonth()]}-${v}"  >${i}</div>`;
    }
  }

  //! Next Days showing Looping
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
  }

    monthDays.innerHTML = days;

    $(".days div").click(function(){
      $(".days").find('div').removeClass("selectedDay");
      console.log($(this).attr('data-at'));
      let selectedD = $(this).attr('data-at');
      $(this).addClass("selectedDay");
      $("#selectedDayDate").text(selectedD);
    });
};
document.querySelector(".prev").addEventListener("click",()=>{
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
 
});

renderCalendar();
