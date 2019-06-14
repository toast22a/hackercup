var vueLevelOne = new Vue({
  el: "#vue-app",
  data: {
    prompt: null,
    choices: [],
    answer: null,
    utterance: null,
    successCount: 0
  },
  created: function() {
    this.generateQuestion()
  },
  methods: {
    generateQuestion: function() {
      if (this.successCount >= 3) {
        window.location.href = '/level/2'
        return
      }
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
        this.successCount += 1
        var buttons = document.getElementsByTagName("button")
        for (var i=0; i<buttons.length; i++) {
          buttons[i].disabled = true
        }
        correctIcon.style.display = "block"
        setTimeout(()=>{
          correctIcon.style.display = "none"
          this.generateQuestion()
          for (var i=0; i<buttons.length; i++) {
            buttons[i].disabled = false
          }
        }, 2000)
      } else {
        wrongIcon.style.display = "block"
        setTimeout(()=>{
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
