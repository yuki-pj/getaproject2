// アプリケーション状態
const appState = {
    currentQuestionIndex: 0,
    answers: []
};

// 質問データ（動的質問対応）
const questions = [
    {
        id: 1,
        question: "下駄を使う主な目的を教えてください",
        options: [
            { text: "初めて下駄を試してみたい", value: "beginner", category: "beginner" },
            { text: "運動やトレーニングに活用したい", value: "athlete", category: "athlete" },
            { text: "姿勢や歩き方を改善したい", value: "posture", category: "posture" },
            { text: "日常生活で健康習慣として取り入れたい", value: "daily_health", category: "daily" }
        ]
    },
    {
        id: 2,
        question: "特に改善したいことや目的は何ですか？",
        dynamicOptions: {
            beginner: [
                { text: "失敗しない入門モデルが欲しい", value: "beginner_safe", subCategory: "beginner_safe" },
                { text: "安心の安定感。スリッパ感覚で始める屋内モデル", value: "indoor_beginner", subCategory: "indoor_beginner" },
                { text: "外でも安心。履きやすい屋外モデル", value: "outdoor_beginner", subCategory: "outdoor_beginner" }
            ],
            athlete: [
                { text: "体幹をしっかり鍛えたい", value: "core", subCategory: "core" },
                { text: "バランス感覚を高めたい", value: "balance", subCategory: "balance" },
                { text: "身体の軸を整えたい", value: "axis", subCategory: "axis" }
            ],
            posture: [
                { text: "姿勢を整えたい", value: "fix_posture", subCategory: "fix_posture" },
                { text: "歩き方を見直したい", value: "walking", subCategory: "walking" },
                { text: "足元から整えたい", value: "foot_care", subCategory: "foot_care" }
            ],
            daily: [
                { text: "毎日の習慣に取り入れたい", value: "routine", subCategory: "routine" },
                { text: "室内で使いたい", value: "indoor", subCategory: "indoor" },
                { text: "外出・散歩で使いたい", value: "outdoor", subCategory: "outdoor" },
                { text: "家族みんなで使いたい", value: "family", subCategory: "family" }
            ]
        }
    },
    {
        id: 3,
        question: "下駄に求めるスタイルは？",
        options: [
            { text: "安定感重視（無理なく始めたい）", value: "stability", style: "stability" },
            { text: "バランス重視（日常でも使いやすい）", value: "balanced", style: "balanced" },
            { text: "本格派（より高い効果を求めたい）", value: "advanced", style: "advanced" }
        ]
    },
    {
        id: 4,
        question: "ご予算はどのくらいですか？",
        options: [
            { text: "お手頃に始めたい（〜8,000円）", value: "budget_low", budget: "low" },
            { text: "しっかり選びたい（8,000〜15,000円）", value: "budget_mid", budget: "mid" },
            { text: "最高の一足を求めたい（15,000円〜）", value: "budget_high", budget: "high" }
        ]
    }
];

// 商品データベース
const productDatabase = [
    {
        name: "LABO ONE（ラボワン）",
        price: 4400,
        priceDisplay: "4,400円",
        budget: "low",
        style: "stability",
        purposes: ["beginner", "daily"],
        subPurposes: ["beginner_safe", "indoor_beginner", "routine", "indoor", "family"],
        url: "https://getalabo-store.com/items/6406115edb33f608903a56e6",
        shortDesc: "手軽に始められるエントリーモデル"
    },
    {
        name: "LABO ONE α（ラボワン アルファ）",
        price: 6600,
        priceDisplay: "6,600円",
        budget: "low",
        style: "balanced",
        purposes: ["beginner", "athlete", "daily"],
        subPurposes: ["beginner_safe", "outdoor_beginner", "balance", "routine", "outdoor", "family"],
        url: "https://getalabo-store.com/items/6439da094d1d1d0029c09e1d",
        shortDesc: "Vibramソール標準装備の万能モデル"
    },
    {
        name: "LABO ONE 京漆染（ラボワン）",
        price: 5500,
        priceDisplay: "5,500円",
        budget: "low",
        style: "stability",
        purposes: ["beginner", "daily"],
        subPurposes: ["beginner_safe", "indoor_beginner", "routine"],
        url: "https://getalabo-store.com/items/64065e6939da5f54a61ae9cd",
        shortDesc: "京都の伝統染色を施した美しいモデル"
    },
    {
        name: "TYPE.H（タイプ ハイ）",
        price: 5500,
        priceDisplay: "5,500円",
        budget: "low",
        style: "advanced",
        purposes: ["athlete", "posture"],
        subPurposes: ["core", "axis", "fix_posture"],
        url: "https://getalabo-store.com/items/65f06d29632ad6172386514a",
        shortDesc: "高い歯でより効果的なトレーニングを"
    },
    {
        name: "ikkyu（一休）",
        price: 8800,
        priceDisplay: "8,800円",
        budget: "mid",
        style: "balanced",
        purposes: ["beginner", "posture", "daily"],
        subPurposes: ["beginner_safe", "fix_posture", "walking", "routine", "outdoor", "family"],
        url: "https://getalabo-store.com/items/64107464ff39a100362524cd",
        shortDesc: "バランスの取れた中級モデル"
    },
    {
        name: "PREMIUM CARE（プレミアムケア）",
        price: 13200,
        priceDisplay: "13,200円〜",
        budget: "mid",
        style: "stability",
        purposes: ["beginner", "posture", "daily"],
        subPurposes: ["beginner_safe", "fix_posture", "foot_care", "routine", "indoor"],
        url: "https://getalabo-store.com/items/6405feb439da5f57a71aea8c",
        shortDesc: "足元のケアに特化したプレミアムモデル"
    },
    {
        name: "Smart walk DUAL（デュアル）",
        price: 13750,
        priceDisplay: "13,750円",
        budget: "mid",
        style: "stability",
        purposes: ["beginner", "posture", "daily"],
        subPurposes: ["beginner_safe", "indoor_beginner", "foot_care", "indoor"],
        url: "https://getalabo-store.com/items/65bcaf998ea9bd2aa32aff58",
        shortDesc: "二本歯で安定感抜群の安心モデル"
    },
    {
        name: "fusion（フュージョン）",
        price: 14850,
        priceDisplay: "14,850円〜",
        budget: "mid",
        style: "balanced",
        purposes: ["athlete", "posture", "daily"],
        subPurposes: ["balance", "axis", "walking", "routine", "outdoor"],
        url: "https://getalabo-store.com/items/64b71aa36270d0002e182283",
        shortDesc: "運動と日常使いを融合したモデル"
    },
    {
        name: "MUSASHI（ムサシ）",
        price: 14300,
        priceDisplay: "14,300円",
        budget: "mid",
        style: "advanced",
        purposes: ["athlete", "posture"],
        subPurposes: ["core", "axis", "fix_posture"],
        url: "https://getalabo-store.com/items/6406064297c24566dbe322c8",
        shortDesc: "体幹と軸を鍛える本格トレーニングモデル"
    },
    {
        name: "Walk（ウォーク）",
        price: 14850,
        priceDisplay: "14,850円",
        budget: "mid",
        style: "balanced",
        purposes: ["posture", "daily"],
        subPurposes: ["walking", "routine", "fix_posture", "outdoor"],
        url: "https://getalabo-store.com/items/64060f9f97c24566dbe32358",
        shortDesc: "正しい歩き方を身につける歩行特化モデル"
    },
    {
        name: "l'Arc（ラルク）",
        price: 16500,
        priceDisplay: "16,500円",
        budget: "high",
        style: "balanced",
        purposes: ["athlete", "posture"],
        subPurposes: ["balance", "walking", "axis"],
        url: "https://getalabo-store.com/items/66939f35fbf9f7179f5ed73b",
        shortDesc: "美しいアーチ形状の上級モデル"
    },
    {
        name: "RYUSAI",
        price: 15000,
        priceDisplay: "15,000円",
        budget: "high",
        style: "advanced",
        purposes: ["athlete"],
        subPurposes: ["core", "axis", "balance"],
        url: "https://getalabo-store.com/items/6406629dd77a6f6143b2876d",
        shortDesc: "競技者向けの高性能モデル"
    },
    {
        name: "EDGE（エッジ）",
        price: 17050,
        priceDisplay: "17,050円",
        budget: "high",
        style: "advanced",
        purposes: ["athlete"],
        subPurposes: ["core", "balance", "axis"],
        url: "https://getalabo-store.com/items/6456601539cb4e0031a43b8e",
        shortDesc: "エッジの効いた上級トレーニングモデル"
    },
    {
        name: "BENKEI（ベンケイ）",
        price: 19000,
        priceDisplay: "19,000円",
        budget: "high",
        style: "advanced",
        purposes: ["athlete"],
        subPurposes: ["core", "axis"],
        url: "https://getalabo-store.com/items/640737a6c42deb5de5ac51d8",
        shortDesc: "歯の高さ17cmの最上級トレーニングモデル"
    },
    {
        name: "SOUND（サウンド）",
        price: 19800,
        priceDisplay: "19,800円",
        budget: "high",
        style: "advanced",
        purposes: ["athlete", "posture"],
        subPurposes: ["core", "axis", "fix_posture"],
        url: "https://getalabo-store.com/items/6405e4587d65da60cdabbc47",
        shortDesc: "音で正しい歩行をガイドする最高峰モデル"
    }
];

// カテゴリページデータ（GETA LABO公式サイト）
const categoryPages = [
    // はじめてのGETA LABO
    {
        id: 1,
        name: "失敗しない入門モデル",
        url: "https://getalabo-store.com/?category_id=652b8bdbb90fcc00343b5b8a",
        matchConditions: { category: "beginner", subCategory: "beginner_safe" }
    },
    {
        id: 2,
        name: "安心の安定感 - スリッパ感覚で始める屋内モデル",
        url: "https://getalabo-store.com/?category_id=640a4d43a629c471e66dbcec",
        matchConditions: { category: "beginner", subCategory: "indoor_beginner" }
    },
    {
        id: 3,
        name: "外でも安心 - 履きやすい屋外モデル",
        url: "https://getalabo-store.com/?category_id=6417878b6d097b277311c906",
        matchConditions: { category: "beginner", subCategory: "outdoor_beginner" }
    },
    // アスリート・運動
    {
        id: 5,
        name: "体幹をしっかり鍛えたい",
        url: "https://getalabo-store.com/?category_id=695a206d82808c5506f25aca",
        matchConditions: { category: "athlete", subCategory: "core" }
    },
    {
        id: 6,
        name: "バランス感覚を高めたい",
        url: "https://getalabo-store.com/?category_id=695a208182808c4b6df25b01",
        matchConditions: { category: "athlete", subCategory: "balance" }
    },
    {
        id: 7,
        name: "身体の軸を整えたい",
        url: "https://getalabo-store.com/?category_id=695a209a82808c4b6df25b07",
        matchConditions: { category: "athlete", subCategory: "axis" }
    },
    // 姿勢・スタイル
    {
        id: 8,
        name: "姿勢を整えたい",
        url: "https://getalabo-store.com/?category_id=695a213482808c5506f25ae8",
        matchConditions: { category: "posture", subCategory: "fix_posture" }
    },
    {
        id: 9,
        name: "歩き方を見直したい",
        url: "https://getalabo-store.com/?category_id=695a21443097d71aff6b7c6a",
        matchConditions: { category: "posture", subCategory: "walking" }
    },
    {
        id: 10,
        name: "足元から整えたい",
        url: "https://getalabo-store.com/?category_id=695a215377bc66f3af77e316",
        matchConditions: { category: "posture", subCategory: "foot_care" }
    },
    // おうち時間
    {
        id: 11,
        name: "毎日の習慣に取り入れたい",
        url: "https://getalabo-store.com/?category_id=695a21b610a4929abf528417",
        matchConditions: { category: "daily", subCategory: "routine" }
    },
    {
        id: 12,
        name: "室内で使いたい",
        url: "https://getalabo-store.com/?category_id=695a21c2632ad67be976e5b1",
        matchConditions: { category: "daily", subCategory: "indoor" }
    },
    {
        id: 13,
        name: "外出・散歩で使いたい",
        url: "https://getalabo-store.com/?category_id=695a21d482808c5506f25b0d",
        matchConditions: { category: "daily", subCategory: "outdoor" }
    },
    {
        id: 14,
        name: "家族みんなで使いたい",
        url: "https://getalabo-store.com/?category_id=695a21e3632ad67be976e5bf",
        matchConditions: { category: "daily", subCategory: "family" }
    }
];

// DOM要素
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const progressFill = document.getElementById('progress-fill');
const resultName = document.getElementById('result-name');
const resultDescription = document.getElementById('result-description');

// 初期化
function init() {
    totalQuestionsSpan.textContent = questions.length;
    startBtn.addEventListener('click', startDiagnosis);
    restartBtn.addEventListener('click', restart);
}

// 診断開始
function startDiagnosis() {
    appState.currentQuestionIndex = 0;
    appState.answers = [];
    showScreen(questionScreen);
    showQuestion();
}

// 画面切り替え
function showScreen(screen) {
    const screens = [startScreen, questionScreen, resultScreen];
    screens.forEach(s => {
        s.classList.remove('active');
    });
    screen.classList.add('active');
}

// 質問表示
function showQuestion() {
    const question = questions[appState.currentQuestionIndex];
    const questionNumber = appState.currentQuestionIndex + 1;

    // プログレスバー更新
    currentQuestionSpan.textContent = questionNumber;
    const progress = (questionNumber / questions.length) * 100;
    progressFill.style.width = `${progress}%`;

    // 質問テキスト
    questionText.textContent = question.question;

    // 選択肢を取得（動的質問の場合は前の回答に基づく）
    let options = question.options;

    if (question.dynamicOptions && appState.currentQuestionIndex > 0) {
        // 前の質問の回答を取得
        const previousAnswer = appState.answers[0]; // 最初の質問の回答
        const previousOption = questions[0].options.find(opt => opt.value === previousAnswer.value);

        if (previousOption && previousOption.category) {
            options = question.dynamicOptions[previousOption.category] || question.options;
        }
    }

    // 選択肢ボタン生成
    optionsContainer.innerHTML = '';
    if (options) {
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option.text;
            button.addEventListener('click', () => selectOption(option.value, option));
            optionsContainer.appendChild(button);
        });
    }
}

// 選択肢選択
function selectOption(value, optionData) {
    appState.answers.push({ value, data: optionData });

    if (appState.currentQuestionIndex < questions.length - 1) {
        appState.currentQuestionIndex++;

        // フェードアニメーション
        questionScreen.classList.add('fade-out');
        setTimeout(() => {
            questionScreen.classList.remove('fade-out');
            questionScreen.classList.add('fade-in');
            showQuestion();

            setTimeout(() => {
                questionScreen.classList.remove('fade-in');
            }, 500);
        }, 300);
    } else {
        // 診断完了
        showResult();
    }
}

// ユーザープロファイルを回答から構築
function buildUserProfile() {
    const profile = {
        category: null,
        subCategory: null,
        budget: null,
        style: null
    };

    appState.answers.forEach(answer => {
        const d = answer.data;
        if (!d) return;
        if (d.category) profile.category = d.category;
        if (d.subCategory) profile.subCategory = d.subCategory;
        if (d.budget) profile.budget = d.budget;
        if (d.style) profile.style = d.style;
    });

    return profile;
}

// カテゴリページマッチング（Q1+Q2 で決定）
function matchCategoryPage(profile) {
    let bestMatch = null;
    let highestScore = 0;

    categoryPages.forEach(page => {
        let score = 0;
        const conditions = page.matchConditions;

        if (conditions.category && conditions.category === profile.category) {
            score += 100;
        }
        if (conditions.subCategory && conditions.subCategory === profile.subCategory) {
            score += 50;
        }

        if (score > highestScore) {
            highestScore = score;
            bestMatch = page;
        }
    });

    return bestMatch || categoryPages[0];
}

// 商品レコメンド（Q1〜Q4 全てを活用）
function recommendProducts(profile) {
    const scored = productDatabase.map(product => {
        let score = 0;

        // 目的マッチ（Q1）
        if (product.purposes.includes(profile.category)) {
            score += 40;
        }

        // サブ目的マッチ（Q2）
        if (product.subPurposes.includes(profile.subCategory)) {
            score += 30;
        }

        // スタイルマッチ（Q3）
        if (product.style === profile.style) {
            score += 20;
        }

        // 予算マッチ（Q4）
        if (product.budget === profile.budget) {
            score += 10;
        } else if (
            (profile.budget === "mid" && product.budget === "low") ||
            (profile.budget === "mid" && product.budget === "high")
        ) {
            // 隣接する予算帯には部分点
            score += 5;
        }

        return { product, score };
    });

    // スコア順にソート
    scored.sort((a, b) => b.score - a.score);

    // 上位3件を返す
    return scored.slice(0, 3).map(s => s.product);
}

// 結果表示
function showResult() {
    const profile = buildUserProfile();
    const categoryPage = matchCategoryPage(profile);
    const products = recommendProducts(profile);

    // カテゴリ名
    resultName.textContent = categoryPage.name;

    // 説明文
    resultDescription.textContent =
        "あなたの目的とご予算に合わせて、おすすめの商品をご紹介します。";

    // おすすめ商品カードを生成
    const productCardsContainer = document.getElementById('product-cards');
    productCardsContainer.innerHTML = '';

    products.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const rank = document.createElement('span');
        rank.className = 'product-rank';
        rank.textContent = index === 0 ? 'BEST' : `No.${index + 1}`;

        const name = document.createElement('h4');
        name.className = 'product-name';
        name.textContent = product.name;

        const price = document.createElement('p');
        price.className = 'product-price';
        price.textContent = product.priceDisplay;

        const desc = document.createElement('p');
        desc.className = 'product-desc';
        desc.textContent = product.shortDesc;

        const link = document.createElement('a');
        link.className = 'product-link';
        link.href = product.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = '商品を見る';

        card.appendChild(rank);
        card.appendChild(name);
        card.appendChild(price);
        card.appendChild(desc);
        card.appendChild(link);
        productCardsContainer.appendChild(card);
    });

    // カテゴリページリンク
    const viewCategoryBtn = document.getElementById('view-category-btn');
    if (viewCategoryBtn) {
        viewCategoryBtn.onclick = () => {
            window.open(categoryPage.url, '_blank');
        };
    }

    // 画面切り替え
    showScreen(resultScreen);
}

// 再診断
function restart() {
    appState.currentQuestionIndex = 0;
    appState.answers = [];
    showScreen(startScreen);
}

// アプリ起動
init();
