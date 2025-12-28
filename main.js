"use strict";

fetch("/api/anime")
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("list");
    data.forEach(anime => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="detail.html?id=${anime.id}">
                        ${anime.title}
                      </a>`;
      list.appendChild(li);
    });
  });

  "use strict";

// 一覧表示
function loadList() {
  fetch("/api/anime")
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("list");
      list.innerHTML = "";

      data.forEach(anime => {
        const li = document.createElement("li");
        li.innerHTML = `
          <a href="detail.html?id=${anime.id}">${anime.title}</a>
          <button data-id="${anime.id}">削除</button>
        `;
        list.appendChild(li);
      });

      // 削除ボタン（DELETE）
      document.querySelectorAll("button[data-id]").forEach(btn => {
        btn.onclick = () => {
          fetch(`/api/anime/${btn.dataset.id}`, {
              method: "DELETE"
            })
            .then(() => {
                alert("削除しました");
                loadList(); // 一覧を再取得
            });

        };
      });
    });
}

// 追加（POST）
document.getElementById("addBtn").onclick = () => {
  const title = document.getElementById("title").value;
  const desc = document.getElementById("desc").value;

  fetch("/api/anime", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description: desc })
  }).then(() => {
    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";
    loadList();
  });
};

loadList();
