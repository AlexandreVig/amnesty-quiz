import {createStore} from "vuex";

let questions = [
    {
        type: "list-answer",
        question: "Un.e réfugié.e est une personne qui quitte son pays...",
        answers: ["Pour fuir la guerre", "Pour fuir la misère", "Pour prendre des vacances", "Pour payer moins d'impôts", "Parce qu'il risque la mort", "Pour se faire soigner"],
        true_answers: [0, 4],
        explanation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!",
        is_french: false,
    },
    {
        type: "round-slider",
        question: "En France, combien de statuts de réfugié sont attribués relativement au nombre total de demandes ?",
        answer: 27,
        explanation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!",
        is_french: true,
    },
    {
        type: "vertical-slider",
        question: "Quelle est la proportion  de réfugié.e.s vivant dans ces pays ?",
        labels: ["France", "Allemagne", "Liban"],
        color: ["yellow", "purple", "blue"],
        answers: [0.05, 0.3, 20.8],
        explanation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!",
        is_french: false,
    },
    {
        type: "true-false",
        question: "Un.e réfugié.e...",
        label: "Peut voter",
        answer: false,
        image: "assets/true-false/voter.png",
        explanation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!",
        is_french: true,
    },
    {
        type: "true-false",
        question: "Un.e réfugié.e...",
        label: "Peut étudier",
        answer: true,
        image: "assets/true-false/etudier.png",
        explanation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!",
        is_french: true,
    },
    {
        type: "true-false",
        question: "Un.e réfugié.e...",
        label: "Peut travailler",
        answer: true,
        image: "assets/true-false/travail.png",
        explanation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!",
        is_french: true,
    },
    {
        type: "true-false",
        question: "Un.e réfugié.e...",
        label: "Est logé.e par l'état",
        answer: false,
        image: "assets/true-false/loger.png",
        explanation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!",
        is_french: true,
    },
    {
        type: "true-false",
        question: "Un.e réfugié.e...",
        label: "A la nationalité française",
        answer: false,
        image: "assets/true-false/francais.png",
        explanation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!",
    },
    {
        type: "true-false",
        question: "Au cours du dernier siècle, des réfugié.e.s ont-ils fuit les pays suivants ?",
        label: "France",
        answer: true,
        image: "assets/flag/france.png",
        explanation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!",
        is_french: true,
    },
    {
        type: "true-false",
        question: "Au cours du dernier siècle, des réfugié.e.s ont-ils fuit les pays suivants ?",
        label: "Allemagne",
        answer: true,
        image: "assets/flag/allemagne.png",
        explanation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!",
        is_french: false,
    },
    {
        type: "true-false",
        question: "Au cours du dernier siècle, des réfugié.e.s ont-ils fuit les pays suivants ?",
        label: "Royaume-Uni",
        answer: true,
        image: "assets/flag/royaume-uni.png",
        explanation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!",
        is_french: false,
    },
    {
        type: "true-false",
        question: "Au cours du dernier siècle, des réfugié.e.s ont-ils fuit les pays suivants ?",
        label: "Espagne",
        answer: true,
        image: "assets/flag/espagne.png",
        explanation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!",
        is_french: false,
    },
    {
        type: "true-false",
        question: "Au cours du dernier siècle, des réfugié.e.s ont-ils fuit les pays suivants ?",
        label: "Italie",
        answer: true,
        image: "assets/flag/italie.png",
        explanation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!",
        is_french: false,
    },
    {
        type: "select-between",
        question: "Qui peut faire les actions suivantes ?",
        answers_available: ["Un refugié", "Un demandeur d'asile"],
        label: "Je peux voyager en Europe",
        answer: 0,
        explanation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!",
        is_french: false,
    },
    {
        type: "select-between",
        question: "Qui peut faire les actions suivantes ?",
        answers_available: ["Un refugié", "Un demandeur d'asile"],
        label: "Je peux retourner dans mon pays",
        answer: 1,
        explanation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!",
        is_french: false,
    },
    {
        type: "select-between",
        question: "Qui peut faire les actions suivantes ?",
        answers_available: ["Un refugié", "Un demandeur d'asile"],
        label: "Je peux travailler",
        answer: 0,
        explanation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!",
        is_french: false,
    },
    {
        type: "select-between",
        question: "Qui peut faire les actions suivantes ?",
        answers_available: ["Un refugié", "Un demandeur d'asile"],
        label: "J'ai droit à une aide financière de par mon statut",
        answer: 1,
        explanation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!",
        is_french: false,
    },
    {
        type: "select-between",
        question: "Qui peut faire les actions suivantes ?",
        answers_available: ["Un refugié", "Un demandeur d'asile"],
        label: "J'ai droit à des cours de français",
        answer: 1,
        explanation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!",
        is_french: false,
    }
]

const store = createStore({
    state () {
        return {
            questions: questions,
            answers: [],
            score: 0,
            verticalSliderScore: 0,
            verticalSliderDetails: [],
        }
    },
    mutations: {
        incrementScore(state) {
            state.score += 1
        },
        incrementVerticalSliderScore(state) {
            state.verticalSliderScore += 1
        },
        initVerticalSliderScore(state) {
            state.verticalSliderScore = 0
        },
        initScore(state) {
            state.score = 0
        },
        initAnswer(state) {
            state.answers = []
        },
        initVerticalSliderDetails(state) {
            state.verticalSliderDetails = []
        },
        addAnswer(state, answer) {
            state.answers.push(answer)
        },
        popAnswer(state) {
            state.answers.pop();
        },
        addVerticalSliderDetails(state, details) {
            state.verticalSliderDetails.push(details)
        }
    }
})

export default store
