const fumanInput = document.getElementById('fumanInput');
const chargeBtn = document.getElementById('chargeBtn');
const turbine = document.getElementById('turbine');
const meigenOutput = document.getElementById('meigenOutput');

// ダミーの名言（迷言）リスト（本来はここをAI化する）
const meigenList = [
    "「朝令暮改？それは上司の脳内アップデートが高速な証拠。君は常に最新の仕様書を読んでいる最先端のエンジニアだ。」",
    "「雨なのに傘を忘れたのではない。天が君の乾いた心に潤いを与えようと、直接ダイレクトアタックしているのだ。」",
    "「理不尽な怒りはすべて君の都市のコンクリートを固めるセメントになる。もっと注ぎ込め！」",
    "「理不尽は宇宙からの経験値パックだ。開封時の演出が長いだけで中身は豪華かもしれない。」",
    "「誰にも評価されない？ 太陽だって毎朝昇るたびに拍手を要求しない。君もまた恒星なのだ。」",
    "「心が折れたのではない。一度分解して、より強固な構造で再組立てするアップデート工程に入っただけだ。」",
    "「何度転んでも立ち上がるな。転がれ。その方が移動距離は稼げる。」",
    "「人生にバグが多い？ 安心しろ。神も本番環境でデバッグしている。」",
];

chargeBtn.addEventListener('click', () => {
    const text = fumanInput.value.trim();
    if (!text) return;

    // 文字数に応じて回転速度を決定（文字数が多いほど速い＝秒数が短い） 
    let speed = 1.0 - (text.length * 0.02);
    if (speed < 0.05) speed = 0.05; // 最高速度の制限

    // タービンに速度を設定して回転開始
    turbine.style.setProperty('--spin-speed', `${speed}s`);
    turbine.classList.add('spinning');

    meigenOutput.innerText = "発電中（AI解析中）......";

    // 2秒後に回転を少し落ち着かせ、名言を出力
    setTimeout(() => {
        turbine.classList.remove('spinning');
        const randomMeigen = meigenList[Math.floor(Math.random() * meigenList.length)];
        meigenOutput.innerText = randomMeigen;
        fumanInput.value = ''; // 入力欄をクリア
    }, 2500);
});