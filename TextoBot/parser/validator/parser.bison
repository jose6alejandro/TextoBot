%{
#include <stdio.h>

extern int yylex();
int yyerror(const char*);
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

programa : sentencia;

sentencia : asignacion sentencia
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

expresion : factor
         | factor operador_aritmetico factor
         | proposicion
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

condicional : TOKEN_SI comparador TOKEN_DOBLEPUNTO sentencia TOKEN_FIN_SI
            | TOKEN_SI proposicion  TOKEN_DOBLEPUNTO sentencia TOKEN_FIN_SI;

procedimiento : TOKEN_PROCEDIMIENTO TOKEN_IDENTIFICADOR TOKEN_DOBLEPUNTO sentencia TOKEN_FIN_PROCEDIMIENTO
%%

int yyerror(const char* s)
{
    printf("Parse error: %s\n", s);
    return 1;
}