const prevBtn = document.querySelector('.prev-btn')
const nextBtn = document.querySelector('.next-btn')
const slideWraper = document.querySelector('.slide-wrapper')
const slide = document.querySelector('.slide')
const pagination = Array.from(document.querySelectorAll('.slice-pagination li'))
const slideLink = document.querySelectorAll('.slide-link')
let currentSlide = 1
let disable = false
let timeID
let startMove
let moved


const slideItems = Array.from(document.querySelectorAll('.slide-item'))

slideItems[0].style.background = 'linear-gradient(to right, rgb(138, 10, 255), rgb(96, 6, 255))'
slideItems[1].style.background = 'linear-gradient(to right, rgb(104, 40, 250), rgb(255, 186, 164))'
slideItems[2].style.background = 'linear-gradient(to right, rgb(40, 119, 250), rgb(103, 23, 205)'
slideItems[3].style.background = 'linear-gradient(to right, rgb(118, 18, 255), rgb(5, 178, 255))'
slideItems[4].style.background = 'linear-gradient(to right, rgb(254, 33, 94), rgb(255, 148, 2))'
slideItems[5].style.background = 'linear-gradient(to right, rgb(0, 126, 254), rgb(6, 195, 254)'


slide.append(slideItems[0].cloneNode(true))
slide.prepend(slideItems.at(-1).cloneNode(true))
let lastSlide = slideItems.length + 1
let firstSlide = 0

function slideTo(slideIndex, immediate = true) {
    const translateX = slideIndex * -100
    slideImmediate(immediate)
    slide.style.transform = `translateX(${translateX}%)`
}

function slideImmediate(immediate = true) {
    slide.style.transition = immediate ? 'none' : '0.5s ease'
}

function setPagination(currentSlide) {
    pagination.map((pageSlide) => {
        pageSlide.classList.remove('active')
    })
    let pageIndex
    switch (currentSlide) {
        case lastSlide:
            pageIndex = 0
            break
        case firstSlide:
            pageIndex = slideItems.length - 1
            break
        default: pageIndex = currentSlide - 1

    }
    pagination[pageIndex]?.classList.add('active')
}

function nextSlide() {
    if (disable) return
    currentSlide += 1
    slideTo(currentSlide, false)
    setPagination(currentSlide)
    disable = true
}

function backSlide() {
    if (disable) return
    currentSlide -= 1
    slideTo(currentSlide, false)
    setPagination(currentSlide)
    disable = true
}

function autoSlider() {
    timeID = setInterval(nextSlide, 5000)
}
function removeAutoSlide() {
    clearInterval(timeID)
}

prevBtn.addEventListener('click', backSlide)
nextBtn.addEventListener('click', nextSlide)
slide.addEventListener('transitionend', () => {
    disable = false
    if (currentSlide === 0) {
        currentSlide = slideItems.length
        slideTo(currentSlide)
    }
    if (currentSlide === (slideItems.length + 1)) {
        currentSlide = 1
        slideTo(currentSlide)
    }
})
slide.addEventListener('mouseenter', removeAutoSlide)
slide.addEventListener('mouseleave', autoSlider)

slide.addEventListener('mousedown', (e) => {
    startMove = e.clientX
    document.addEventListener('mousemove', handleMouseMove)
})
document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', handleMouseMove)
    switch (true) {
        case moved > 200:
            backSlide()
            break
        case moved < -200:
            nextSlide()
            break
        default:
            translateX = currentSlide * -100
            slide.style.transform = `translateX(${translateX}%)`
    }
})

function handleMouseMove(e) {
    let nowMove = e.clientX
    moved = nowMove - startMove
    const translateX = currentSlide * -100

    slideImmediate()
    slide.style.transform = `translateX(calc(${translateX}% + ${moved}px))`
    console.log(moved);

}

slideTo(currentSlide)
autoSlider()


pagination.map((pageSlide, index) => {
    pageSlide.addEventListener('click', () => {
        currentSlide = index + 1
        slideTo(currentSlide, false)
        setPagination(currentSlide)
    })
})

slideLink.forEach(link => {
    link.onclick = e => {
        moved !== 0 && e.preventDefault()
    }
    console.log(link.onclick);
})