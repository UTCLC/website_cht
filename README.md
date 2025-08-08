Hexo + Acorn<br>
Namesilo Domain + Cloudflare CDN

[簡體中文站](https://cht.utclc.top) / [繁體中文站](https://cht.cht.utclc.top)

倉庫收到 Push 後自動觸發 Github Actions 部署到 Github Pages<br>
同時觸發另一個 Action 執行 Python 執行 `traditionalize.py`<br>
使用 OpenCC 與自定義規則批次轉換所有檔案<br>
然後把轉換好後的倉庫 git push 覆寫到繁中站倉庫[UTCLC/website_cht](https://github.com/UTCLC/website_cht)<br>
繁中站倉庫收到 Push 後同樣自動觸發 Action 部署到 Pages<br>
（Action 加了限制，只有當前倉庫是 `UTCLC/utclc.github.io` 時才會傳送 push 繁中倉庫，防止套娃觸發）