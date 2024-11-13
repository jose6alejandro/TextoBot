CXX = g++
FLEX = flex
BISON = bison  --defines=token.h

all: interpreter

interpreter: parser.o scanner.o main.o ast.o
	$(CXX) scanner.o parser.o main.o ast.o -o interpreter

parser.o: parser.c
	$(CXX) -c -I. parser.c

parser.c: parser.bison
	$(BISON) -v --output parser.c parser.bison

scanner.o: token.h scanner.c
	$(CXX) -c scanner.c

scanner.c: scanner.flex
	$(FLEX) -o scanner.c scanner.flex

main.o: token.h main.c
	$(CXX) -c -I. main.c

ast.o: ast.hpp ast.cpp
	$(CXX) -c -I. ast.cpp

.PHONY:
clean:
	$(RM) *.o parser.c parser.output token.h scanner.c interpreter