
// ============================================================
// DEĞİŞKENLER
// let kullanıldı çünkü bu değerler fonksiyonlar içinde sonradan atanıyor
// ============================================================
let maxNumber;
let secretNumber;
let score;
let highScore = 0;
let playCount = 0;

// ============================================================
// YARDIMCI FONKSİYONLAR
// ============================================================

// Mesaj alanını günceller
const displayMessage = function (message) {
    document.getElementById('message').textContent = message;
}

// Gizli sayı kutusunu günceller
const displaySecretNumber = function (number) {
    document.getElementById('secretNumber').textContent = number;
}

// ============================================================
// OYUN BAŞLATMA — startGame
// Başlangıç ekranından maxNumber alınır, oyun ekranına geçilir
// ============================================================
const startGame = function () {
    maxNumber = Number(document.getElementById('maxNumberInput').value);

    // !maxNumber: boş veya sıfır girişi yakalar; maxNumber < 2: geçersiz küçük değerleri engeller
    if (!maxNumber || maxNumber < 2) {
        alert('Lütfen 2 veya daha büyük bir sayı girin!');
        document.getElementById('maxNumberInput').value = '';
        return;
    }

    secretNumber = Math.trunc(Math.random() * maxNumber) + 1;
    console.log(secretNumber);
    score = maxNumber;
    playCount = 1;
    document.getElementById('playCount').textContent = `${playCount}. oyun`;

    document.getElementById('gameDescription').textContent =
        `1 ile ${maxNumber} arasında bir sayı tahmin yap, skorunu koru!`;
    document.getElementById('score').textContent = score;

    // Ekran geçişi
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'flex';

    displayMessage('Tahmin yapmaya başlayabilirsin!');
};

// Başlat butonuna tıklama ve Enter tuşu ile oyunu başlatır
document.getElementById('startButton').addEventListener('click', startGame);

document.getElementById('maxNumberInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        startGame();
    }
});

// ============================================================
// AYNI OYUNU SIFIRLA — resetGame
// Aynı maxNumber ile yeniden oynar, başlangıç ekranına dönmez
// ============================================================
const resetGame = function () {
    secretNumber = Math.trunc(Math.random() * maxNumber) + 1;
    console.log(secretNumber);
    score = maxNumber;
    playCount++;
    document.getElementById('playCount').textContent = `${playCount}. oyun`;

    document.getElementById('score').textContent = score;
    document.getElementById('guessInput').value = '';
    document.getElementById('guessInput').disabled = false;
    document.getElementById('guessButton').textContent = 'Kontrol Et';

    displaySecretNumber('?');
    displayMessage('Tahmin yapmaya başlayabilirsin!');

    // Tüm görsel geri bildirimleri temizle
    document.getElementById('secretNumber').classList.remove('secret-number-correct', 'secret-number-wrong', 'pop');
    document.body.classList.remove('body-correct', 'body-wrong');

    // Butonu tekrar checkGuess'e bağla
    document.getElementById('guessButton').removeEventListener('click', resetGame);
    document.getElementById('guessButton').addEventListener('click', checkGuess);
};

// ============================================================
// TAHMİN KONTROLÜ — checkGuess
// Kullanıcının tahminini gizli sayıyla karşılaştırır
// ============================================================
const checkGuess = function () {
    const guess = Number(document.getElementById('guessInput').value);
    document.getElementById('guessInput').value = '';

    if (!guess || guess < 1 || guess > maxNumber) {
        displayMessage(`Lütfen 1 ile ${maxNumber} arasında bir sayı girin!`);
        return;
    }

    if (guess === secretNumber) {
        displayMessage('Tebrikler! Doğru tahmin ettiniz!');
        displaySecretNumber(secretNumber);

        // Butonu "Yeniden Oyna" yap ve resetGame'e bağla
        document.getElementById('guessButton').textContent = 'Yeniden Oyna';
        document.getElementById('guessButton').removeEventListener('click', checkGuess);
        document.getElementById('guessButton').addEventListener('click', resetGame);
        document.getElementById('guessInput').disabled = true;

        // Doğru tahmin görsel geri bildirimi: kutu ve arka plan yeşile döner, kutu büyür
        document.getElementById('secretNumber').classList.add('secret-number-correct');
        document.getElementById('secretNumber').classList.add('pop');
        document.body.classList.add('body-correct');

        if (score > highScore) {
            highScore = score;
            document.getElementById('highScore').textContent = highScore;
        }
    } else {
        score--;
        document.getElementById('score').textContent = score;
        displayMessage(guess > secretNumber ? 'Çok yüksek! Sayıyı düşür!' : 'Çok düşük! Sayıyı artır!');

        // Yanlış tahmin animasyonları
        const secretEl = document.getElementById('secretNumber');
        secretEl.classList.add('shake');
        document.body.classList.add('flash-red');

        // Animasyon bitince class'ları kaldır (tekrar tekrar çalışsın diye)
        secretEl.addEventListener('animationend', () => secretEl.classList.remove('shake'), { once: true });
        document.body.addEventListener('animationend', () => document.body.classList.remove('flash-red'), { once: true });

        if (score === 0) {
            displayMessage(`Kaybettin! Gizli sayı ${secretNumber} idi.`);
            displaySecretNumber(secretNumber);
            document.getElementById('guessInput').disabled = true;
            document.getElementById('guessButton').textContent = 'Yeniden Oyna';
            document.getElementById('guessButton').removeEventListener('click', checkGuess);
            document.getElementById('guessButton').addEventListener('click', resetGame);
            document.body.classList.add('body-wrong');
            document.getElementById('secretNumber').classList.add('secret-number-wrong');
        }
    }
};

// Tahmin butonuna tıklama ve Enter tuşu ile tahmini kontrol eder
document.getElementById('guessButton').addEventListener('click', checkGuess);

document.getElementById('guessInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

// ============================================================
// YENİ OYUN BAŞLAT — resetButton
// Sayfayı yenileyerek her şeyi sıfırlar, yeni maxNumber belirlenebilir
// ============================================================
document.getElementById('resetButton').addEventListener('click', function () {
    location.reload();
});
