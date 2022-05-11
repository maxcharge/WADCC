import os
import json
import urllib
import webapp2
from google.appengine.ext.webapp import template

class MainPage(webapp2.RequestHandler):
    def get(self):
        template_values = {}
        path = os.path.join(os.path.dirname(__file__), 'index.html')
        self.response.out.write(template.render(path, template_values))

    def post(self):
        word = self.request.get('word')
        url = "http://api.dictionaryapi.dev/api/v2/entries/en/"+ word
        data = urllib.urlopen(url).read()
        data = json.loads(data)
        firstDef = data[0]['meanings'][0]['definitions'][0]["definition"]
        firstPos = data[0]['meanings'][0]['partOfSpeech']
        secDef = data[0]['meanings'][1]['definitions'][0]["definition"]
        secPos = data[0]['meanings'][1]['partOfSpeech']
        template_values = {
            "firstDef": firstDef,
            "firstPos": firstPos,
            "secDef": secDef,
            "secPos": secPos
        }
        path = os.path.join(os.path.dirname(__file__), 'results.html')
        self.response.out.write(template.render(path, template_values))
        
        
app = webapp2.WSGIApplication([('/', MainPage)], debug=True)