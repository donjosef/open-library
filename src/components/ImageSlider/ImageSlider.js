import React from 'react'
import Slider from "react-slick"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useMedia } from '../../hooks/useMedia'
import './ImageSlider.css'
import "slick-carousel/slick/slick.css"

function setSlides(media) { //how many slides will be visible based on screen
    return (
        media === 'desktop' ? 3 :
        media === 'tablet' ? 2 :
        media === 'mobile' ? 1 :
        0
    )
}

function buildFakeSlides(slides) {
    return Array.from(Array(slides), (el, i) => (
        <div
            className="slider__item--fake"
            key={i}></div>
    ))
}

function NextArrow(props) {
    const { className, onClick } = props
    return (
        <button className={className} onClick={onClick}>
            <FontAwesomeIcon icon={faAngleRight} />
        </button>
    )
}

function PrevArrow(props) {
    const { className, onClick } = props;

    return (
        <button className={className} onClick={onClick}>
            <FontAwesomeIcon icon={faAngleLeft} />
        </button>
    )
}

const ImageSlider = React.memo(({ category, categories, loading }) => {
    const media = useMedia()

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: setSlides(media),
        slidesToScroll: setSlides(media),
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    }

    let src = 'https://covers.openlibrary.org/b/id/'

    return (
        <div className="explore-page__slider">
            {loading ? (
                <Slider {...settings}>
                    {buildFakeSlides(setSlides(media))}
                </Slider>
            ) : (
                    <>
                        <h2>{category}</h2>
                        <Slider {...settings}>
                            {categories.map(book => (
                                <img
                                    className="slider__item"
                                    key={book.cover_id}
                                    src={src + `${book.cover_id}-M.jpg`}
                                    alt={book.title}
                                />
                            ))}
                        </Slider>
                    </>
                )}
        </div>
    )
})

export default ImageSlider