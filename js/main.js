
const heart = document.querySelector('.heart_btn');//단독실행하면 안됨
const header = document.querySelector('#header');

heart.addEventListener('click', function () {
    console.log('하트누름 정상작동');
    heart.classList.toggle('on');
});

function scrollFunc() {
    console.log(pageYOffset);
    if (pageYOffset >= 10) {
        header.classList.add('on');
    } else {
        header.classList.remove('on');
    }
}

window.addEventListener('scroll', scrollFunc);