
// let kullanıldı çünkü bu değerler startGame içinde sonradan atanıyor
let maxNumber;
let secretNumber;
let score;
let highScore = 0;

// Mesaj alanını günceller
const displayMessage = function (message) {
    document.getElementById('message').textContent = message;
}

// Gizli sayı kutusunu günceller
const displaySecretNumber = function (number) {
    document.getElementById('secretNumber').textContent = number;
}

const startGame = function () {
    maxNumber = Number(document.getElementById('maxNumberInput').value);

    // !maxNumber: boş veya sıfır girişi yakalar; maxNumber < 2: geçersiz küçük değerleri engeller
    if (!maxNumber || maxNumber < 2) {
        alert('Lütfen 2 veya daha büyük bir sayı girin!');
        return;
    }

    secretNumber = Math.trunc(Math.random() * maxNumber) + 1;
    console.log(secretNumber);
    score = maxNumber;

    document.getElementById('gameDescription').textContent =
        `1 ile ${maxNumber} arasında bir sayı tahmin yap, skorunu koru!`;
    document.getElementById('score').textContent = score;

    // TODO: ekran geçişi aktif edilecek
    // document.getElementById('startScreen').style.display = 'none';
    // document.getElementById('gameScreen').style.display = 'flex';

    displayMessage('Tahmin yapmaya başlayabilirsin!');
};

// Başlat butonuna tıklama ve Enter tuşu ile oyunu başlatır
document.getElementById('startButton').addEventListener('click', startGame);

document.getElementById('maxNumberInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        startGame();
    }
});

const checkGuess = function () {
    const guess = Number(document.getElementById('guessInput').value);

    if (!guess || guess < 1 || guess > maxNumber) {
        displayMessage(`Lütfen 1 ile ${maxNumber} arasında bir sayı girin!`);
        return;
    }

    if (guess === secretNumber) {
        displayMessage('Tebrikler! Doğru tahmin ettiniz!');
        displaySecretNumber(secretNumber);
        // Doğru tahmin görsel geri bildirimi: kutu ve arka plan yeşile döner
        document.getElementById('secretNumber').classList.add('secret-number-correct');
        document.body.classList.add('body-correct');

        if (score > highScore) {
            highScore = score;
            document.getElementById('highScore').textContent = highScore;
        }
    } else {
        score--;
        document.getElementById('score').textContent = score;
        displayMessage(guess > secretNumber ? 'Çok yüksek! Sayıyı düşür!' : 'Çok düşük! Sayıyı artır!');
    }
};

// Tahmin butonuna tıklama ve Enter tuşu ile tahmini kontrol eder
document.getElementById('guessButton').addEventListener('click', checkGuess);

document.getElementById('guessInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});
