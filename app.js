// ==========================================================================
// 1. HTML要素の取得 (DOM Elements)
// ==========================================================================
const fumanInput = document.getElementById('fumanInput');
const chargeBtn = document.getElementById('chargeBtn');
const turbine = document.getElementById('turbine');
const lightningEffect = document.getElementById('lightning-effect');
const meigenOutput = document.getElementById('meigenOutput');
const logHistory = document.getElementById('logHistory');

// ==========================================================================
// 2. 事前入力された名言データ（データベース）
// ==========================================================================
// 💡 ここに好きなセリフ（名言・迷言）を自由に追加・編集できます！
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
// 3. 発電（ランダム変換）処理イベント
// ==========================================================================
chargeBtn.addEventListener('click', () => {
    const fumanText = fumanInput.value.trim();
    
    // 入力が空なら何も動かさない
    if (!fumanText) return;

    // ボタンを連打できないように一時的に無効化
    chargeBtn.disabled = true;

    // --- 【演出フェーズ：不満の熱量を解析】 ---
    const textLength = fumanText.length;
    
    // 1. 回転速度を決定（文字数が多いほど爆速になる。最速0.05秒）
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
    meigenOutput.innerText = "⚡ 不満ガスを吸収中... タービン臨界突破... ポジティブエネルギーに変換しています ⚡";

    // --- 【ランダム選択 ＆ ログ追加フェーズ】 ---
    // 演出をじっくり見せるために、1.5秒だけ待ってから名言を表示する
    setTimeout(() => {
        
        // データベースからランダムに1個選ぶ
        const randomIndex = Math.floor(Math.random() * meigenDatabase.length);
        const selectedMeigen = meigenDatabase[randomIndex];

        // 1. メインモニターに名言を表示
        meigenOutput.innerText = selectedMeigen;

        // 2. 右側のサイドバー（ログ）へ蓄積
        // 初回のみ「まだ発電された名言はありません」という初期メッセージを消去
        const emptyMsg = logHistory.querySelector('.empty-log-msg');
        if (emptyMsg) {
            emptyMsg.remove();
        }

        // ログ用の新しい枠（div）を作る
        const newLog = document.createElement('div');
        newLog.classList.add('log-item');
        newLog.innerText = selectedMeigen; 

        // ログエリアの一番上に挿入（最新の名言が一番上に見えるようにする）
        logHistory.insertBefore(newLog, logHistory.firstChild);

    }, 1500);

    // --- 【冷却フェーズ：演出を通常に戻す】 ---
    // 3.5秒後にすべての演出を落ち着かせ、次の入力に備える
    setTimeout(() => {
        turbine.classList.remove('spinning');
        lightningEffect.classList.remove('active-lightning');
        chargeBtn.disabled = false; // ボタンを再度押せるようにする
        fumanInput.value = ''; // 入力欄を綺麗にクリア
    }, 3500);
});