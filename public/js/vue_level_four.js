var vueLevelFour = new Vue({
  el: "#vue-app",
  data: {
    prompt: null,
    choices: [],
    chosen: [],
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
        window.location.href = '/level/5'
        return
      }
      axios.get('/question/4')
      .then((response)=>{
        this.prompt = response.data.prompt
        this.choices = this.prompt.split(" ")
        this.shuffleArray(this.choices)
        this.chosen = []
        this.answer = response.data.answer
        this.utterance = new SpeechSynthesisUtterance(this.prompt)
      })
      .catch((error)=>{
        console.log(error)
      })
    },
    verifyChoice: function(choice) {
      this.chosen.push(this.choices.splice(this.choices.indexOf(choice), 1)[0])
      if (this.choices.length > 0) return

      var correctIcon = document.getElementById("correct-icon")
      var wrongIcon = document.getElementById("wrong-icon")
      correctIcon.style.display = "none"
      wrongIcon.style.display = "none"
      if (this.answer == this.chosen.join(" ")) {
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
    unverifyChoice: function(choice) {
      this.choices.push(this.chosen.splice(this.chosen.indexOf(choice), 1)[0])
    },
    shuffleArray: function(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    },
    sayLetter: function() {
      if (this.utterance !== null) {
        window.speechSynthesis.speak(this.utterance)
      }
    }
  }
})
