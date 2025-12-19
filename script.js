const NavDialog = document.getElementById('nav-dialog');

function handleMenu() {
    NavDialog.classList.toggle('hidden');
}

const initialTranslateLTR =  -48*4;
const initialTranslateRTL = 36*4;

function setupIntersectionObserver(element, isLTR, speed){
    const intersectionCallback = (entries) => {
        const isIntersecting = entries[0].isIntersecting;
        if(isIntersecting) {
            document.addEventListener('scroll', scrollHandler);
        }else {
            document.removeEventListener('scroll', scrollHandler);
        }

    }
    const intersectionObserver = new IntersectionObserver(intersectionCallback);

    intersectionObserver.observe(element);

    function scrollHandler() {
        const translateX = (window.innerHeight - element.getBoundingClientRect().top)*speed;
        let totalTranslate = 0;
        if(isLTR){
            totalTranslate = translateX + initialTranslateLTR;
        }
        else {
            totalTranslate = -(translateX + initialTranslateRTL);
        }
        element.style.transform = `translateX(${totalTranslate}px)`;
    }
}

const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');

//call the function for each line

setupIntersectionObserver(line1, true, 0.15);
setupIntersectionObserver(line2, false, 0.15);
setupIntersectionObserver(line3, true, 0.15);

const dtElement = document.querySelectorAll('dt');
dtElement.forEach(element => {
    element.addEventListener('click', () => {
        const ddId = element.getAttribute('aria-controls');
        const ddElements = document.getElementById(ddId);
        const ddArrowIcon = element.querySelectorAll('i')[0];

        ddElements.classList.toggle('hidden');
        ddArrowIcon.classList.toggle('-rotate-180');

    })
})
