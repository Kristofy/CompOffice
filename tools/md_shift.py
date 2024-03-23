# this is a small project to read in a markdown file provided in the input and output it with the headers shifted down by to provided positive amount


import argparse
import os
import re
import sys


custom_headers = {
    1: lambda x: f'# {x}\n',
    2: lambda x: f'## {x}\n',
    3: lambda x: f'### {x}\n',
    4: lambda x: f'\n**{x.strip()}**  \n',
    5: lambda x: f'\n__**{x.strip()}**__  \n',
}


def main(file, shift, out_file):

    with open(file, 'r') as f:
        lines = f.readlines()

    with open(out_file, 'w') as f:
        for line in lines:

            if line.lstrip().startswith('#'):
                header = re.search(r'^#+', line.lstrip()).group()
                line = line.lstrip()[len(header):].lstrip()
                f.write(
                    custom_headers[min(5, len(header) + shift)](line))

            else:
                f.write(line)


if __name__ == '__main__':

    parser = argparse.ArgumentParser(
        description='Shift the headers in a markdown file down by a specified amount')
    parser.add_argument('input', help='The input markdown file')
    parser.add_argument('output', help='The output markdown file')
    parser.add_argument('shift', type=int,
                        help='The amount to shift the headers down by')

    args = parser.parse_args()

    if not os.path.exists(args.input):
        print('Input file does not exist')
        sys.exit(1)

    main(args.input, args.shift, args.output)
