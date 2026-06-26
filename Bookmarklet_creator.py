with open("time_difference.js", "r") as f:
    script = f.read()

string = "javascript: "
for char in script:
    if char == "\n":
        pass
    else:
        string += char

with open("Bookmarklet_2.js", "w") as f:
    f.write(string)