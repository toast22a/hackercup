var vueLevelOne = new Vue({
  el: "#vue-app",
  data: {
    prompt: null,
    choices: [],
    answer: null,
    utterance: null
  },
  created: function() {
    this.generateQuestion()
  },
  methods: {
    generateQuestion: function() {
      axios.get('/question/1')
      .then((response)=>{
        this.prompt = response.data.prompt
        this.choices = response.data.choices
        this.answer = response.data.answer
        this.utterance = new SpeechSynthesisUtterance(this.prompt)
      })
      .catch((error)=>{
        console.log(error)
      })
    },
    verifyChoice: function(choice) {
      var correctIcon = document.getElementById("correct-icon")
      var wrongIcon = document.getElementById("wrong-icon")
      correctIcon.style.display = "none"
      wrongIcon.style.display = "none"
      if (this.answer == choice) {
        var buttons = document.getElementsByTagName("button")
        for (var i=0; i<buttons.length; i++) {
          buttons[i].disabled = true
        }
        correctIcon.style.display = "block"
        setTimeout(function() {
          window.location.href = "/level/1"
        }, 2000)
      } else {
        wrongIcon.style.display = "block"
        setTimeout(function() {
          wrongIcon.style.display = "none"
        }, 2000)
      }
    },
    sayLetter: function() {
      if (this.utterance !== null) {
        window.speechSynthesis.speak(this.utterance)
      }
    }
  }
})
