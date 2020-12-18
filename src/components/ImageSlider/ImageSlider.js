import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

function ImageSlider({ category, categories }) {

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    }

    let src = 'https://covers.openlibrary.org/b/id/'

    return (
        <div className="explore-page__slider">
            <h2>{category}</h2>
            <Slider {...settings}>
                {categories && categories.map(book => (
                    <div key={book.cover_id}>
                        <img src={src + `${book.cover_id}-M.jpg`} alt={book.title} />
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default ImageSlider