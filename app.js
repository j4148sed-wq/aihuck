// ==========================================================================
// 1. HTML要素の取得
// ==========================================================================
const fumanInput = document.getElementById('fumanInput');
const chargeBtn = document.getElementById('chargeBtn');
const turbine = document.getElementById('turbine');
const lightningEffect = document.getElementById('lightning-effect');
const meigenOutput = document.getElementById('meigenOutput');
const logHistory = document.getElementById('logHistory');

// ==========================================================================
// 2. 事前入力された名言データベース
// ==========================================================================
const meigenDatabase = [
    "「理不尽は宇宙からの経験値パックだ。開封時の演出が長いだけで中身は豪華かもしれない。」",
    "「満員電車は、君の圧倒的な主人公オーラを抑え込むための強制イベントに過ぎない。」",
    "「残業という名の延長戦。スタジアムの照明（オフィスの蛍光灯）は、君というスタープレイヤーを照らすためにある。」",
    "「雨なのに傘を忘れたのではない。天が君の覇気に圧倒されて、思わず涙（雨）を流しているのだ。」",
    "「仕様変更は、神が君のプログラムに嫉妬して与えた試練。乗り越えた時、君はさらに神に近づく。」",
    "「その怒りは純度100%のエネルギーだ。今、タービンは世界のどの発電所よりも激しく唸っている！」",
    "「理不尽な怒りはすべて君の都市のコンクリートを固めるセメントになる。もっと注ぎ込め！」",
    "「理不尽は宇宙からの経験値パックだ。開封時の演出が長いだけで中身は豪華かもしれない。」",
    "「誰にも評価されない？ 太陽だって毎朝昇るたびに拍手を要求しない。君もまた恒星なのだ。」",
    "「心が折れたのではない。一度分解して、より強固な構造で再組立てするアップデート工程に入っただけだ。」",
    "「何度転んでも立ち上がるな。転がれ。その方が移動距離は稼げる。」",
    "「人生にバグが多い？ 安心しろ。神も本番環境でデバッグしている。」",
    "「定時退社は逃亡ではない。完璧なミッションコンプリートであり、プロフェッショナルの証明だ。」"
];

// ==========================================================================
// 3. 発電（変換）処理イベント
// ==========================================================================
chargeBtn.addEventListener('click', () => {
    const fumanText = fumanInput.value.trim();
    
    // 入力が空なら何も動かさない
    if (!fumanText) return;

    // ボタンを連打できないように一時的に無効化
    chargeBtn.disabled = true;

    // --- 【演出フェーズ：不満の熱量を解析】 ---
    const textLength = fumanText.length;
    
    // 1. 回転速度を決定（文字数が多いほど爆速。最速0.05秒）
    let speed = 1.0 - (textLength * 0.03); 
    if (speed < 0.05) speed = 0.05; 
    
    // 2. 電撃オーラの輝き（太さ）を決定（最高30px）
    let intensity = textLength * 1.5;
    if (intensity > 30) intensity = 30; 
    
    // 3. 演出スタイルをCSSに適用してアクティブ化
    turbine.style.setProperty('--spin-speed', `${speed}s`);
    turbine.classList.add('spinning'); 
    
    lightningEffect.style.setProperty('--lightning-intensity', `${intensity}px`);
    lightningEffect.classList.add('active-lightning');

    // モニターに変換中ステータスを表示
    meigenOutput.innerText = "⚡ 不満ガスを吸収中... タービン臨界突破... ポジティブエネルギーを生成しています ⚡";

    // 今回選ばれた名言を一時的にキープする変数
    let selectedMeigen = "";

    // データベースから事前に1つランダムに選んでおく
    const randomIndex = Math.floor(Math.random() * meigenDatabase.length);
    selectedMeigen = meigenDatabase[randomIndex];

    // --- 演出①：3.5秒後にタービンの回転と電撃が「停止」 ---
    setTimeout(() => {
        turbine.classList.remove('spinning');
        lightningEffect.classList.remove('active-lightning');
        
        // タービンが止まった瞬間の静寂を演出
        meigenOutput.innerText = "⏳ 発電完了。エネルギーを凝縮しています...";
        
        // 入力欄とボタンはここで次のために解放
        chargeBtn.disabled = false; 
        fumanInput.value = ''; 
    }, 3500);

    // --- 演出②：タービン停止の「5秒後」（合計8.5秒後）に名言出現 ＆ ログ追加 ---
    setTimeout(() => {
        // 1. メインモニターに満を持して名言を表示！
        meigenOutput.innerText = selectedMeigen;

        // 2. 同時に右側のサイドバー（ログ）へ蓄積
        const emptyMsg = logHistory.querySelector('.empty-log-msg');
        if (emptyMsg) {
            emptyMsg.remove();
        }

        const newLog = document.createElement('div');
        newLog.classList.add('log-item');
        newLog.innerText = selectedMeigen; 

        // ログエリアの一番上に挿入（最新が一番上）
        logHistory.insertBefore(newLog, logHistory.firstChild);
    }, 8500); 
});