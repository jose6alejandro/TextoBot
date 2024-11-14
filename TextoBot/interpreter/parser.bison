%{
#include <stdio.h>
#include <ast.hpp>
#include <vector>
#include <iostream>
#define YYSTYPE Expression*

extern int yylex();
extern char* yytext;
int yyerror(const char*);
char op;
Expression* parser_result{nullptr};

void eval_body(std::vector<Expression*> body_vector);
std::vector<Expression*> body_vector;
std::vector<std::vector<Expression*>> scope;
%}

%token TOKEN_ENTERO
%token TOKEN_ASIGNAR
%token TOKEN_DOBLEPUNTO
%token TOKEN_SUMA
%token TOKEN_RESTA
%token TOKEN_MULTIPLICACION
%token TOKEN_DIVISION
%token TOKEN_IGUALDAD
%token TOKEN_CONJUNCION
%token TOKEN_DISYUNCION
%token TOKEN_AVANZAR
%token TOKEN_RETROCEDER
%token TOKEN_GIRAR_IZQ
%token TOKEN_GIRAR_DER
%token TOKEN_ENCENDER_LED
%token TOKEN_APAGAR_LED
%token TOKEN_REPETIR
%token TOKEN_FIN_REPETIR
%token TOKEN_SI
%token TOKEN_FIN_SI
%token TOKEN_PROCEDIMIENTO
%token TOKEN_FIN_PROCEDIMIENTO
%token TOKEN_IDENTIFICADOR
%token TOKEN_IZQ_PAREN
%token TOKEN_DER_PAREN
%token TOKEN_DISTINTO_DE
%% 

programa : body                                         {eval_body(scope.back());}

body:                                                   {scope.push_back(std::vector<Expression*>());} 
        | body sentencia                                {scope.back().push_back($2);}                       
        ;


sentencia: comando                                       
        | bucle 
        | condicional                                    
	    ;

expresion : factor TOKEN_SUMA factor 			        { $$ = new Addition($1, $3); } 
        | factor TOKEN_RESTA factor 			        { $$ = new Subtraction($1, $3); }
      	| factor TOKEN_MULTIPLICACION factor 	        { $$ = new Multiplication($1, $3); }
 	    | factor TOKEN_DIVISION factor 			        { $$ = new Division($1, $3); }
        | proposicion
        | comparador       
	    ;	

factor : TOKEN_ENTERO 					                { $$ = new Value(atoi(yytext)); }
      |  TOKEN_IZQ_PAREN expresion TOKEN_DER_PAREN	    { $$ = $2; }
      //| TOKEN_IDENTIFICADOR
      ;

proposicion : comparador TOKEN_CONJUNCION comparador    { $$ = new AndOperator($1, $3); } 
            | comparador TOKEN_DISYUNCION comparador    { $$ = new OrOperator($1, $3); } 
            | comparador TOKEN_CONJUNCION proposicion   { $$ = new AndOperator($1, $3); } 
            | comparador TOKEN_DISYUNCION proposicion   { $$ = new OrOperator($1, $3); } 
            ;

comparador: factor                                      { $$ = $1; }
        | factor TOKEN_IGUALDAD factor                  { $$ = new Equal($1, $3); } 
        | factor TOKEN_DISTINTO_DE factor               { $$ = new NoEqual($1, $3); } 
        ;

comando : TOKEN_AVANZAR                                 { $$ = new Command("AVANZAR"); }
        | TOKEN_RETROCEDER                              { $$ = new Command("RETROCEDER"); }           
        | TOKEN_GIRAR_IZQ                               { $$ = new Command("GIRAR_IZQ"); }
        | TOKEN_GIRAR_DER                               { $$ = new Command("GIRAR_DER"); }
        | TOKEN_ENCENDER_LED                            { $$ = new Command("ENCENDER_LED"); }       
        | TOKEN_APAGAR_LED                              { $$ = new Command("APAGAR_LED"); } 
        ;

bucle : TOKEN_REPETIR expresion TOKEN_DOBLEPUNTO body TOKEN_FIN_REPETIR {

            $$ = new While($2, scope.back());
            scope.pop_back();
        } 
        ; 
condicional : TOKEN_SI expresion  TOKEN_DOBLEPUNTO body TOKEN_FIN_SI{
 
            $$ = new If($2, scope.back());
            scope.pop_back();
        } 
        ; 

/*sentencia : asignacion sentencia
        | comando sentencia
        | bucle sentencia
        | condicional sentencia
        | procedimiento sentencia
        |
        ;

asignacion: TOKEN_IDENTIFICADOR TOKEN_ASIGNAR expresion;

factor : TOKEN_IDENTIFICADOR
      | TOKEN_ENTERO
      | TOKEN_IZQ_PAREN expresion TOKEN_DER_PAREN
      ;

expresion : factor operador_aritmetico factor
         | proposicion
         | comparador
         ;

operador_aritmetico : TOKEN_SUMA
                   | TOKEN_RESTA
                   | TOKEN_MULTIPLICACION
                   | TOKEN_DIVISION
                   ;

proposicion : comparador TOKEN_CONJUNCION comparador
            | comparador TOKEN_DISYUNCION comparador
            | comparador TOKEN_CONJUNCION proposicion
            | comparador TOKEN_DISYUNCION proposicion
            ;

comparador: factor 
        | factor TOKEN_IGUALDAD factor
        | factor TOKEN_DISTINTO_DE factor
        ;        

comando : TOKEN_AVANZAR
        | TOKEN_RETROCEDER
        | TOKEN_GIRAR_IZQ
        | TOKEN_GIRAR_DER
        | TOKEN_ENCENDER_LED
        | TOKEN_APAGAR_LED
        | TOKEN_IDENTIFICADOR
        ;

bucle : TOKEN_REPETIR expresion TOKEN_DOBLEPUNTO sentencia TOKEN_FIN_REPETIR;

condicional : TOKEN_SI expresion  TOKEN_DOBLEPUNTO sentencia TOKEN_FIN_SI;

procedimiento : TOKEN_PROCEDIMIENTO TOKEN_IDENTIFICADOR TOKEN_DOBLEPUNTO sentencia TOKEN_FIN_PROCEDIMIENTO

*/
%%

int yyerror(const char* s)
{
    printf("Parse error: %s\n", s);
    return 1;
}

void eval_body(std::vector<Expression*> body_vector)
{
    for (Expression* expr : body_vector)
    {
        expr->translate(std::cout);
        
    }

}