// garb dom items from index + store in variables
const main = document.querySelector('main')
const voicesSelect = document.getElementById('voices')
const textarea = document.getElementById('text')
const readBtn = document.getElementById('read')
const toggleBtn = document.getElementById('toggle')
const closeBtn = document.getElementById('close')

const data = [
    {
        image: './img/drink.jpg',
        text: "I'm Thirsty"
    },

    {
        image: './img/food.jpg',
        text: "I'm Hungry"
    },

    {
        image: './img/tired.jpg',
        text: "I'm Tired"
    },

    {
        image: './img/hurt.jpg',
        text: "I'm Hurt"
    },

    {
        image: './img/happy.jpg',
        text: "I'm Happy"
    },

    {
        image: './img/angry.jpg',
        text: "I'm Angry"
    },

    {
        image: './img/sad.jpg',
        text: "I'm Sad"
    },

    {
        image: './img/scared.jpg',
        text: "I'm Scared"
    },
    {
        image: './img/outside.jpg',
        text: 'I Want To Go Outside'
    },

    {
        image: './img/home.jpg',
        text: 'I Want To Go Home'
    },

    {
        image: './img/school.jpg',
        text: 'I Want To Go To School'
    },

    {
        image: './img/grandma.jpg',
        text: 'I Want To Go To Grandmas'
    }
]

// Add objects from the data array to the DOM + display
data.forEach(createBox)

// Create Item Box
function createBox(item) {
    const box = document.createElement('div')

    const {image, text} = item

    box.classList.add('box')

    box.innerHTML = `
        <img src = "${image}" alt = "${text}" />
        <p class = "info">${text}</p>
    `

    // add speak event
    box.addEventListener('click', () => {
        setTextMessage(text)
        speakText()

        // Add active effect on box
        box.classList.add('active')
        setTimeout(()=> box.classList.remove('active'),800)
    })

    // dsiplay box on the page
    main.appendChild(box)
}

// Init Speech synth utterance
const message = new SpeechSynthesisUtterance()

// Get Voices
let voices = []

function getVoices() {
    voices = speechSynthesis.getVoices()

    voices.forEach(voice => {
        const option = document.createElement('option')

        option.value = voice.name
        
        option.innerText = `
        ${voice.name} ${voice.lang}
        `

        voicesSelect.appendChild(option)
    })
}

// set text
function setTextMessage (text) {
    message.text = text
}

// set voice
function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value)
}

// speak text
function speakText() {
    speechSynthesis.speak(message)
}

// Speech Change
speechSynthesis.addEventListener('voiceschanged', getVoices)

// Toggle text box
toggleBtn.addEventListener('click', () => {
    document.getElementById('textbox').classList.toggle('show')
})

// Close text box
closeBtn.addEventListener('click', () => {
    document.getElementById('textbox').classList.remove('show')
})

// Change voices using option select dropdown
voicesSelect.addEventListener('change', setVoice)

// Call getVoices function
getVoices()