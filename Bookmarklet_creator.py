i = "Bookmarklet"
o = "script"



with open(f"{i}.js", "r") as f:
    script = f.read()

string = "javascript: "
for char in script:
    if char == "\n":
        pass
    else:
        string += char

with open(f"{o}.js", "w") as f:
    f.write(string)