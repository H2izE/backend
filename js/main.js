
const heart = document.querySelector('.heart_btn');//단독실행하면 안됨
const header = document.querySelector('#header');
const sidebox = document.querySelector('.side_box');

heart.addEventListener('click', function () {
    console.log('하트누름 정상작동');
    heart.classList.toggle('on');
});

function resizeFunc() {
    if (pageYOffset >= 10) {
        let calcWidth = (window.innerWidth * 0.5) + 167; //웹페이지 기반 위치 재조정
        sidebox.style.left = calcWidth + 'px';
    }
}

function scrollFunc() {
    console.log(pageYOffset);
    if (pageYOffset >= 10) {
        header.classList.add('on');
        sidebox.classList.add('on');
        resizeFunc();
    } else {
        header.classList.remove('on');
        sidebox.classList.remove('on');
        sidebox.removeAttribute('style');
    }
}

window.addEventListener('scroll', scrollFunc);