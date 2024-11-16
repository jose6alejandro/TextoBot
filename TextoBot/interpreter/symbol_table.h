#pragma once

#include <string>
#include <unordered_map>

#include "ast.hpp"

class IdTable : public std::unordered_map<int, std::string>
{
public:
    using Base = std::unordered_map<int, std::string>;
    using Base::Base;

    const std::string* search(int idx) const noexcept
    {
        auto it = Base::find(idx);

        if (it == Base::end())
        {
            return nullptr;
        }

        return &it->second;
    }

    std::pair<int, std::string> add_id(const std::string& id) noexcept
    {
        
        int current_index = index++;
        return *Base::emplace(current_index++, id).first;    
    }

private:
    int index{0};
};

class SymbolTable : public std::unordered_map<std::string, Expression*>
{
public:
    using Base = std::unordered_map<std::string, Expression*>;
    using Base::Base;

    Expression* search(const std::string& name) const noexcept
    {
        auto it = Base::find(name);
        
        if (it == Base::end())
        {
            return nullptr;
        }

        return it->second;
    }

    Expression* add_var(const std::string& name, Expression* p) noexcept
    {
        Base::emplace(name, p);
        return p;
    }

    void rm_var(const std::string& name) noexcept
    {
        auto it = Base::find(name);

        if (it != Base::end())
        {
            Base::erase(it);
        }
    }
    void print() const {
        for (const auto& pair : *this) {
            std::cout << "Clave: " << pair.first << std::endl;
        }
    }
};

extern IdTable id_table;
extern SymbolTable var_table;
extern SymbolTable prop_table;