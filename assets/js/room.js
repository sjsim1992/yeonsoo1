//시설 예약 정보

document.addEventListener("DOMContentLoaded", function () {
  const roomList = document.querySelector(".room-list"); // 공간리스트
  const mapBox = document.querySelector(".map-container"); // 지도 표시 영역
  const infoTable = document.querySelector(".info_table"); // 시설 예약하기 표

  // 지도 위에 표시할 공간 리스트를 복제함
  const clonedRoomList = roomList.cloneNode(true);
  clonedRoomList.classList.add("map-overlay");

  // 위치 지정용 객체 (지도 위에서 각 호수 위치) 
  const positionMap = {
    //2층
    "200호": { top: "131px", left: "43px" },
    "201호": { top: "193px", left: "713px" },
    "202호": { top: "298px", left: "705px" },
    "203호": { top: "371px", left: "573px" },
    // 3층
    "300호": { top: "96px", left: "108px" },
    "308호": { top: "258px", left: "406px" },
    "306호": { top: "345px", left: "406px" },
    // 4층
    "415호": { top: "296px", left: "754px" },
    "401호": { top: "386px", left: "785px" },
    "406호": { top: "386px", left: "582px" },
    "407호": { top: "386px", left: "459px" },
    "408호": { top: "386px", left: "393px" },
    "409호": { top: "386px", left: "329px" },
    "402호": { top: "386px", left: "742px" },
    "403호": { top: "386px", left: "709px" },
    "404호": { top: "386px", left: "678px" },
    "405호": { top: "386px", left: "646px" },
    "413호": { top: "296px", left: "646px" },
    "414호": { top: "296px", left: "680px" },
    "410호": { top: "296px", left: "330px" },
    "412호": { top: "296px", left: "414px" },
    // 5층
    "502호": { top: "384px", left: "775px" },
    "503호": { top: "384px", left: "710px" },
    "504호": { top: "384px", left: "644px" },
    "505호": { top: "384px", left: "579px" },
    "506호": { top: "384px", left: "464px" },
    "507호": { top: "384px", left: "404px" },
    "508호": { top: "384px", left: "345px" },
    "509호": { top: "384px", left: "286px" },
    "511호": { top: "292px", left: "327px" },
    "513호": { top: "292px", left: "412px" },
    "501호": { top: "384px", left: "841px" },
    // 6층
    "612호": { top: "292px", left: "700px" },
    "602호": { top: "384px", left: "791px" },
    "603호": { top: "384px", left: "725px" },
    "604호": { top: "384px", left: "659px" },
    "605호": { top: "384px", left: "593px" },
    "610호": { top: "292px", left: "397px" },
    "601호": { top: "384px", left: "858px" },
  };

  // 복제된 리스트의 각 li에 위치 적용
  clonedRoomList.querySelectorAll("li").forEach((li) => {
    const ho = li.getAttribute("data-ho");
    if (positionMap[ho]) {
      li.style.top = positionMap[ho].top;
      li.style.left = positionMap[ho].left;
    }
  });

  // 복제된 리스트를 지도에 추가
  mapBox.appendChild(clonedRoomList);


  
  // 클릭 이벤트 - 공간 리스트와 지도 둘 다
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



  // 리스트랑 지도랑 active클래스 주기
  function syncActiveClasses(ho) {
    const allItems = [
      ...roomList.querySelectorAll("li"),
      ...clonedRoomList.querySelectorAll("li"),
    ];
    allItems.forEach((item) => {
      item.classList.toggle("active", item.getAttribute("data-ho") === ho);
    });
  }




  // 시설 예약하기 표
  function updateInfoTable(item) {
    const name = item.querySelector(".name")?.innerText || ""; //실명
    const ho = item.querySelector(".ho")?.innerText || ""; //호수
    const statusText = item.querySelector(".status")?.innerText || ""; //예약상태

    // 상태에 따라 클래스 결정
    let statusClass = "";
    if (statusText === "예약완료") {
      statusClass = "booked";
    } else if (statusText === "예약가능") {
      statusClass = "available";
    }

    // 상태에 따라 버튼 or 텍스트 결정
    const actionHtml =
      statusText === "예약가능"
        ? `<a href="#" class="btn_save_small">예약하기</a>`
        : `<span class="disabled-text">예약불가</span>`;

    const tbody = document.getElementById("bookingTableBody");

    // 표 내용 업데이트
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
  }
});
