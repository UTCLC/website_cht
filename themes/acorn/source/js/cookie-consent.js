(function() {
    'use strict';

    var cookieconsent = {
        config: {},
        consent: {},
        init: function(config) {
            this.config = config;
            this.loadConsent();
            if (!this.hasConsent()) {
                this.showBanner();
            }
            this.setupPreferencesCenter();
        },
        loadConsent: function() {
            var consent = localStorage.getItem('cookieconsent');
            if (consent) {
                this.consent = JSON.parse(consent);
            } else {
                this.consent = {};
            }
        },
        saveConsent: function() {
            localStorage.setItem('cookieconsent', JSON.stringify(this.consent));
        },
        hasConsent: function() {
            return this.consent && Object.keys(this.consent).length > 0;
        },
        showBanner: function() {
            var banner = document.createElement('div');
            banner.id = 'cookieconsent-banner';
            banner.innerHTML = `
                <div class="cookieconsent-banner-content">
                    <div class="cookieconsent-header">
                        <h3>本站使用 Cookie</h3>
                    </div>
                    <div class="cookieconsent-text">
                        本站會使用 Cookie 及其他追蹤技術，以提升您的瀏覽體驗，具體用途包括：保障網站基本功能執行、最佳化網站使用體驗、衡量您對我們產品與服務的興趣程度、個性化營銷互動內容，以及向您投放更具相關性的廣告。
                    </div>
                    <div class="cookieconsent-buttons">
                        <button id="cookieconsent-accept" class="btn btn-primary">我同意</button>
                        <button id="cookieconsent-reject" class="btn btn-secondary">我拒絕</button>
                        <button id="cookieconsent-settings" class="btn btn-outline">更改我的偏好</button>
                    </div>
                </div>
            `;
            banner.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                left: auto;
                background: white;
                border-radius: 12px;
                padding: 24px;
                z-index: 10000;
                box-shadow: 0 4px 24px rgba(0,0,0,0.15);
                border: 1px solid #e5e7eb;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                max-width: 600px;
            `;
            
            // Add responsive styles for small screens
            var responsiveStyle = document.createElement('style');
            responsiveStyle.textContent = `
                @media (max-width: 640px) {
                    #cookieconsent-banner {
                        left: 20px !important;
                        right: 20px !important;
                    }
                }
            `;
            document.head.appendChild(responsiveStyle);
            var style = document.createElement('style');
            style.textContent = `
                .cookieconsent-banner-content {
                    text-align: center;
                }
                .cookieconsent-header h3 {
                    margin: 0 0 16px 0;
                    font-size: 18px;
                    font-weight: 600;
                    color: #1f2937;
                }
                .cookieconsent-text {
                    margin-bottom: 20px;
                    color: #4b5563;
                    line-height: 1.6;
                    font-size: 14px;
                }
                .cookieconsent-buttons {
                    display: flex;
                    gap: 12px;
                    justify-content: flex-end;
                    flex-wrap: wrap;
                }
                .btn {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    transition: all 0.2s ease;
                    min-width: 100px;
                }
                .btn-primary {
                    background: #4f46e5;
                    color: white;
                }
                .btn-primary:hover {
                    background: #4338ca;
                    transform: translateY(-1px);
                }
                .btn-secondary {
                    background: #6b7280;
                    color: white;
                }
                .btn-secondary:hover {
                    background: #4b5563;
                    transform: translateY(-1px);
                }
                .btn-outline {
                    background: transparent;
                    color: #4f46e5;
                    border: 2px solid #4f46e5;
                }
                .btn-outline:hover {
                    background: #4f46e5;
                    color: white;
                    transform: translateY(-1px);
                }
                @media (max-width: 480px) {
                    .cookieconsent-buttons {
                        justify-content: flex-end;
                    }
                    .btn {
                        width: 100%;
                        max-width: 200px;
                    }
                }
            `;
            document.head.appendChild(style);
            document.body.appendChild(banner);

            document.getElementById('cookieconsent-accept').onclick = () => {
                this.consent = { 'strictly-necessary': true, 'functionality': true, 'analytics': true, 'targeting': true };
                this.saveConsent();
                banner.remove();
                style.remove();
                responsiveStyle.remove();
            };
            document.getElementById('cookieconsent-reject').onclick = () => {
                this.consent = { 'strictly-necessary': true };
                this.saveConsent();
                banner.remove();
                style.remove();
                responsiveStyle.remove();
            };
            document.getElementById('cookieconsent-settings').onclick = () => {
                this.showPreferencesCenter();
                // Don't remove banner here - keep it visible
            };
        },
        setupPreferencesCenter: function() {
            var openBtn = document.getElementById('open_preferences_center');
            if (openBtn) {
                openBtn.onclick = (e) => {
                    e.preventDefault();
                    this.showPreferencesCenter();
                };
            }
        },
        showPreferencesCenter: function() {
            var modal = document.createElement('div');
            modal.id = 'cookieconsent-modal';
            modal.innerHTML = `
                <div class="cookieconsent-modal-overlay">
                    <div class="cookieconsent-modal-content">
                        <div class="cookieconsent-modal-header">
                            <h2> Cookie 偏好設定</h2>
                            <button class="cookieconsent-close-btn" id="cookieconsent-close-header">&times;</button>
                        </div>
                        <div class="cookieconsent-sections">
                            <div class="cookieconsent-section">
                                <div class="section-header">
                                    <h3>必要型 Cookie</h3>
                                    <span class="status-badge required">始終啟用</span>
                                </div>
                                <p>這些 Cookie 對於通過我們的網站提供服務並使您能夠使用我們網站的某些功能至關重要。</p>
                                <p>如果沒有這些 Cookie ，我們無法在網站上為您提供某些服務。</p>
                            </div>
                            <div class="cookieconsent-section">
                                <div class="section-header">
                                    <h3>功能 Cookie</h3>
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="consent-functionality" ${this.consent['functionality'] ? 'checked' : ''}>
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                <p>這些 Cookie 用於為您提供更個性化的網站體驗，並記住您在使用網站時做出的選擇。</p>
                                <p>例如，我們可以使用功能性 Cookie 記住您的語言偏好或記住您的登入詳情。</p>
                            </div>
                            <div class="cookieconsent-section">
                                <div class="section-header">
                                    <h3>跟蹤 Cookie</h3>
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="consent-analytics" ${this.consent['analytics'] ? 'checked' : ''}>
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                <p>這些 Cookie 用於收集資訊以分析我們網站的流量以及訪問者如何使用我們的網站。</p>
                                <p>例如，這些 Cookie 可能會跟蹤您在網站上停留的時間或您訪問的頁面，這有助於我們瞭解如何為您改善網站。</p>
                                <p>通過這些跟蹤和效能 Cookie 收集的資訊不會識別任何個人訪問者。</p>
                            </div>
                            <div class="cookieconsent-section">
                                <div class="section-header">
                                    <h3>定位和廣告 Cookie</h3>
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="consent-targeting" ${this.consent['targeting'] ? 'checked' : ''}>
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                <p>這些 Cookie 用於根據您的瀏覽習慣顯示可能對您感興趣的廣告。</p>
                                <p>這些 Cookie ，由我們的內容和/或廣告提供商提供，可能將他們從我們的網站收集的資訊與其他他們獨立收集的有關您的網路瀏覽器在他們的網站網路中的活動的資訊相結合。</p>
                                <p>如果您選擇刪除或停用這些定向或廣告 Cookie ，您仍會看到廣告，但它們可能與您不相關。</p>
                            </div>
                        </div>
                        <div class="cookieconsent-buttons">
                            <button id="cookieconsent-save" class="btn btn-primary">儲存我的偏好</button>
                            <button id="cookieconsent-cancel" class="btn btn-outline">取消</button>
                        </div>
                        <div class="cookieconsent-privacy">
                            <h3>您的隱私</h3>
                            <p>您的隱私對我們很重要</p>
                            <p> Cookie 是非常小的文本檔案，當您訪問網站時儲存在您的計算機上。我們使用 Cookie 來實現各種目的，並增強您在我們網站上的線上體驗（例如，記住您的賬戶登入詳情）。</p>
                            <p>您可以更改您的偏好，並拒絕在瀏覽我們的網站時將某些型別的 Cookie 儲存在您的計算機上。您還可以刪除已儲存在計算機上的任何 Cookie ，但請記住，刪除 Cookie 可能會阻止您使用我們網站的某些部分。</p>
                            <p>要了解更多，請訪問我們的<a href="/privacy-policy" target="_blank">隱私政策</a>。</p>
                        </div>
                    </div>
                </div>
            `;
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.6);
                backdrop-filter: blur(4px);
                z-index: 10001;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            `;
            var modalStyle = document.createElement('style');
            modalStyle.textContent = `
                .cookieconsent-modal-content {
                    background: #fff;
                    border-radius: 16px;
                    padding: 0;
                    max-width: 700px;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    animation: modalSlideIn 0.3s ease-out;
                }
                @keyframes modalSlideIn {
                    from { transform: translateY(-50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .cookieconsent-modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 24px 24px 16px;
                    border-bottom: 1px solid #e5e7eb;
                    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                    border-radius: 16px 16px 0 0;
                }
                .cookieconsent-modal-header h2 {
                    margin: 0;
                    font-size: 24px;
                    font-weight: 600;
                    color: #1f2937;
                }
                .cookieconsent-close-btn {
                    background: none;
                    border: none;
                    font-size: 28px;
                    cursor: pointer;
                    color: #6b7280;
                    padding: 0;
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: all 0.2s ease;
                }
                .cookieconsent-close-btn:hover {
                    background: #f3f4f6;
                    color: #374151;
                }
                .cookieconsent-sections {
                    padding: 24px;
                }
                .cookieconsent-section {
                    margin-bottom: 24px;
                    padding: 20px;
                    background: #f8fafc;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    transition: all 0.2s ease;
                }
                .cookieconsent-section:hover {
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 12px;
                }
                .section-header h3 {
                    margin: 0;
                    font-size: 18px;
                    font-weight: 600;
                    color: #1f2937;
                }
                .status-badge {
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 500;
                    text-transform: uppercase;
                }
                .status-badge.required {
                    background: #fef3c7;
                    color: #d97706;
                }
                .toggle-switch {
                    position: relative;
                    display: inline-block;
                    width: 50px;
                    height: 24px;
                }
                .toggle-switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }
                .toggle-slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #cbd5e1;
                    transition: 0.3s;
                    border-radius: 24px;
                }
                .toggle-slider:before {
                    position: absolute;
                    content: "";
                    height: 18px;
                    width: 18px;
                    left: 3px;
                    bottom: 3px;
                    background-color: white;
                    transition: 0.3s;
                    border-radius: 50%;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
                input:checked + .toggle-slider {
                    background-color: #4f46e5;
                }
                input:checked + .toggle-slider:before {
                    transform: translateX(26px);
                }
                .cookieconsent-section p {
                    margin: 8px 0;
                    color: #4b5563;
                    line-height: 1.5;
                    font-size: 14px;
                }
                .cookieconsent-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 12px;
                    padding: 0 24px 24px;
                }
                .cookieconsent-privacy {
                    padding: 24px;
                    background: #f8fafc;
                    border-top: 1px solid #e5e7eb;
                    border-radius: 0 0 16px 16px;
                }
                .cookieconsent-privacy h3 {
                    margin: 0 0 16px 0;
                    font-size: 16px;
                    font-weight: 600;
                    color: #1f2937;
                }
                .cookieconsent-privacy p {
                    margin: 8px 0;
                    color: #6b7280;
                    line-height: 1.5;
                    font-size: 14px;
                }
                @media (max-width: 768px) {
                    .cookieconsent-modal-content {
                        margin: 20px;
                        max-width: none;
                        max-height: none;
                    }
                    .cookieconsent-modal-header {
                        padding: 20px;
                    }
                    .cookieconsent-sections {
                        padding: 20px;
                    }
                    .cookieconsent-buttons {
                        padding: 0 20px 20px;
                    }
                    .cookieconsent-privacy {
                        padding: 20px;
                    }
                }
            `;
            document.head.appendChild(modalStyle);
            document.body.appendChild(modal);

            document.getElementById('cookieconsent-save').onclick = () => {
                this.consent['strictly-necessary'] = true;
                this.consent['functionality'] = document.getElementById('consent-functionality').checked;
                this.consent['analytics'] = document.getElementById('consent-analytics').checked;
                this.consent['targeting'] = document.getElementById('consent-targeting').checked;
                this.saveConsent();
                modal.remove();
                modalStyle.remove();
            };
            document.getElementById('cookieconsent-cancel').onclick = () => {
                // Don't save changes, just close the modal
                modal.remove();
                modalStyle.remove();
            };
            document.getElementById('cookieconsent-close-header').onclick = () => {
                modal.remove();
                modalStyle.remove();
            };
            modal.querySelector('.cookieconsent-modal-overlay').onclick = (e) => {
                if (e.target === modal.querySelector('.cookieconsent-modal-overlay')) {
                    modal.remove();
                    modalStyle.remove();
                }
            };
        },
        run: function(config) {
            this.init(config);
        }
    };

    window.cookieconsent = cookieconsent;
})();