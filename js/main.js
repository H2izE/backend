
const heart = document.querySelector('.heart_btn');//단독실행하면 안됨
const header = document.querySelector('#header');
const sidebox = document.querySelector('.side_box');
const variableWidth = document.querySelectorAll(".contents_box .contents");
//SelectorAll을 통해 모든 요소를 가져옴

const deligation = document.querySelector(".contents_box");

// heart.addEventListener('click', function () {
//     console.log('하트누름 정상작동');
//     heart.classList.toggle('on');
// });

function deligationFunc(e) {
    let elem = e.target; //클릭 요소 가져오기
    console.log(e.target);
    console.log(elem);

    while (!elem.getAttribute('data-name')) {
        //elem의 부모를 찾음
        elem = elem.parentNode;
        if (elem.nodeName === 'BODY') {//body까지 이벤트가 없는 경우
            elem = null;
            return;

        }//data-name을 가진 속성을 찾을때까지 부모에게 접근 반복
    }

    if (elem.matches('[data-name="heartbeat"')) {
        console.log('하트누름');
    } else if (elem.matches('[data-name="bookmark"')) {
        console.log('북마크누름');
    } else if (elem.matches('[data-name="share"')) {
        console.log('공유누름');
    } if (elem.matches('[data-name="more"')) {
        console.log('더보기누름');
    }

    elem.classList.toggle('on'); //on 클래스 주기
}

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
    //console.log(pageYOffset);
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

deligation.addEventListener('click', deligationFunc);

window.addEventListener('resize', resizeFunc);//resize 이벤트 발생 시 resizeFunc 실행
window.addEventListener('scroll', scrollFunc);