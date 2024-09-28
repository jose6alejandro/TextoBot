#pragma once

typedef enum
{
    TOKEN_EOF = 0,

    TOKEN_AVANZAR = 258,
    TOKEN_RETROCEDER = 259,
    TOKEN_GIRAR_IZQ = 260,
    TOKEN_GIRAR_DER = 261,  
    TOKEN_ENCENDER_LED = 262,  
    TOKEN_APAGAR_LED = 263,  
    TOKEN_DOBLEPUNTO = 264,
    TOKEN_IDENTIFICADOR = 265,
    TOKEN_REPETIR = 266,
    TOKEN_FIN_REPETIR = 267,
    TOKEN_ENTERO = 268,
    TOKEN_SI = 269, 
    TOKEN_FIN_SI = 270,
    TOKEN_ASIGNAR = 271,
    TOKEN_SUMA = 272,
    TOKEN_RESTA = 273,
    TOKEN_MULTIPLICACION = 274,
    TOKEN_DIVISION = 275,
    TOKEN_IGUALDAD = 276,
    TOKEN_CONJUNCION = 277,
    TOKEN_DISYUNCION = 278,
    TOKEN_PROCEDIMIENTO = 279,
    TOKEN_FIN_PROCEDIMIENTO = 280,
    TOKEN_IZQ_PAREN = 281,
    TOKEN_DER_PAREN = 282,

}
token_t;

inline const char* to_str(token_t t)
{
    switch (t)
    {
        case TOKEN_AVANZAR: return "AVANZAR";
        case TOKEN_RETROCEDER: return "RETROCEDER";
        case TOKEN_GIRAR_IZQ: return "GIRAR_IZQ";
        case TOKEN_GIRAR_DER: return "GIRAR_DER";
        case TOKEN_ENCENDER_LED: return "ENCENDER_LED";
        case TOKEN_APAGAR_LED: return "APAGAR_LED";
        case TOKEN_DOBLEPUNTO: return "DOBLEPUNTO";
        case TOKEN_IDENTIFICADOR: return "IDENTIFICADOR";
        case TOKEN_REPETIR: return "REPETIR";
        case TOKEN_FIN_REPETIR: return "FIN_REPETIR";
        case TOKEN_ENTERO: return "ENTERO";
        case TOKEN_SI: return "SI";  
        case TOKEN_FIN_SI: return "FIN_SI";  
        case TOKEN_ASIGNAR: return "ASIGNAR"; 
        case TOKEN_SUMA: return "SUMA"; 
        case TOKEN_RESTA: return "RESTA"; 
        case TOKEN_MULTIPLICACION: return "MULTIPLICACION"; 
        case TOKEN_DIVISION: return "DIVISION"; 
        case TOKEN_IGUALDAD: return "IGUALDAD"; 
        case TOKEN_CONJUNCION: return "CONJUNCION"; 
        case TOKEN_DISYUNCION: return "DISYUNCION"; 
        case TOKEN_PROCEDIMIENTO: return "PROCEDIMIENTO";
        case TOKEN_FIN_PROCEDIMIENTO: return "FIN_PROCEDIMIENTO";
        case TOKEN_IZQ_PAREN: return "IZQ_PAREN";
        case TOKEN_DER_PAREN: return "DER_PAREN";
    }
}