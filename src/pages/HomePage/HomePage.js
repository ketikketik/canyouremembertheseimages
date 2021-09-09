import { useState } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { restyleCategory } from "../../utils"
import { BiLeftArrowAlt } from "react-icons/bi"
import "./HomePage.css"

const imagesPath = process.env.PUBLIC_URL + `/assets/images`
const HomePage = () => {
  const [initBatch, setInitBatch] = useState({
    showCategory: true,
    category: null,
  })
  const setCategory = (value) => {
    setInitBatch({
      showCategory: false,
      category: value
    })
  }
  const resetCategory = () => {
    setInitBatch({
      showCategory: true,
      category: null
    })
  }
  return (
    <div>
      <p className="hp-p">
        This web is a challange for your brain. Here's how it works.
        There's 2 phase. First, the remembering phase.
        you'll be shown some images and you have to remember as many image as possible.
        Second, the question phase. There will be 2 images that appear for each question.
        One is an image that you have seen and the other that you have not seen.
        Choose an image you've seen.
      </p>
      {initBatch.showCategory &&
        <div>
          <h2 className="hp-center-text">Select Category</h2>
          <div className="hp-flex-container">
            <div className="hp-flex-item">
              <div
                className="hp-flex-item-card"
                onClick={() => setCategory("brand_logo")}
              >
                <img
                  className="hp-img"
                  src={`${imagesPath}/category/brand_logo.jpg`}
                  alt={`${imagesPath}/category/brand_logo.jpg`}
                />
              </div>
              <h3 className="hp-center-text">Brand Logo</h3>
            </div>
            <div className="hp-flex-item">
              <div
                className="hp-flex-item-card"
                onClick={() => setCategory("anime")}
              >
                <img
                  className="hp-img"
                  src={`${imagesPath}/category/anime.jpg`}
                  alt={`${imagesPath}/category/anime.jpg`}
                />
              </div>
              <h3 className="hp-center-text">Anime</h3>
            </div>
            <div className="hp-flex-item">
              <div
                className="hp-flex-item-card"
                onClick={() => setCategory("video_game")}
              >
                <img
                  className="hp-img"
                  src={`${imagesPath}/category/video_game.jpg`}
                  alt={`${imagesPath}/category/video_game.jpg`}
                />
              </div>
              <h3 className="hp-center-text">Video Game</h3>
            </div>
          </div>
        </div>
      }
      {
        initBatch.showCategory === false &&
        <div>
          <h2 className="hp-center-text">Select Difficulty</h2>
          <div className="hp-flex-container">
            <div className="hp-flex-item">
              <LinkContainer to={`test/${initBatch.category}/easy`}>
                <div className="hp-flex-item-card">
                  <img
                    className="hp-img"
                    src={`${imagesPath}/difficulty/easy.jpg`}
                    alt={`${imagesPath}/difficulty/easy.jpg`}
                  />
                </div>
              </LinkContainer>
              <h3 className="hp-center-text">{restyleCategory(initBatch.category)} Easy</h3>
            </div>
            <div className="hp-flex-item">
              <LinkContainer to={`test/${initBatch.category}/medium`}>
                <div className="hp-flex-item-card">
                  <img
                    className="hp-img"
                    src={`${imagesPath}/difficulty/medium.jpg`}
                    alt={`${imagesPath}/difficulty/medium.jpg`}
                  />
                </div>
              </LinkContainer>
              <h3 className="hp-center-text">{restyleCategory(initBatch.category)} Medium</h3>
            </div>
            <div className="hp-flex-item">
              <LinkContainer to={`test/${initBatch.category}/hard`}>
                <div className="hp-flex-item-card">
                  <img
                    className="hp-img"
                    src={`${imagesPath}/difficulty/hard.jpg`}
                    alt={`${imagesPath}/difficulty/hard.jpg`}
                  />
                </div>
              </LinkContainer>
              <h3 className="hp-center-text">{restyleCategory(initBatch.category)} Hard</h3>
            </div>
          </div>
          <div className="hp-center-div">
            <div
              className="hp-text-icon"
              onClick={resetCategory}
            >
              <BiLeftArrowAlt className="hp-icon" />
              <h3>Select Category</h3>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default HomePage
