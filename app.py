from flask import Flask, render_template

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

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/level/1")
def level_one():
    return render_template('level_one.html')

if __name__ == "__main__":
    app.run()
