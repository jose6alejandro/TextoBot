%{
#include "token.h"

int contar_linea = 1;

%}

ESPACIO    		[ \t]
NUEVALINEA		[ \n]
DIGITO     		[0-9]
ENTERO    		(0|[1-9]{DIGITO}*)
LETRA     		[A-Za-z]
IDENTIFICADOR 	(_|{LETRA})({DIGITO}|{LETRA}|_)*

%%
{ESPACIO}    		{}
{NUEVALINEA}		{ contar_linea++; }
{ENTERO}    		{ return TOKEN_ENTERO; }
":"          		{ return TOKEN_DOBLEPUNTO; }
"="          		{ return TOKEN_ASIGNAR; }
"+"          		{ return TOKEN_SUMA; }
"-"        		    { return TOKEN_RESTA; }
"*"          		{ return TOKEN_MULTIPLICACION; }
"/"         		{ return TOKEN_DIVISION; }
"=="         		{ return TOKEN_IGUALDAD; }
"!="         		{ return TOKEN_DISTINTO_DE; }
"("                 { return TOKEN_IZQ_PAREN; }
")"                 { return TOKEN_DER_PAREN; }
"&&"         		{ return TOKEN_CONJUNCION; }
"||"				{ return TOKEN_DISYUNCION; }
"AVANZAR"     		{ return TOKEN_AVANZAR; }
"RETROCEDER"   		{ return TOKEN_RETROCEDER; }
"GIRAR_IZQ"     	{ return TOKEN_GIRAR_IZQ; }
"GIRAR_DER"     	{ return TOKEN_GIRAR_DER; }
"ENCENDER_LED" 	 	{ return TOKEN_ENCENDER_LED; }
"APAGAR_LED"    	{ return TOKEN_APAGAR_LED; }
"REPETIR" 			{ return TOKEN_REPETIR; }
"FIN_REPETIR" 		{ return TOKEN_FIN_REPETIR; }
"SI"				{ return TOKEN_SI; }
"FIN_SI"			{ return TOKEN_FIN_SI; }
"PROCEDIMIENTO"		{ return TOKEN_PROCEDIMIENTO; }
"FIN_PROCEDIMIENTO"	{ return TOKEN_FIN_PROCEDIMIENTO; }
{IDENTIFICADOR} 	{ return TOKEN_IDENTIFICADOR; }
. 		 	 		{ printf("Unexpected token in line %d\n", contar_linea); }
%%

int yywrap() { return 1; }


