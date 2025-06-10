
// 남여 배정변경

const clickedCheckboxes = new Set();

document.querySelectorAll('td input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', function () {
    if (this.checked) {
      clickedCheckboxes.add(this);
    } else {
      clickedCheckboxes.delete(this);
    }
  });
});

document.querySelector('a.btn_save').addEventListener('click', () => {
  const selectedGender = document.querySelector('input[name="genderSelect"]:checked')?.id;

  clickedCheckboxes.forEach(checkbox => {
    const td = checkbox.closest('td');
    if (td) {
      td.classList.remove('bj_male', 'bj_female', 'bj_disAble');

      if (selectedGender === 'gender_male') {
        td.classList.add('bj_male');
      } else if (selectedGender === 'gender_female') {
        td.classList.add('bj_female');
      }
    }
  });

  clickedCheckboxes.forEach(checkbox => {
    checkbox.checked = false;
  });

  clickedCheckboxes.clear();
});
























// 호수 전체 선택
document.getElementById('allselect').addEventListener('change', function() {
  const checkboxes = document.querySelectorAll('input[name="test00"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = this.checked; 
  });
});



















const finselectChecked = new Set(); // 1단계 조건 체크용 (사실 boolean으로 써도 됨)
let finselectIsChecked = false;
const checkedBoxes = new Set(); // 2단계: 사용자가 체크한 test00 체크박스 저장

// 1단계 finselect 체크 변화 감지
document.getElementById('finselect').addEventListener('change', function () {
  finselectIsChecked = this.checked;

  // finselect 체크 해제 시 checkedBoxes 초기화
  if (!finselectIsChecked) {
    checkedBoxes.clear();
  }
});

// 2단계 test00 체크박스 클릭 감지
document.querySelectorAll('input[name="test00"]').forEach(cb => {
  cb.addEventListener('change', function () {
    if (this.checked) {
      checkedBoxes.add(this);
    } else {
      checkedBoxes.delete(this);
    }
  });
});

// 3단계 저장 버튼 클릭 시
document.querySelector('a.btn_save').addEventListener('click', () => {
  if (!finselectIsChecked) {
    // finselect 체크 안 되어 있으면 아무 작업도 안 함
    return;
  }

  // finselect 체크 되어 있고, 사용자가 체크한 체크박스만 처리
  checkedBoxes.forEach(checkbox => {
    const td = checkbox.closest('td');
    if (td) {
      td.classList.remove('bj_male', 'bj_female', 'bj_disAble', 'bj_finish');
      td.classList.add('bj_finish');
    }
    checkbox.checked = false;
  });

  // 초기화
  checkedBoxes.clear();
});