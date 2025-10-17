// Lấy các phần tử cần dùng
const images = document.querySelectorAll(".image-container img");
const infoBox = document.getElementById("infoBox");
const infoTitle = document.getElementById("infoTitle");
const infoText = document.getElementById("infoText");
const infoImage = document.getElementById("infoImage"); // <-- thêm dòng này
const closeBtn = document.getElementById("closeBtn");

// Khi click vào từng ảnh
images.forEach((img) => {
  img.addEventListener("click", () => {
    const title = img.getAttribute("data-title");
    const info = img.getAttribute("data-info");
    const src = img.getAttribute("src"); // lấy link ảnh

    infoTitle.textContent = title;
    infoText.textContent = info;
    infoImage.src = src; // <-- gán ảnh vào bảng thông tin

    infoBox.style.display = "flex";
  });
});

// Khi bấm nút "Đóng"
closeBtn.addEventListener("click", () => {
  infoBox.style.display = "none";
});

// ================== PHẦN HỌC SINH TIÊU BIỂU ==================
const studentCards = document.querySelectorAll(".student-card");
const studentInfoBox = document.getElementById("studentInfoBox");
const studentImage = document.getElementById("studentImage");
const studentName = document.getElementById("studentName");
const studentScore = document.getElementById("studentScore");
const studentInfo = document.getElementById("studentInfo");
const closeStudentBtn = document.getElementById("closeStudentBtn");

studentCards.forEach((card) => {
  card.addEventListener("click", () => {
    const name = card.getAttribute("data-name");
    const score = card.getAttribute("data-score");
    const info = card.getAttribute("data-info");
    const imgSrc = card.getAttribute("data-img");

    studentName.textContent = name;
    studentScore.textContent = "Điểm trung bình: " + score;
    studentInfo.textContent = info;
    studentImage.src = imgSrc;

    studentInfoBox.style.display = "flex";
  });
});

closeStudentBtn.addEventListener("click", () => {
  studentInfoBox.style.display = "none";
});

// ================== NÚT CHUYỂN TRANG ==================
const viewButtons = document.querySelectorAll(".view-btn");

viewButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.stopPropagation(); // Ngăn không cho mở popup khi bấm nút
    const card = btn.closest(".teacher-card");
    const link = card.getAttribute("data-link");
    if (link) {
      window.open(link, "_blank"); // Mở trang mới
    }
  });
});
