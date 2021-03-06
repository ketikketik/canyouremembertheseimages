import { useState, useRef, useEffect } from "react"
import { calculateResult } from "../../../utils"
import { shuffleArray } from "../../../utils"
import "./QuestionSlide.css"
import { QuestionCard, PrimaryButton } from "../../"
import { useConstructor } from "../../../custom_hooks"

const QuestionSlide = ({ questionCount, categoryFilename, setQuestionSlidePayload }) => {
    const imagesPath = process.env.PUBLIC_URL + `/assets/images`
    const questionIdxs = useRef([])
    const imageSrcs = useRef()
    const answers = useRef([])
    const initPassed = useRef(false)
    useConstructor(() => {
        for (let i = 0; i < questionCount; i++) {
            const questionIdx = shuffleArray([i * 2, i * 2 + 1])
            questionIdxs.current.push(questionIdx)
        }
        imageSrcs.current = {
            leftFrontSrc: `${categoryFilename[questionIdxs.current[0][0]]}`,
            leftRearSrc: questionIdxs.current[0][0] % 2 === 0 ? `${imagesPath}/etc/right.png` : `${imagesPath}/etc/wrong.png`,
            rightFrontSrc: `${categoryFilename[questionIdxs.current[0][1]]}`,
            rightRearSrc: questionIdxs.current[0][1] % 2 === 0 ? `${imagesPath}/etc/right.png` : `${imagesPath}/etc/wrong.png`
        }
    })
    const [initBatch, setInitBatch] = useState({
        counter: 0,
        questionAnswered: false,
        cardsFace: [true, true]
    })

    useEffect(() => {
        if (initBatch.questionAnswered === false) {
            if (!initPassed.current) {
                initPassed.current = true
            } else {
                if (initBatch.cardsFace[0]) {
                    imageSrcs.current.leftRearSrc = questionIdxs.current[initBatch.counter][0] % 2 === 0 ? `${imagesPath}/etc/right.png` : `${imagesPath}/etc/wrong.png`
                } else {
                    imageSrcs.current.leftFrontSrc = questionIdxs.current[initBatch.counter][0] % 2 === 0 ? `${imagesPath}/etc/right.png` : `${imagesPath}/etc/wrong.png`
                }
                if (initBatch.cardsFace[1]) {
                    imageSrcs.current.rightRearSrc = questionIdxs.current[initBatch.counter][1] % 2 === 0 ? `${imagesPath}/etc/right.png` : `${imagesPath}/etc/wrong.png`
                } else {
                    imageSrcs.current.rightFrontSrc = questionIdxs.current[initBatch.counter][1] % 2 === 0 ? `${imagesPath}/etc/right.png` : `${imagesPath}/etc/wrong.png`
                }
            }
        }
    }, [initBatch, imagesPath])

    const submitAnswer = (value) => {
        if (value === "left-answer") {
            setInitBatch({
                ...initBatch,
                cardsFace: [!initBatch.cardsFace[0], initBatch.cardsFace[1]],
                questionAnswered: true
            })
            answers.current.push(questionIdxs.current[initBatch.counter][0] % 2 === 0)
        } else if (value === "right-answer") {
            setInitBatch({
                ...initBatch,
                cardsFace: [initBatch.cardsFace[0], !initBatch.cardsFace[1]],
                questionAnswered: true
            })
            answers.current.push(questionIdxs.current[initBatch.counter][1] % 2 === 0)
        }
    }

    const nextQuestion = () => {
        if (initBatch.cardsFace[0]) {
            imageSrcs.current.leftRearSrc = `${categoryFilename[questionIdxs.current[initBatch.counter + 1][0]]}`
        } else {
            imageSrcs.current.leftFrontSrc = `${categoryFilename[questionIdxs.current[initBatch.counter + 1][0]]}`
        }
        if (initBatch.cardsFace[1]) {
            imageSrcs.current.rightRearSrc = `${categoryFilename[questionIdxs.current[initBatch.counter + 1][1]]}`
        } else {
            imageSrcs.current.rightFrontSrc =`${categoryFilename[questionIdxs.current[initBatch.counter + 1][1]]}`
        }
        setInitBatch({
            counter: initBatch.counter + 1,
            questionAnswered: false,
            cardsFace: [!initBatch.cardsFace[0], !initBatch.cardsFace[1]]
        })
    }

    const sendPayload = () => {
        setQuestionSlidePayload({
            result: calculateResult(answers.current),
            showResult: true
        })
    }

    const askingQuestion = <div className="qs-flex-container">
        <QuestionCard
            frontSrc={imageSrcs.current.leftFrontSrc}
            rearSrc={imageSrcs.current.leftRearSrc}
            submitAnswer={() => submitAnswer("left-answer")}
            questionAnswered={initBatch.questionAnswered}
        />
        <QuestionCard
            frontSrc={imageSrcs.current.rightFrontSrc}
            rearSrc={imageSrcs.current.rightRearSrc}
            submitAnswer={() => submitAnswer("right-answer")}
            questionAnswered={initBatch.questionAnswered}
        />
    </div>

    return (
        <div className="qs-container">
            <h2 className="qs-h2">Wich image you have seen?</h2>
            <h2 className="qs-h2">Question #{initBatch.counter + 1}</h2>
            {askingQuestion}
            <div className="qs-button-container">
                {
                    initBatch.counter < questionCount - 1 &&
                    <PrimaryButton
                        label="Next Question"
                        handleClick={nextQuestion}
                        disabled={!initBatch.questionAnswered}
                    />
                }
                {
                    initBatch.counter >= questionCount - 1 &&
                    <PrimaryButton
                        label="See Results"
                        handleClick={sendPayload}
                        disabled={!initBatch.questionAnswered}
                    />
                }
            </div>
        </div>
    )
}

export default QuestionSlide