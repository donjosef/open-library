import React, { useState, useEffect } from 'react'
import ImageSlider from '../../components/ImageSlider/ImageSlider'
import './ExplorePage.css'

function ExplorePage(props) {
    const [categories, setCategories] = useState({})
    const [loadings, setLoadings] = useState({})

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
                const works = data.works.filter(work => work.cover_id)
                setCategories(prevCategories => {
                    return {
                        ...prevCategories,
                        [data.name]: works //will be {category1: [], category2: [], category3: []}
                    }
                })

                setLoadings(prevLoadings => {
                    return {
                        ...prevLoadings,
                        [data.name]: false
                    }
                })
            })
    }

    const [firstCategory, secondCategory, thirdCategory] = Object.keys(categories)
    const [firstLoading = true, secondLoading = true, thirdLoading = true] = Object.values(loadings) //Default values in destructuring assignement only work if the variables either don't exist or their value is set to undefined  

    return (
        <div className="explore-page">
            <ImageSlider
                loading={firstLoading}
                category={firstCategory}
                categories={categories[firstCategory]} />
            <ImageSlider
                loading={secondLoading}
                category={secondCategory}
                categories={categories[secondCategory]} />
            <ImageSlider
                loading={thirdLoading}
                category={thirdCategory}
                categories={categories[thirdCategory]} />
        </div>
    )
}

export default ExplorePage