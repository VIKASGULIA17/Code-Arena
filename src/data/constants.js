export const LANGUAGE_VERSIONS = {
  python: "3.10.0",
  javascript: "18.15.0",
  typescript: "5.0.3",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
  cpp: "10.2.0",
};

export const CODE_SNIPPETS = {
  javascript: `
function greet(name) {
\tconsole.log("Hello, " + name + "!");
}

greet("Alex");
`,
  typescript: `
type Params = {
\tname: string;
}

function greet(data: Params) {
\tconsole.log("Hello, " + data.name + "!");
}

greet({ name: "Alex" });
`,
  python: `
def greet(name):
\tprint("Hello, " + name + "!")

greet("Alex")
`,
  java: `
public class HelloWorld {
\tpublic static void main(String[] args) {
\t\tSystem.out.println("Hello World");
\t}
}
`,
  csharp: `
using System;

namespace HelloWorld
{
\tclass Hello { 
\t\tstatic void Main(string[] args) {
\t\t\tConsole.WriteLine("Hello World in C#");
\t\t}
\t}
}
`,
  php: `
<?php

$name = 'Alex';
echo $name;
`,
  cpp: `
#include <iostream>

int main() {
\tstd::cout << "Hello World" << std::endl;
\treturn 0;
}
`
};