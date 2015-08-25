from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
import simplejson as json

class Suggest(webapp.RequestHandler):
	_bookInfos = {
		"bm": [ #Biographies and Memoirs
			{"title": "The Last Lecture", "author1": "Randy Pausch", "author2": "Jeffrey Zaslow"},
			{"title": "Always Looking Up: The Adventures of an Incurable Optimist ", "author1": "Michael F. Fox", "author2": ""}
		],
		"ci": [ #Computer and Internet
			{"title": "ZK: Ajax without the Javascript Framework", "author1": "HenriChen", "author2": "Robbie Cheng"},
			{"title": "Beautiful Teams: Inspiring and Cautionary Tales", "author1": "Andrew Stellman", "author2": "Jennifer Greene"}
		],
		"lf": [ #lf: Literature and Fiction
			{"title": "The Shack", "author1": "William P. Young", "author2": ""},
			{"title": "Watchmen", "author1": "Alan Moore", "author2": "Dave Gibbons"},
			{"title": "Long Lost", "author1": "Harlan Coben", "author2": ""}
		]
	}

	def post(self):
		self.response.headers['Content-Type'] = 'text/plain;charset=UTF-8'
		self.response.out.write(json.dumps(self._bookInfos[self.request.get('categoryId')]))

	def get(self):
		self.post()

application = webapp.WSGIApplication(
	[('/suggest', Suggest)], debug=True)

def main():
	run_wsgi_app(application)

if __name__ == "__main__":
	main()
