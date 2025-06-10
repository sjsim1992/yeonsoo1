
//시설 예약 정보


document.addEventListener("DOMContentLoaded", function () {

  const roomList = document.querySelector(".room-list");//공간리스트
  const mapBox = document.querySelector(".map-container"); //지도 wrap
  const infoTable = document.querySelector(".info_table");//시설 예약하기 표



  // 지도 위에 포인트 복제
  const clonedRoomList = roomList.cloneNode(true);
  clonedRoomList.classList.add("map-overlay");



  // 위치 지정용 맵
  const positionMap = {
    //2층
    "200호": { top: "104px", left: "175px" },
    "201호": { top: "147px", left: "695px" },
    "202호": { top: "229px", left: "666px" },
    "203호": { top: "292px", left: "547px" },
    // 3층
    "300호": { top: "128px", left: "254px" },
    "308호": { top: "192px", left: "426px" },
    "306호": { top: "263px", left: "433px" }
  };



  // 각 li에 위치 적용
  clonedRoomList.querySelectorAll("li").forEach((li) => {
    const ho = li.getAttribute("data-ho");
    if (positionMap[ho]) {
      li.style.top = positionMap[ho].top;
      li.style.left = positionMap[ho].left;
    }
  });

  mapBox.appendChild(clonedRoomList);



  // 클릭 이벤트 - 리스트와 지도 둘 다
  [roomList, clonedRoomList].forEach((list) => {
    list.addEventListener("click", function (event) {
      const li = event.target.closest("li");
      if (!li) return;
      event.preventDefault();

      const ho = li.getAttribute("data-ho");

      syncActiveClasses(ho);
      updateInfoTable(li);
    });
  });



  function syncActiveClasses(ho) {
    const allItems = [
      ...roomList.querySelectorAll("li"),
      ...clonedRoomList.querySelectorAll("li"),
    ];
    allItems.forEach((item) => {
      item.classList.toggle("active", item.getAttribute("data-ho") === ho);
    });
  }

  function updateInfoTable(item) {
  const name = item.querySelector(".name")?.innerText || "";
  const ho = item.querySelector(".ho")?.innerText || "";
  const statusText = item.querySelector(".status")?.innerText || "";


  // 상태에 따라 클래스 결정
  let statusClass = "";
  if (statusText === "예약완료") {
    statusClass = "booked";
  } else if (statusText === "예약가능") {
    statusClass = "available";
  }

  
  // 상태에 따라 버튼 or 텍스트 결정
  const actionHtml = (statusText === "예약가능")
    ? `<a href="#" class="btn_save_small">예약하기</a>`
    : `<span class="disabled-text">예약불가</span>`;




  const infoTable = document.querySelector(".info_table");
  const tbody = document.getElementById("bookingInfoBody");

  // 내용 업데이트
  tbody.innerHTML = `
    <tr>
      <td></td> 
      <td></td>  
      <td></td>  
      <td></td>  
      <td></td>    
      <td>${name}</td>
      <td>${ho}</td>
      <td><span class="tdStatus ${statusClass}">${statusText}</span></td>
      <td>${actionHtml}</td>   
    </tr>
  `;

  // 표시하기
  infoTable.style.display = "block";
}

});


