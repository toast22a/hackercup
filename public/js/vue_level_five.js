var vueLevelFive = new Vue({
  el: "#vue-app",
  data: {
    prompt: null,
    question: null,
    answer: null,
    guess: null,
    successCount: 0
  },
  created: function() {
    this.generateQuestion()
  },
  methods: {
    generateQuestion: function() {
      if (this.successCount >= 3) {
        window.location.href = '/'
        return
      }
      axios.get('/question/5')
      .then((response)=>{
        this.prompt = response.data.prompt
        this.question = response.data.choices
        this.answer = response.data.answer
        this.guess = ""
      })
      .catch((error)=>{
        console.log(error)
      })
    },
    verifyChoice: function() {
      var correctIcon = document.getElementById("correct-icon")
      var wrongIcon = document.getElementById("wrong-icon")
      correctIcon.style.display = "none"
      wrongIcon.style.display = "none"
      if (this.answer.toLowerCase() == this.guess.toLowerCase()) {
        this.successCount += 1
        var fieldset = document.getElementById("guess-fieldset")
        fieldset.disabled = true
        correctIcon.style.display = "block"
        setTimeout(()=>{
          correctIcon.style.display = "none"
          this.generateQuestion()
          fieldset.disabled = false
        }, 2000)
      } else {
        wrongIcon.style.display = "block"
        setTimeout(()=>{
          wrongIcon.style.display = "none"
        }, 2000)
      }
    }
  }
})
