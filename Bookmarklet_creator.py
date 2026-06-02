with open("script.js", "r") as f:
    script = f.read()

string = "javascript: "
for char in script:
    if char == "\n":
        pass
    else:
        string += char

with open("Bookmarklet.js", "w") as f:
    f.write(string)