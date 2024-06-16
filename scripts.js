// 切换角色信息的函数
function switchCharacter(image, name, description) {
    document.getElementById('characterImage').src = image;
    document.getElementById('characterName').textContent = name;
    document.getElementById('characterDescription').textContent = description;
    document.querySelector('.more-info-button').href = `character-details.html?character=${name}`;
}

// 页面加载后执行的代码
document.addEventListener('DOMContentLoaded', function() {
    var backgroundMusic = document.getElementById('backgroundMusic');
    var musicControlButton = document.getElementById('musicControlButton');

    // 添加页面点击事件监听器
    document.body.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
        }
    });

    // 添加音乐控制按钮的点击事件监听器
    musicControlButton.addEventListener('click', function(event) {
        event.stopPropagation(); // 阻止事件冒泡到body元素
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicControlButton.textContent = '⏸️'; // 更改按钮图标为暂停
        } else {
            backgroundMusic.pause();
            musicControlButton.textContent = '▶️'; // 更改按钮图标为播放
        }
    });

    // 添加滚动事件监听器
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) { // 滚动超过50px时添加模糊效果
            document.body.classList.add('blur');
        } else {
            document.body.classList.remove('blur');
        }
    });

    // 处理特征滑块
    var slides = document.querySelectorAll('.slide');
    var dots = document.querySelectorAll('.dot');

    dots.forEach(function(dot) {
        dot.addEventListener('click', function() {
            var index = this.getAttribute('data-index');
            showSlide(index);
        });
    });

    function showSlide(index) {
        slides.forEach(function(slide, i) {
            if (i == index) {
                slide.classList.add('active');
                dots[i].classList.add('active');
            } else {
                slide.classList.remove('active');
                dots[i].classList.remove('active');
            }
        });
    }

    // 显示初始幻灯片
    showSlide(0);

    // 如果在详细信息页面，显示相应的角色信息
    if (document.getElementById('characterDetailName')) {
        showCharacterDetails();
    }
});

// 显示角色详细信息的函数
function showCharacterDetails() {
    var params = new URLSearchParams(window.location.search);
    var character = params.get('character');
    var characterDetailName = document.getElementById('characterDetailName');
    var characterDetailDescription = document.getElementById('characterDetailDescription');
    
    switch (character) {
        case '魔术师':
            characterDetailName.textContent = 'The Magician';
            characterDetailDescription.innerHTML = `
                攻撃力：6<br>
                ライフ：9<br>
                スキル：アクション・ポイントを消費し、キャラクターを選び、魔術師はコインを投げる、表が出たキャラクターは1対1の子羊になり、裏が出たキャラクターは20対20の怪物になる。
            `;
            break;
        case '女祭司':
            characterDetailName.textContent = 'The High Priestess';
            characterDetailDescription.innerHTML = `
                攻撃力：2<br>
                ライフ：13<br>
                スキル：アクション・ポイントを2点消費することで、大神官は味方キャラクター1体の間に防御障壁を作り、そのキャラクターが受けるダメージ1つを免れることができる。 (プロテクト・バリアは1ゲームにつき1枚しか得られない）。
            `;
            break;
        case '女皇':
            characterDetailName.textContent = 'The Empress';
            characterDetailDescription.innerHTML = `
                攻撃力：3<br>
                ライフ：12<br>
                スキル：このターン、攻撃を放棄して味方を回復することができる。
            `;
            break;
        default:
            characterDetailName.textContent = 'キャラクターの詳細';
            characterDetailDescription.textContent = 'キャラクター情報が見つかりません。';
            break;
    }
}
