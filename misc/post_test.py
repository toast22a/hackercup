import requests as req
from bs4 import BeautifulSoup

POST_URL = 'http://www.cse.iitd.ac.in/nlpdemo/ques_gen'

soup = BeautifulSoup(req.post(POST_URL, data={
    'input_text':'''Cars came into global use during the 20th century, and
    developed economies depend on them. The year 1886 is regarded as the birth
    year of the modern car when German inventor Karl Benz patented his Benz
    Patent-Motorwagen. Cars became widely available in the early 20th century.
    One of the first cars accessible to the masses was the 1908 Model T, an
    American car manufactured by the Ford Motor Company. Cars were rapidly
    adopted in the US, where they replaced animal-drawn carriages and carts,
    but took much longer to be accepted in Western Europe and other parts of
    the world.''',
    'submit_btn':'Submit'
}).text, 'html.parser')
print(soup.select('p')[3].text[10:])
