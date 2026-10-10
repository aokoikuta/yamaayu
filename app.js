// 値A：生き物の固有名詞
const wordsA = [
  "山岡さん", "海原雄山", "栗田さん", "ナポレオン", "ゴジラ",
  "クレオパトラ", "ムツゴロウさん", "ダーウィン", "ハチ公", "織田信長"
];

// 値B：一般名詞
const wordsB = [
  "鮎", "豆腐", "寿司", "確定申告", "住宅ローン",
  "有給休暇", "量子力学", "盆踊り", "自撮り棒", "二段ベッド"
];

// 値C：悪口7個 + 誉め言葉3個
const wordsC = [
  "カス", "紛い物", "三日坊主", "生乾きのタオル", "期限切れのクーポン",
  "寝ぐせ", "説明書を読まないタイプ", "至高の逸品", "人類の希望", "町内会の誇り"
];

// 当たりの組み合わせ
const HIT_A = "山岡さん";
const HIT_B = "鮎";
const HIT_C = "カス";

// URLの末尾に ?test が付いていたら、テストモード（必ず当たり）にする
const isTestMode = new URLSearchParams(location.search).has("test");

const message = document.getElementById("message");
const button = document.getElementById("button");
const streak = document.getElementById("streak");

// ハズレが連続した回数
let missCount = 0;

// 配列の中からランダムに1つ選ぶ
function pickRandom(words) {
  const index = Math.floor(Math.random() * words.length);
  return words[index];
}

button.addEventListener("click", () => {
  let a, b, c;

  // 10回に1回（10%）は当たりにする。テストモードなら必ず当たり
  const shouldHit = isTestMode || Math.random() < 0.1;

  if (shouldHit) {
    a = HIT_A;
    b = HIT_B;
    c = HIT_C;
  } else {
    // ハズレのときは、偶然当たりの組み合わせになったら選び直す
    do {
      a = pickRandom(wordsA);
      b = pickRandom(wordsB);
      c = pickRandom(wordsC);
    } while (a === HIT_A && b === HIT_B && c === HIT_C);
  }

  message.textContent = `${a}の${b}は${c}や。`;

  // 当たりなら背景画像を表示、ハズレなら消す
  const isHit = a === HIT_A && b === HIT_B && c === HIT_C;
  document.body.classList.toggle("hit", isHit);

  // ハズレなら連続回数を1増やし、当たりなら0に戻す
  missCount = isHit ? 0 : missCount + 1;
  streak.textContent = `連続回避記録${missCount}回`;

  // 0回なら青、3回以上なら赤・太字にする
  streak.classList.toggle("zero", missCount === 0);
  streak.classList.toggle("danger", missCount >= 3);
});
