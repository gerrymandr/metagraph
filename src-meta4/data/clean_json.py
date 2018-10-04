import sys
import json
import pathlib


def main(filename):
    with open(filename) as f:
        document = json.load(f)

    for node in document["nodes"]:
        del node["html_rep"]

    with open(filename, "w") as f:
        json.dump(document, f)


def from_directory(directory):
    path = pathlib.Path(directory)
    for file in path.iterdir():
        print(file)

        with file.open() as f:
            root = json.load(f)

        def recursive_delete(node):
            if "html_rep" in node:
                del node["html_rep"]
            if "children" in node:
                for child in node["children"]:
                    recursive_delete(child)
            return True

        recursive_delete(root)

        with file.open(mode="w") as f:
            json.dump(root, f)


if __name__ == "__main__":
    if sys.argv[1] == "-d":
        directory = sys.argv[2]
        from_directory(directory)
    else:
        filename = sys.argv[1]
        main(filename)
