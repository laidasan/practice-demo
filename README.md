# Practice-demo

Hello  Nick, Ocean兩位好：

首先感謝你們給予肯定，我很高興有這個機會可以在將來與你們還有團隊一起共事!

也很感謝你們願意協助我在就職前這段時間能稍微先熟悉工作相關技能，文件的部分我陸續有在閱讀，並且同步進行作業的部分，然後以下是我針對這個作業做的簡單規格理解與規劃，如果在規劃部分或是code有需要改進的地方可以隨時跟我說！

以下是我目前進度的demo ─
> [demo連結](http://localhost:8080/?#/login) 
> (最新更新時間 2021/12/01) 


</br>


## 作業：
[作業網站架構](https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=%E9%9D%A2%E8%A9%A6%E4%BD%9C%E6%A5%AD.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1-UolVAEu0NkuY5UQhH03VpKNjEhtD5Qe%26export%3Ddownload)



**作業內容：**
1. 請先針對規格需求，列出自己每個階段要完成的功能項目，並列在 github project todolist。
2. 每完成一個功能項目，請發出 PR 給 Nick 和阿海。
3. 完成規格文件上提到的條件，可正常操作。

**期望能從中間學到**
1. 資料結構設計。
2. 共用元件設計。
3. Vue 的特性。
4. VueRouter, Vuex 的掌握。



</br>

## Todolist
依照目前網站架構做的功能項目規劃(目前條列項目可能視實際製作調整、修改)
- [x] A. 前置作業(環境架設、Bootstrap 引入)
- [x] B. 串接 API 登入頁實作
- [X] C. 側邊 Navbar 製作與巢狀路由管理
- [ ] D. 帳號列表頁
  - [ ] 1. 搜尋帳號功能
  - [ ] 2. 項目編輯(修改、刪除)
  - [x] 3. 分頁顯示
  - [X] 4. 讀取效果
- [ ] E. 


</br>

## 規格需求詳細說明
### A. 前置作業
1. 環境架設：Vue CLI - Vue3 / ESLint (standard) / Router / Vuex / CSS Pre-processors (SCSS)
2. 樣式設定：Bootstrap 引入
3. 自定義 Bootstrap 變數 (路徑：src>assets>helpers>_variables.scss)
4. Axios 插件安裝

> **使用**
> 1. Vue CLI
> 2. Bootstrap
> 3. Axios

:::warning
※備註：我依目前的架構畫面看起來似乎都是bootstrap的樣式，如有需要手刻可以再請我調整
:::


---

### B. 介接 API 登入頁實作
1. 串接API
2. 登入畫面有：帳號/密碼 input 輸入
3. 登入後切換頁面顯示 success response 之資訊

> **使用**
> 1. Axios 串接 API
> 2. Login 後 VueRouter 跳接切換到 Account 列表頁面

:::warning
※備註：似乎沒有看到文件內 API 提供，所以我是先以之前自己申請的作為練習，目前帳號部分只接受一隻做實體登入，所以登入請麻煩幫我使用以下帳密先做測試：
>**email**： acc101130@gm.ntcu.edu.tw
>**password** :  test123456
:::
---

### C. 側邊 Navbar 製作與巢狀路由管理
1. 側邊 Navbar 製作
2. 路由管理
3. 登出功能設定

> **使用**
> 1. Component
> 2. Vue Router 的 index.js 管理路徑
---

### D. 帳號列表頁
1. 帳號搜尋功能
2. 帳號列表
3. 帳號的編輯 Modal
4. 帳號的刪除 Modal
5. 分頁功能
6. 讀取效果 (Loading Overlay)

> **使用**
> 1. Axios 串接 API
> 2. [vue3-loading-overlay Component](https://www.npmjs.com/package/vue3-loading-overlay) (全域註冊)


:::warning
※備註：似乎沒有看到文件內 API 提供，所以我是先以之前自己申請的作為練習，目前帳號部分只接受一隻，所以登入請麻煩幫我使用以下帳密先做測試：
>**email**： acc101130@gm.ntcu.edu.tw
>**password** :  test123456
:::
---
