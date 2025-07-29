from opencc import OpenCC
import os

skips = ["node_modules", "public", "cht_replace"]
replaces = {
	"utclc.github.io":"utclc.github.io/cht",
	"zh-CN":"zh-TW",
	"扩展":"拓展",
	"本地化":"在地化",
	"“":"「",
	"”":"」",
	"【":"「",
	"】":"」"
}
replaces_after = {
	"請在此處輸入文字":"請在此處輸入文本"
}

def readcht(directory):
	if (not os.path.exists(directory) or not os.path.isfile(directory)):
		return ""
	with open(directory, "r", encoding="utf-8") as f:
		return f.read()

def convert(directory):
	for dirfile in os.listdir(directory):
		path = os.path.join(directory, dirfile)
		check = dirfile.startswith(".") or dirfile.endswith(".py") or dirfile in skips
		for skip in skips:
			if (skip in path):
				check = True
		if (check):
			continue
		if (os.path.isdir(path)):
			convert(path)
			continue
		with open(path, "r+", encoding="utf-8") as f:
			print("Converting " + path)
			content = readcht(path)
			if (content == ""):
				try:
					content = f.read()
					for replace in replaces.keys():
						content = content.replace(replace, replaces[replace])
					content = cc.convert(content)
					for replace in replaces_after.keys():
						content = content.replace(replace, replaces_after[replace])
					f.seek(0)
					f.write(content)
				except:
					print("Error converting " + path)
			else:
				f.write(content)

cc = OpenCC("s2twp.json")
directory = "."
convert(directory)