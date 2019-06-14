import pickle

class Question:
    def __init__(self, level, prompt, choices, answer):
        self.level = level
        self.prompt = prompt
        self.choices = choices
        self.answer = answer
                        
    def __repr__(self):
        return "Level: {} | Prompt: {} | Choices: {} | Answer: {}".format(self.level,
            self.prompt,
            self.choices,
            self.answer)

with open('data.pkl', 'rb') as f:
    data = pickle.load(f)

print(data[0])
