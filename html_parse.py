from html.parser import HTMLParser

class MyParser(HTMLParser):
	def handle_starttag(self, tag, attrs):
		print(tag)
		for attr, value in attrs:
			print(f"-> {attr} > {value}")

html = """
<head>
<title>HTML</title>
</head>
<object type="application/x-flash" data="your-file.swf" width="0" height="0">
<param name="quality" value="high"/>
</object>
"""

parser = MyParser()
parser.feed(html)