
//const heart = document.querySelector('.heart_btn');//단독실행하면 안됨
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
    //console.log(e.target);
    console.log(elem);

    //잘못 클릭함
    while (!elem.getAttribute('data-name')) {
        //elem의 부모를 찾음
        elem = elem.parentNode;
        if (elem.nodeName === 'BODY') {//body까지 이벤트가 없는 경우
            elem = null;
            return;

        }//data-name을 가진 속성을 찾을때까지 부모에게 접근 반복
    }

    if (elem.matches('[data-name="heartbeat"')) {
        //console.log('하트누름');
        let pk = elem.getAttribute('name'); //pk값을 받아옴
        $.ajax({
            Method: 'POST', //에러 시 GET으로 변경
            url: 'data/like.json',
            data: { pk },
            dataType: 'json',  //어떤 데이터로 들어오는지 설정
            success: function (response) {//통신에 성공한 데이터가 response로 들어옴
                let likeCount = document.querySelector('#like-count-37');
                likeCount.innerHTML = '좋아요' + response.like_count + '개';
            },
            error: function (request, status, error) {
                alert('로그인 필요');
                window.location.replace('https://www.naver.com');//임시 에러 웹페이지
            }
        })
    } else if (elem.matches('[data-name="bookmark"')) {
        //console.log('북마크누름');
        let pk = elem.getAttribute('name'); //pk값을 받아옴
        $.ajax({
            Method: 'POST', //에러 시 GET으로 변경
            url: 'data/bookmark.json',
            data: { pk },
            dataType: 'json',  //어떤 데이터로 들어오는지 설정
            success: function (response) {//통신에 성공한 데이터가 response로 들어옴
                let likeCount = document.querySelector('#bookmark-count-37');
                likeCount.innerHTML = '북마크' + response.bookmark_count + '개';
            },
            error: function (request, status, error) {
                alert('로그인 필요');
                window.location.replace('https://www.naver.com');//임시 에러 웹페이지
            }
        })
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
            if (window.innerWidth > 600) //디폴트값이 614이므로 그 이상 커지지 않게 하기 위함
                variableWidth[i].removeAttribute('style');
        }
    }
}

function scrollFunc() {
    //console.log(pageYOffset);
    if (pageYOffset >= 10) {//드래그할 경우
        header.classList.add('on');
        sidebox.classList.add('on');
        resizeFunc();
    } else {
        header.classList.remove('on');
        sidebox.classList.remove('on');
        sidebox.removeAttribute('style');
    }
}

setTimeout(function () {
    scrollTo(0, 0);
}, 100); //새로고침하면 화면이 제일 위로 가게 함

if (deligation) {
    deligation.addEventListener('click', deligationFunc);
}


window.addEventListener('resize', resizeFunc);//resize 이벤트 발생 시 resizeFunc 실행
window.addEventListener('scroll', scrollFunc);