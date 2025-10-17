/* prediction.js
   Hoạt động:
   - chứa 60 dự đoán
   - dùng localStorage để lưu kết quả cho mỗi người (chỉ hiển thị với họ)
   - có animation để tờ kết quả "mở"
   - xử lý keyboard/ARIA cơ bản
*/

document.addEventListener("DOMContentLoaded", () => {
  // --- Elements ---
  const drawBtn = document.getElementById("pw-draw");
  const resetBtn = document.getElementById("pw-reset");
  const resultBox = document.getElementById("pw-result");
  const predictionText = document.getElementById("pw-text");
  const predictionMeta = document.getElementById("pw-meta");
  const paper = document.getElementById("pw-paper");

  // --- LocalStorage key (đặt tên riêng để tránh trùng) ---
  const STORAGE_KEY = "pw_user_prediction_v1";

  // --- 60 dự đoán (dễ chỉnh / mở rộng) ---
  const predictions = [
    "Bạn sẽ được giáo viên khen vì làm bài tốt!",
    "Một tiết học cực kỳ vui đang chờ bạn!",
    "Coi chừng có kiểm tra miệng bất ngờ 😆",
    "Bạn sẽ ngồi cạnh người bạn thân nhất!",
    "Tiết học Toán hôm nay trôi qua rất nhanh!",
    "Bạn sẽ phát hiện ra điều thú vị trong giờ Sinh học.",
    "Cô giáo hôm nay tâm trạng tốt lắm đó 😊",
    "Hôm nay bạn sẽ được điểm 10!",
    "Bạn quên đồ dùng học tập, nhưng may vẫn mượn được 😅",
    "Ai đó sẽ mượn bạn cây bút trong tiết sau ✏️",
    "Bạn sẽ là người đầu tiên giơ tay phát biểu!",
    "Hôm nay thầy cô sẽ kể chuyện vui trong lớp.",
    "Tiết học hôm nay dài… nhưng cực kỳ thú vị!",
    "Bạn sẽ học nhóm rất hiệu quả.",
    "Bạn sẽ cười rất nhiều trong giờ học hôm nay.",
    "Một tiết học nhẹ nhàng, không áp lực!",
    "Bạn sẽ bất ngờ với một câu hỏi dễ không ngờ 🤔",
    "Thầy cô khen bạn vì nỗ lực chăm chỉ.",
    "Cẩn thận, hôm nay dễ buồn ngủ trong tiết Văn 😴",
    "Có thể bạn sẽ được phân công làm nhóm trưởng!",
    "Hôm nay bạn học nhanh hơn mọi khi!",
    "Bạn sẽ giúp một bạn khác hiểu bài.",
    "Một tiết học đầy năng lượng và tiếng cười!",
    "Bạn sẽ làm được bài tập khó mà trước đây bạn sợ.",
    "Bạn sẽ quên vở ở nhà... nhưng không sao 😅",
    "Ai đó sẽ nhờ bạn chỉ bài!",
    "Thầy cô bất ngờ đổi chỗ ngồi hôm nay!",
    "Bạn sẽ học được điều mới cực kỳ hay!",
    "Tiết học Hóa hôm nay sẽ có thí nghiệm thú vị 🔬",
    "Bạn sẽ gặp may trong tiết thể dục!",
    "Bạn sẽ được gọi lên bảng (và làm đúng hết 👏)",
    "Hôm nay là ngày học dễ chịu nhất tuần.",
    "Có điều gì đó bất ngờ đang chờ bạn!",
    "Bạn sẽ hoàn thành bài tập nhanh hơn mọi người.",
    "Bạn sẽ là người duy nhất nhớ bài cũ 😎",
    "Thầy cô sẽ hỏi bạn một câu rất dễ.",
    "Một buổi học với nhiều nụ cười 😊",
    "Bạn sẽ được bạn cùng bàn cho kẹo 🍬",
    "Bạn sẽ có bài kiểm tra bất ngờ, nhưng làm tốt!",
    "Cẩn thận, có thể bị gọi đọc bài cũ nha!",
    "Bạn sẽ được cô khen vì giữ trật tự tốt.",
    "Bạn sẽ tham gia trò chơi trong lớp!",
    "Hôm nay bạn mang đầy năng lượng tích cực!",
    "Bạn sẽ được phân công nhiệm vụ mới.",
    "Một người bạn sẽ giúp bạn hoàn thành bài tập.",
    "Hôm nay bạn sẽ hiểu bài ngay từ lần đầu tiên!",
    "Bạn sẽ thấy một câu nói của cô cực truyền cảm hứng.",
    "Hôm nay là ngày đầy niềm vui học tập!",
    "Có thể bạn sẽ ngồi cạnh một người bạn mới.",
    "Một tiết học không ngờ lại vui đến vậy!",
    "Bạn sẽ được điểm thưởng trong lớp!",
    "Thầy cô sẽ cười vì câu trả lời dễ thương của bạn 😂",
    "Bạn sẽ giúp lớp đạt thành tích nhỏ nào đó!",
    "Bạn sẽ khám phá điều thú vị trong bài học hôm nay.",
    "Một tiết học thật nhẹ nhàng và ý nghĩa.",
    "Bạn sẽ làm ai đó mỉm cười hôm nay 😊",
    "Hôm nay bạn thật may mắn trong học tập!",
    "Một bài học khiến bạn muốn tìm hiểu thêm nữa!",
    "Bạn sẽ có khoảnh khắc đáng nhớ trong lớp học.",
    "Bạn sẽ về nhà với tâm trạng thật vui!",
  ];

  // --- Helpers ---
  function getStoredPrediction() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      // Nếu localStorage bị chặn (private mode), an toàn bỏ qua
      console.warn("LocalStorage không khả dụng:", e);
      return null;
    }
  }

  function setStoredPrediction(text) {
    try {
      localStorage.setItem(STORAGE_KEY, text);
    } catch (e) {
      console.warn("Lưu dự đoán thất bại:", e);
    }
  }

  function clearStoredPrediction() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Xóa dự đoán thất bại:", e);
    }
  }

  function formatTimestamp(date) {
    // Trả về chuỗi ngắn gọn, ví dụ: 13:45 12/10
    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const mmth = String(date.getMonth() + 1).padStart(2, "0");
    return `${hh}:${mm} ${dd}/${mmth}`;
  }

  function showResult(text, timestampStr) {
    predictionText.textContent = text;
    predictionMeta.textContent = `Kết quả lúc ${timestampStr}`;
    resultBox.hidden = false;
    resetBtn.hidden = false;
    drawBtn.hidden = true;

    // set focus vào result để đọc ARIA
    paper.focus?.();
  }

  function hideResult() {
    resultBox.hidden = true;
    resetBtn.hidden = true;
    drawBtn.hidden = false;
  }

  // --- Init: nếu đã có kết quả lưu, hiển thị ---
  const stored = getStoredPrediction();
  if (stored) {
    // stored có dạng JSON chứa { text, time }
    try {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.text) {
        showResult(parsed.text, parsed.time || "");
      } else {
        // nếu dữ liệu cũ dạng string, dùng nguyên
        showResult(stored, formatTimestamp(new Date()));
      }
    } catch (e) {
      // không phải JSON → hiển thị nguyên
      showResult(stored, formatTimestamp(new Date()));
    }
  }

  // --- Draw event ---
  drawBtn.addEventListener("click", () => {
    // pick random
    const idx = Math.floor(Math.random() * predictions.length);
    const picked = predictions[idx];

    const ts = formatTimestamp(new Date());
    // store as JSON (text + time)
    setStoredPrediction(JSON.stringify({ text: picked, time: ts }));

    // show with animation
    showResult(picked, ts);

    // add tiny confetti dots effect (CSS-free simple)
    tinyConfettiBurst();
  });

  // --- Reset event (bốc lại) ---
  resetBtn.addEventListener("click", () => {
    const ok = confirm(
      "Bạn có chắc muốn bốc lại? Kết quả hiện tại sẽ bị xóa cho thiết bị này."
    );
    if (!ok) return;
    clearStoredPrediction();
    hideResult();
  });

  // --- Keyboard accessibility: Enter on draw button ---
  drawBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      drawBtn.click();
    }
  });

  // --- Small visual confetti using DOM (temporary, lightweight) ---
  function tinyConfettiBurst() {
    // tạo vài chấm màu rơi xuống trong vùng kết quả
    const burstCount = 18;
    const colors = ["#FFD93D", "#FF6B6B", "#6BCB77", "#4D96FF", "#C77DFF"];
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = 0;
    container.style.top = 0;
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.pointerEvents = "none";
    container.style.overflow = "visible";

    // gắn vào pw-card
    const card = document.querySelector(".pw-card");
    card.style.position = "relative";
    card.appendChild(container);

    for (let i = 0; i < burstCount; i++) {
      const dot = document.createElement("div");
      const size = Math.random() * 8 + 6;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.borderRadius = "50%";
      dot.style.background = colors[Math.floor(Math.random() * colors.length)];
      dot.style.position = "absolute";
      dot.style.left = `${50 + (Math.random() * 160 - 80)}%`;
      dot.style.top = `${30 + (Math.random() * 20 - 10)}%`;
      dot.style.opacity = "0.95";
      dot.style.transform = `translate(-50%, -50%)`;
      dot.style.transition =
        "transform 800ms cubic-bezier(.2,.8,.2,1), opacity 900ms ease";
      container.appendChild(dot);

      // animate outwards and down
      setTimeout(() => {
        const dx = Math.random() * 160 - 80;
        const dy = 120 + Math.random() * 80;
        dot.style.transform = `translate(${dx}px, ${dy}px)`;
        dot.style.opacity = "0";
      }, 30 + i * 25);

      // remove after animation
      setTimeout(() => dot.remove(), 1200);
    }

    // cleanup container
    setTimeout(() => {
      container.remove();
    }, 1400);
  }
});

function time

info StyleSheetList
GamepadEvent HTMLUnknownElement
ElementInternalsasda

