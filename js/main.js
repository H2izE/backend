
const heart = document.querySelector('.heart_btn');//단독실행하면 안됨
const header = document.querySelector('#header');
const sidebox = document.querySelector('.side_box');
const variableWidth = document.querySelectorAll(".contents_box .contents");

heart.addEventListener('click', function () {
    console.log('하트누름 정상작동');
    heart.classList.toggle('on');
});

function resizeFunc() {
    if (pageYOffset >= 10) {
        let calcWidth = (window.innerWidth * 0.5) + 167; //웹페이지 기반 위치 재조정
        sidebox.style.left = calcWidth + 'px';
    }

    if (matchMedia('screen and (max-width : 800px)').matches) {
        //여러 개의 컨텐츠 박스가 있으므로 배열 활용
        for (let i = 0; i < variableWidth.length; i++) {
            variableWidth[i].style.width = window.innerWidth - 20 + 'px';
        }
    } else {
        for (let i = 0; i < variableWidth.length; i++) {
            variableWidth[i].removeAttribute('style');
        }
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

window.addEventListener('resize', resizeFunc);//resize 이벤트 발생 시 resizeFunc 실행
window.addEventListener('scroll', scrollFunc);