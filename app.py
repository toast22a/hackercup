from flask import Flask, render_template, abort
import json
import pickle
import random

class CustomFlask(Flask):
    jinja_options = Flask.jinja_options.copy()
    jinja_options.update(dict(
        variable_start_string='[[',
        variable_end_string=']]',
    ))

Flask = CustomFlask

app = Flask(__name__,
        template_folder='views',
        static_folder='public',
        static_url_path='')

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

with open('data/data.pkl', 'rb') as f:
    data = pickle.load(f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/level/1')
def level_one():
    return render_template('level_one.html')

@app.route('/level/2')
def level_two():
    return render_template('level_two.html')

@app.route('/level/3')
def level_three():
    return render_template('level_three.html')

@app.route('/level/4')
def level_four():
    return render_template('level_four.html')

@app.route('/level/5')
def level_five():
    return render_template('level_five.html')

@app.route('/question/<level>')
def get_question(level):
    try:
        level = int(level)
        question = random.choice([q for q in data if q.level == level])
    except ValueError:
        return abort(500)
    return json.dumps({
            'level': question.level,
            'prompt': question.prompt,
            'choices': question.choices,
            'answer': question.answer
    })

if __name__ == "__main__":
    app.run()
