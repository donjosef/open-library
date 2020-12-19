import React, { useState, useEffect } from 'react'
import ImageSlider from '../../components/ImageSlider/ImageSlider'
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
                const works = data.works.filter(work => work.cover_id)
                setCategories(prevCategories => {
                    return {
                        ...prevCategories,
                        [data.name]: works //will be {category1: [], category2: [], category3: []}
                    }
                })
            })
    }

    const [firstCategory, secondCategory, thirdCategory] = Object.keys(categories)

    return (
        <div className="explore-page">
            <ImageSlider category={firstCategory} categories={categories[firstCategory]} />
            <ImageSlider category={secondCategory} categories={categories[secondCategory]} />
            <ImageSlider category={thirdCategory} categories={categories[thirdCategory]} />
        </div>
    )
}

export default ExplorePage