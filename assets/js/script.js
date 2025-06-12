
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





//배정 시 숙소 예약완료
const finselectChecked = new Set(); 
let finselectIsChecked = false;
const checkedBoxes = new Set(); 

document.getElementById('finselect').addEventListener('change', function () {
  finselectIsChecked = this.checked;

  if (!finselectIsChecked) {
    checkedBoxes.clear();
  }
});

document.querySelectorAll('input[name="test00"]').forEach(cb => {
  cb.addEventListener('change', function () {
    if (this.checked) {
      checkedBoxes.add(this);
    } else {
      checkedBoxes.delete(this);
    }
  });
});

document.querySelector('a.btn_save').addEventListener('click', () => {
  if (!finselectIsChecked) {
    return;
  }

  checkedBoxes.forEach(checkbox => {
    const td = checkbox.closest('td');
    if (td) {
      td.classList.remove('bj_male', 'bj_female', 'bj_disAble', 'bj_finish');
      td.classList.add('bj_finish');
    }
    checkbox.checked = false;
  });

  checkedBoxes.clear();
});
