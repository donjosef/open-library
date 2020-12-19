import React from 'react'
import { useMedia } from '../../hooks/useMedia'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import './ImageSlider.css'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"

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

function ImageSlider({ category, categories }) {
    const media = useMedia()

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: media === 'desktop' ? 3 : media === 'tablet' ? 2 : media === 'mobile' ? 1 : null,
        slidesToScroll: media === 'desktop' ? 3 : media === 'tablet' ? 2 : media === 'mobile' ? 1 : null,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    }

    let src = 'https://covers.openlibrary.org/b/id/'

    return (
        <div className="explore-page__slider">
            <h2>{category}</h2>
            <Slider {...settings}>
                {categories && categories.map(book => (
                    <img
                        className="slider__item"
                        key={book.cover_id}
                        src={src + `${book.cover_id}-M.jpg`}
                        alt={book.title}
                    />
                ))}
            </Slider>
        </div>
    )
}

export default ImageSlider