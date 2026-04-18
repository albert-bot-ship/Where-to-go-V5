// 地點對應表 (保持原本)
const placeMap = {
  "五權立體停車場": "https://maps.app.goo.gl/jsPuNCQdJV8wyrPb8",
  "逢甲常停的地方": "https://maps.app.goo.gl/fc1zstKVmqHa2k9P8",
  "大慶 30停車場": "https://maps.app.goo.gl/VL1FN7tTRX118fqm8",
  "大遠百停車場":"https://maps.app.goo.gl/4PWzGXKi4DA3868o7",
  "上班停車": "https://maps.app.goo.gl/2zAGdxmDEULD6Ziy7",
  "逢甲租屋處": "https://maps.app.goo.gl/zCEvqw6UBaPNEmdy7",
  "旱溪夜市停車":"https://maps.app.goo.gl/mCbovzJzY62h9aRy7",
  "平祿壽司-松竹店":"https://maps.app.goo.gl/QUKnW17M1kXp211G6",
  "老婆上班的地方":"https://maps.app.goo.gl/81WdBkR1TA23PGRs5",
  "中油-五權":"https://maps.app.goo.gl/4ZYYLggppoeYTZt6A",
  "中油-青海":"https://maps.app.goo.gl/JLh6gGwyE5z1W44u7",
  "阿蘭碗粿":"https://maps.app.goo.gl/kEim8aHX6ZdYj4zR7",
  "豐原太平洋百貨":"https://maps.app.goo.gl/PgCybHoKBzEFeZzo6",
  "公司":"https://maps.app.goo.gl/1aULruchPnF9ka6cA",
  "石頭 鹽酥雞":"https://maps.app.goo.gl/XWqoc2FVwhxQg6gM7",
  "旱溪夜市":"https://maps.app.goo.gl/XWqoc2FVwhxQg6gM7",
  "家樂福 豐原":"https://maps.app.goo.gl/BEaqNKyjCzyEFr5C8",
  "豐原大車河站3":"https://maps.app.goo.gl/Z1n5XBa3WkboqopZA",
};

const input = document.getElementById("location");
const suggestions = document.getElementById("suggestions");

let currentIndex = -1; // 追蹤鍵盤選擇

// 更新建議列表
function showSuggestions(val) {
  suggestions.innerHTML = "";
  currentIndex = -1;
  if (!val) return;

  const matches = Object.keys(placeMap).filter(place => place.toLowerCase().includes(val.toLowerCase()));
  matches.forEach(place => {
    const li = document.createElement("li");
    li.textContent = place;
    li.addEventListener("click", () => {
      window.open(placeMap[place], "_blank");
    });
    suggestions.appendChild(li);
  });
}

// 輸入文字時更新建議
input.addEventListener("input", function() {
  showSuggestions(this.value.trim());
});

// 鍵盤操作
input.addEventListener("keydown", function(e) {
  const items = suggestions.querySelectorAll("li");

  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (items.length > 0) {
      currentIndex = (currentIndex + 1) % items.length;
      updateActive(items);
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (items.length > 0) {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateActive(items);
    }
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (currentIndex >= 0 && items[currentIndex]) {
      const place = items[currentIndex].textContent;
      window.open(placeMap[place], "_blank");
    } else {
      const val = this.value.trim();
      if (placeMap[val]) {
        window.open(placeMap[val], "_blank");
      }
    }
  }
});

// 更新高亮顯示
function updateActive(items) {
  items.forEach((item, i) => {
    item.classList.toggle("active", i === currentIndex);
  });
}

// 側欄分類 (維持原本)
const categoryList = document.getElementById("categoryList");
const featureCards = document.querySelectorAll(".feature-card");

categoryList.addEventListener("click", e => {
  if(e.target.tagName === "LI") {
    document.querySelectorAll("#categoryList li").forEach(li => li.classList.remove("active"));
    e.target.classList.add("active");

    const category = e.target.getAttribute("data-category");
    featureCards.forEach(card => {
      const categories = card.getAttribute("data-category").split(",");
      card.style.display = categories.includes(category) || category === "全部" ? "block" : "none";
    });
  }
});

// 字卡點擊跳轉
featureCards.forEach(card => {
  card.addEventListener("click", () => {
    const placeName = card.getAttribute("data-name");
    if (placeMap[placeName]) {
      window.open(placeMap[placeName], "_blank");
    }
  });
});

let suggestionItems = [];
let activeIndex = -1;

input.addEventListener("input", function() {
  const val = this.value.trim().toLowerCase();
  suggestions.innerHTML = "";
  activeIndex = -1;

  if (!val) return;

  const matches = Object.keys(placeMap).filter(place => place.toLowerCase().includes(val));
  matches.forEach(place => {
    const li = document.createElement("li");
    li.textContent = place;
    li.addEventListener("click", () => {
      window.open(placeMap[place], "_blank");
    });
    suggestions.appendChild(li);
  });

  suggestionItems = Array.from(suggestions.querySelectorAll("li"));
});

input.addEventListener("keydown", function(e) {
  if (suggestionItems.length === 0) return;

  if (e.key === "ArrowDown") {
    activeIndex = (activeIndex + 1) % suggestionItems.length;
    updateActive();
    e.preventDefault();
  } else if (e.key === "ArrowUp") {
    activeIndex = (activeIndex - 1 + suggestionItems.length) % suggestionItems.length;
    updateActive();
    e.preventDefault();
  } else if (e.key === "Enter" && activeIndex >= 0) {
    suggestionItems[activeIndex].click();
  }
});

function updateActive() {
  suggestionItems.forEach((item, idx) => {
    item.classList.toggle("active", idx === activeIndex);
  });

  // 自動滾動讓 active 項目可見
  if (activeIndex >= 0) {
    suggestionItems[activeIndex].scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }
}

