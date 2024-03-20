# gents a singel -o output file param and an input file both .md

# uses argparese, the reads in the file, and stores the file itself. and the relative path to the file, because the input file will have relative links in it that this program will resolve recursively

# in the files we look for [{(file path)}] tags on the same line, adn will include that file

from os import path
from argparse import ArgumentParser


def merge(relative_path: str, file_name: str):

    full_file = ""

    with open(file_name, 'r') as file:
        for line in file:
            # the [{(file path)}] tag garanteed to be on an entire line
            line = line.strip()
            if line.startswith("[{(") and line.endswith(")}]"):
                # remove the tag
                file_path = line[3:-3].strip()
                # resolve the path
                file_path = path.join(relative_path, file_path)
                # recursively call this function
                merged = merge(path.dirname(file_path), file_path)
                full_file += merged + "\n"

            else:
                full_file += line + "\n"

    return full_file[:-1]


if __name__ == '__main__':
    parser = ArgumentParser(description="Merge markdown files")
    parser.add_argument("input", help="Input file")
    parser.add_argument(
        "-o", "--output", help="Output file", default="output.md")
    args = parser.parse_args()
    with open(args.output, 'w') as file:
        file.write(merge(path.dirname(args.input), args.input))
