#include <ast.hpp>
#include <typeinfo>
#include <map>
using namespace std::literals;

Expression::~Expression() {}

Value::Value(int val) noexcept
    : value{val} {}

void Value::destroy() noexcept {}

int Value::eval() noexcept
{
    return value;
}

std::string Value::to_string() const noexcept
{
    return std::to_string(value);
}

BinaryOperation::BinaryOperation(Expression* e1, Expression* e2) noexcept
    : left_expression{e1}, right_expression{e2} {}

void BinaryOperation::destroy() noexcept
{
    
    left_expression->destroy();
    delete left_expression;
    left_expression = nullptr;
    right_expression->destroy();
    delete right_expression;
    right_expression = nullptr;
}


std::string BinaryOperation::to_string() const noexcept
{
    return "("s + left_expression->to_string() + operand_str() + right_expression->to_string() + ")"s;
}

int Addition::eval() noexcept
{
    return left_expression->eval() + right_expression->eval();
}

std::string Addition::operand_str() const noexcept
{
    return " + ";
}

int Subtraction::eval() noexcept
{
    return left_expression->eval() - right_expression->eval();
}

std::string Subtraction::operand_str() const noexcept
{
    return " - ";
}

int Multiplication::eval() noexcept
{
    return left_expression->eval() * right_expression->eval();
}

std::string Multiplication::operand_str() const noexcept
{
    return " * ";
}

int Division::eval() noexcept
{
    return left_expression->eval() / right_expression->eval();
}

std::string Division::operand_str() const noexcept
{
    return " / ";
}

int Equal::eval() noexcept
{
    return left_expression->eval() == right_expression->eval();
}

std::string Equal::operand_str() const noexcept
{
    return " == ";
}

int NoEqual::eval() noexcept
{
    return left_expression->eval() != right_expression->eval();
}

std::string NoEqual::operand_str() const noexcept
{
    return " != ";
}

int AndOperator::eval() noexcept
{
    return left_expression->eval() && right_expression->eval();
}

std::string AndOperator::operand_str() const noexcept
{
    return " && ";
}

int OrOperator::eval() noexcept
{
    return left_expression->eval() || right_expression->eval();
}

std::string OrOperator::operand_str() const noexcept
{
    return " || ";
}

Command::Command(std::string val) noexcept
    : command{val} {}

void Command::destroy() noexcept {}

int Command::eval() noexcept
{
    std::map<std::string, int> comandoMap;
    comandoMap["AVANZAR"] = 1111;
    comandoMap["RETROCEDER"] = 2222;
    comandoMap["GIRAR_IZQ"] = 3333;
    comandoMap["GIRAR_DER"] = 4444;
    comandoMap["ENCENDER_LED"] = 5555;
    comandoMap["APAGAR_LED"] = 6666;

    return comandoMap[command];
}

std::string Command::to_string() const noexcept
{
    return command;
}

void Command::translate(std::ostream& out) const noexcept
{
    out<<command << "\n";
}

While::While(Expression* e, std::vector<Expression*> s) noexcept
    : expresion{e}, sentencia{std::move(s)} {}

void While::destroy() noexcept {}

int While::eval() noexcept
{
    size_t tam = expresion->eval();
    
    for (size_t i = 0; i < tam; i++)
    {
        for (Expression* expr : sentencia)
        {
            
            std::cout<<expr->to_string()<<"\n";
            
        }
    }
    
    return 0;
}

void While::translate(std::ostream& out) const noexcept
{

    size_t tam = expresion->eval();
    
    for (size_t i = 0; i < tam; i++)
    {
        for (Expression* expr : sentencia)
        {
            
            expr->translate(out);
            
        }
    }    
}

std::string While::to_string() const noexcept
{
    std::string cadena = "";
    for (Expression* expr : sentencia)
        {
            
           cadena += expr->to_string();
            
        }
    return cadena;
}

If::If(Expression* e, std::vector<Expression*> s) noexcept
    : expresion{e}, sentencia{std::move(s)} {}

void If::destroy() noexcept {}

int If::eval() noexcept
{
    return 0;
}

void If::translate(std::ostream& out) const noexcept
{
    if (expresion->eval())
    { 
        for (Expression* expr : sentencia)
        {       
            expr->translate(out);        
        }
    }
}

std::string If::to_string() const noexcept
{
    std::string cadena = "";
    for (Expression* expr : sentencia)
        {
            
           cadena += expr->to_string();
            
        }
    return cadena;
}




