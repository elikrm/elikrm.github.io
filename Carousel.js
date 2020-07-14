const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots =Array.from(dotsNav.children);
const slidewidth = slides[0].getBoundingClientRect().width;

//arrage slides next to another
function setSlidePosition(slide,index)
{
    slide.style.left = slidewidth * index +  'px';
}
slides.forEach(setSlidePosition);
function moveToSlide(track, currentSlide, targetSlide)
{
    track.style.transform = 'translateX(-'+ targetSlide.style.left+')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}
function updateDots(currentDot,targetDot)
{
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}
function HideShowArrows(slides,prevButton,nextButton,targetIndex)
{
    if(targetIndex === 0)
    {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
    else if(targetIndex === slides.length -1)
    {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    }
    else
    {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}
//when I click left move slides to the left
prevButton.addEventListener('click',e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    moveToSlide(track, currentSlide, prevSlide);

    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    updateDots(currentDot,prevDot);

    const prevIndex = slides.findIndex(slide => slide == prevSlide);
    HideShowArrows(slides,prevButton,nextButton,prevIndex);
})
//when I click right move slides to the right
nextButton.addEventListener('click',e => 
{
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    moveToSlide(track, currentSlide, nextSlide);

    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    updateDots(currentDot,nextDot);

    const nextIndex = slides.findIndex(slide => slide == nextSlide);
    HideShowArrows(slides,prevButton,nextButton,nextIndex);
})

//when I click nav indicater move slides to that side
dotsNav.addEventListener('click',e => {
    //what indicator was clicked on
    const targetDot = e.target.closest('button');
    if(!targetDot) return;
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot == targetDot);
    const targetSlide = slides[targetIndex];
    // console.log(dots);
    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot,targetDot);
    HideShowArrows(slides,prevButton,nextButton,targetIndex);
})