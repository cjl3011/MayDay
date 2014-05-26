# auther: Loveice
# coding: utf-8
# file: pyinfer.py
# for my friend lastmayday:)
"""
Basic type checking

"""

import sys
from src.typed_ast.typed_ast import *



def main(argv):
    tree = TypedAST(argv[0])
    tree.print_errors()


def usage():
    print("Usage:")
    print("python pyinfer.py filename")

if __name__ == "__main__":
    if len(sys.argv) <= 1:
        usage()
        sys.exit()

    main(sys.argv[1:])



