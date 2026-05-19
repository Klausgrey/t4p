class Balance:
	def __init__(self):
		self.stack_history = []
		self.stack_forward = []
		self.current = None

	def visit(self, url):
		self.stack_history.append(self.current)
		self.stack_forward = []
		self.current = url
		pass

	def back(self):
		self.stack_forward.append(self.current)
		self.current = self.stack_history.pop()

	def forward(self):
		self.stack_history.append(self.current)
		self.current = self.stack_forward.pop()

	def current_page(self):
		return self.current




browser = Balance()
browser.visit("google.com")
browser.visit("youtube.com")
browser.visit("twitter.com")
print(browser.current_page())   # twitter.com
browser.back()
print(browser.current_page())   # youtube.com
browser.back()
print(browser.current_page())   # google.com
browser.forward()
print(browser.current_page())   # youtube.com