/* 현재 월, 연도 초기화 */
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth() + 1;
let selectedDate = null; // 선택된 날짜를 저장할 변수

/* 달력 만드는 함수 createCalendar */
function createCalendar(year, month) {
  const today = new Date();
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  let html = "";

  // 달력의 헤더에 현재 연도와 월 표시
  document.getElementById("currentMonth").innerText = `${year}년 ${month}월`;

  // 6주로 구성하기
  for (let week = 0; week < 6; week++) {
    html += "<tr>";
    for (let day = 0; day < 7; day++) {
      const date = week * 7 + day - firstDay.getDay() + 1;
      if (date > 0 && date <= lastDay.getDate()) {
        const isToday = today.getFullYear() === year && (today.getMonth() + 1) === month && today.getDate() === date;
        const isSelected = selectedDate && selectedDate.getFullYear() === year && selectedDate.getMonth() + 1 === month && selectedDate.getDate() === date;
        html += `<td class="${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}" onclick="selectDate(${year}, ${month}, ${date})">${date}</td>`;
      } else {
        html += "<td></td>";
      }
    }
    html += "</tr>";
  }

  document.getElementById("calendarBody").innerHTML = html;
  updateSelectedDate();
}

// 날짜 선택 함수
function selectDate(year, month, day) {
  selectedDate = new Date(year, month - 1, day);
  createCalendar(currentYear, currentMonth);
  updateSelectedDate();
}

// 선택된 날짜 업데이트 함수
function updateSelectedDate() {
  const selectedDateElement = document.querySelector(".selectedDate");
  if (selectedDate) {
    selectedDateElement.textContent = `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`;
  }
}

// 달력 연도 표시
function changeMonth(offset){
  currentMonth += offset;
  if(currentMonth > 12){
    currentMonth = 1; // 월을 1월로 초기화
    currentYear++; // 연도 1증가시켜서 다음 해로 이동
  } else if(currentMonth < 1){
    currentMonth = 12; // 월 12로 설정
    currentYear--; // 연도를 1씩 감소시켜 이전 해로 이동
  }
  createCalendar(currentYear, currentMonth);
}

createCalendar(currentYear, currentMonth);
updateSelectedDate();