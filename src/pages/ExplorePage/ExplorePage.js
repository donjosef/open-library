import React, { useState, useEffect } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import './ExplorePage.css'

function ExplorePage(props) {
    const [categories, setCategories] = useState({})

    useEffect(() => {
        const categories = ['arts', 'fiction', 'sciencemathematics', 'business', 'juvenile_fiction', 'history', 'health', 'biography', 'social_sciences', 'textbooks']
        let randoms = []
        for (let i = 0; i < 3; i++) {
            const random = Math.floor(Math.random() * categories.length)
            if (!randoms.includes(random)) {
                randoms[i] = random
            } else {
                i--
            }
        }

        randoms.forEach(random => getCategory(categories[random]))
    }, [])

    const getCategory = (category) => {

        fetch(`https://openlibrary.org/subjects/${category}.json`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const works = data.works
                setCategories(prevCategories => {
                    return {
                        ...prevCategories,
                        [data.name]: works
                    }
                })
            })
    }

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    }

    const [firstCategory, secondCategory, thirdCategory] = Object.keys(categories)
    let src = 'https://covers.openlibrary.org/b/id/'

    return (
        <div className="explore-page">
            <div className="explore-page__slider">
                <h2>{firstCategory}</h2> 
                <Slider {...settings}>
                    {categories[firstCategory] && categories[firstCategory].map(book => (
                    <div key={book.cover_id}>
                        <img src={src + `${book.cover_id}-M.jpg`} alt={book.title}/>
                    </div>  
                    ))}
                </Slider>
            </div>

            <div className="explore-page__slider">
                <h2>{secondCategory}</h2>
                <Slider {...settings}>
                    {categories[secondCategory] && categories[secondCategory].map(book => (
                    <div key={book.cover_id}>
                        <img src={src + `${book.cover_id}-M.jpg`} alt={book.title}/>
                    </div>  
                    ))}
                </Slider>
            </div>

            <div className="explore-page__slider">
                <h2>{thirdCategory}</h2>
                <Slider {...settings}>
                    {categories[thirdCategory] && categories[thirdCategory].map(book => (
                    <div key={book.cover_id}>
                        <img src={src + `${book.cover_id}-M.jpg`} alt={book.title}/>
                    </div>  
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default ExplorePage