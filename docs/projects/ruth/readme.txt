	==============================
	= Ruth - Ruby Under The Hood =
	=       version 0.8.0        =
	==============================

Release date: 2002-02-07
Available from: http://www.sf.net/projects/rubyvm
Author: Robert Feldt, feldt@ce.chalmers.se

What is it?
-----------
Ruby extension giving classes and functions to access Ruby internals.
Currently includes:

 * ruth/mri, Ruby::Interpreter.parse 
    Gives a tree representing the internal parse tree used to execute
    a Ruby program.
 * ruth/mri, Ruby::Interpreter.method_body
    Returns the tree for the body of a method.

And a painfully incomplete:

 * ruth/parser, Ruby.parse
    Parse Ruby source code into an abstract syntax tree. Currently uses
    RubySchema from Mathieu Bouchard's MetaRuby project to represent the AST's.
    Its a cheato-RubyInRuby parser since it looks like one but actually
    uses MRI's parser and then simply transforms the output. Advantage of this
    is that it parses exactly the same programs as MRI parses (since it uses
    the same parser). Disadvantage is that it relies on C code, isn't 
    customizable etc.

Why?
----
To learn about MRI (Matz Ruby Interpreter) internals its good to be able to dump and view its internal representation.

To write tools that work with Ruby source code its good to have a parser.

Installation?
-------------
1. unpack tarball (if you haven't already)
2. ruby helpers/make.rb
3. ruby helpers/install.rb

Example of use?
---------------
require 'ruth/mri'
puts(Ruth::Interpreter.parse("1").inspect)

which will output

Newline(
 1,
 Lit(1)
)

Requirements?
-------------
ANSI C compiler and Ruby. 

I've successfully compiled and used Ruth with Ruby 1.7.1 (2001-09-20) and 
cygwin 1.1.8 (gcc version 2.95.2-5 19991024) on Windows 2000 Professional 
Workstation. 

Ruth has also been successfully used on:
- Ruby 1.6.5 on Linux (gcc 2.91.66)
- Ruby 1.7.1 (2002-01-10) on Linux (gcc ditto)

If it works for you on other platforms/setups I'd appreciate if 
you drop me a note. However, it should work on most Ruby-enabled platforms 
having a C compiler.

NOTE THAT THIS IS AN EARLY RELEASE SO THERE WILL LIKELY BE BUGS. I've only
used a small subset of all the methods in my own projects...

Documentation?
--------------
None yet.

License and legal issues?
-------------------------
All files in this package are coyrighted free software

Copyright (c) 2001, 2002 Robert Feldt, feldt@ce.chalmers.se.
All rights reserved.

and they are distributed under LGPL. See LICENSE. 

Acknowledgements for ruth/mri should go to Dave Thomas and Andy Hunt since I've basically generalized their NodeDump extension. Maybe this invalidates my copyright? (Please inform me if this is so and how I should fix it; I just want to get it right. I sure do not want to take credit for things I didn't come up with...)

Special things to note?
-----------------------
Most of this package is highly implementation specific. If matz changes the
internals of the interpreter things might stop working. Beware!

Their might be safety issues with accessing the internals...

Plans for the future?
---------------------
See TODO. This is an alpha release so there might be (some) changes 
to the interface.

Do you have comments or questions?
----------------------------------
I'd appreciate if you drop me a note if you're successfully using 
Ruth. If there are some known users I'll be more motivated to 
packing up additions / new versions and post them to RAA.

Happy coding!

Robert Feldt, feldt@ce.chalmers.se

