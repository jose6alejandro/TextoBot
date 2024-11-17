#pragma once

#include <string>
#include <iostream>
#include <memory>
#include <vector>

class Expression
{
public:
    virtual ~Expression();

    virtual void destroy() noexcept = 0;

    virtual int eval() noexcept = 0;

    virtual std::string to_string() const noexcept = 0;

    virtual void translate(std::ostream&) const noexcept{}
};

class Value : public Expression
{
public:
    Value(int val) noexcept;

    void destroy() noexcept override;

    int eval() noexcept override;

    std::string to_string() const noexcept override;

private:
    int value;
};

class BinaryOperation : public Expression
{
public:
    BinaryOperation(Expression* e1, Expression* e2) noexcept;

    void destroy() noexcept override;

    std::string to_string() const noexcept override;

    virtual std::string operand_str() const noexcept = 0;


protected:
    Expression* left_expression;
    Expression* right_expression;
};

class Addition : public BinaryOperation
{
public:
    using BinaryOperation::BinaryOperation;

    int eval() noexcept override;

    std::string operand_str() const noexcept override;

};

class Subtraction : public BinaryOperation
{
public:
    using BinaryOperation::BinaryOperation;

    int eval() noexcept override;

    std::string operand_str() const noexcept override;


};

class Multiplication : public BinaryOperation
{
public:
    using BinaryOperation::BinaryOperation;

    int eval() noexcept override;

    std::string operand_str() const noexcept override;


};

class Division : public BinaryOperation
{
public:
    using BinaryOperation::BinaryOperation;

    int eval() noexcept override;

    std::string operand_str() const noexcept override;


};

class Equal : public BinaryOperation
{
public:
    using BinaryOperation::BinaryOperation;
    
    int eval() noexcept override;

    std::string operand_str() const noexcept override;



};

class NoEqual : public BinaryOperation
{
public:
    using BinaryOperation::BinaryOperation;
    
    int eval() noexcept override;

    std::string operand_str() const noexcept override;



};

class AndOperator : public BinaryOperation
{
public:
    using BinaryOperation::BinaryOperation;
    
    int eval() noexcept override;

    std::string operand_str() const noexcept override;



};

class OrOperator : public BinaryOperation
{
public:
    using BinaryOperation::BinaryOperation;
    
    int eval() noexcept override;

    std::string operand_str() const noexcept override;


};

class Command : public Expression
{
public:
    Command(std::string val) noexcept;

    void destroy() noexcept override;

    int eval() noexcept override;

    std::string to_string() const noexcept override;

    void translate(std::ostream&) const noexcept override;

private:
    std::string command;
};


class While : public Expression {
public:
    While(Expression* e, std::vector<Expression*> s) noexcept;
    
    void destroy() noexcept override;

    int eval() noexcept override;
    
    std::string to_string() const noexcept override;

    void translate(std::ostream&) const noexcept override;

private:
    Expression* expresion;
    std::vector<Expression*> sentencia;
};

class If : public Expression {
public:
    If(Expression* e, std::vector<Expression*> s) noexcept;
    
    void destroy() noexcept override;

    int eval() noexcept override;
    
    std::string to_string() const noexcept override;

    void translate(std::ostream&) const noexcept override;

private:
    Expression* expresion;
    std::vector<Expression*> sentencia;
};




