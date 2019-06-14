var vueLevelOne = new Vue({
  el: "#vue-app",
  data: {
    alphabet: [],
    letter: null,
    utterance: null,
    choices: []
  },
  created: function() {
    this.alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
    this.generateQuestion()
  },
  methods: {
    generateQuestion: function() {
      this.letter = this.alphabet[Math.floor(Math.random()*this.alphabet.length)]
      this.choices.push(this.letter)
      var newChoice
      for (var i=0; i<2; i++) {
        do {
          newChoice = this.alphabet[Math.floor(Math.random()*this.alphabet.length)]
        } while (this.choices.indexOf(newChoice)!=-1)
        this.choices.push(newChoice)
      }
      this.shuffleArray(this.choices)
      this.utterance = new SpeechSynthesisUtterance(this.letter)
    },
    shuffleArray: function(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    },
    verifyChoice: function(choice) {
      console.log(this.letter)
      console.log(choice)
      if (this.letter == choice) {
        alert('Correct!')
        window.location.href = '/level/1'
      } else {
        alert('Wrong!')
      }
    },
    sayLetter: function() {
      if (this.utterance !== null) {
        window.speechSynthesis.speak(this.utterance)
      }
    }
  }
})
