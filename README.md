# Parsing Ruby

This project is an attempt to distill the history of efforts relating to parsing the Ruby programming language over time. That includes various implementations of Ruby (`MRI`, `YARV`, `Rubinius`, `JRuby`, `TruffleRuby`, etc.), gems that parse Ruby (`parser`, `ruby_parser`, `ripper`, etc.), as well as other projects that parse Ruby source for various reasons (`sorbet`, `tree-sitter`, `druby`, etc.).

Over time the community has developed a massive amount of projects whose goal is to understand Ruby source at a deeper level. This has resulted in myriad approaches to parsing, with various tradeoffs. They have all had to evolve with the language as new features have been proposed, created, and merged. Below is a timeline of this archaeological dig through history of parsing Ruby.

## Timeline

### Ruby versions

**1994-01-07 - Ruby 0.06**

This is the earliest [changelog entry](https://cache.ruby-lang.org/pub/ruby/1.0/ChangeLog-pre-alpha) that I could find that had an explicit version on it. At this point Ruby was still a very early idea and the syntax was changing rapidly.

**1995-05-19 - Ruby 0.76**

The changelog here is still entirely Yukihiro Matsumoto. It's been a year since the last entry on this timeline and a ton has changed. Th choice of including `0.76` is somewhat arbitrary here. It's just that [https://cache.ruby-lang.org](https://cache.ruby-lang.org) happens to have a tar file containing that particular release.

- [EBNF](docs/ebnf/0.76.txt)
- [Diagram](docs/diagrams/0.76.xhtml)

**1995-12-21 - Ruby 0.95**

This is also somewhat arbitrary, but the cache has an entry for it so I'm including it here. Technically the last pre-1.0 release was `0.99.4-961224`. Between this release and `1.0-961225`, it's mostly cleanup and preparation. At this point there are some other contributors, including Jun Kuroda and Hirofumi Watanabe.

- [EBNF](docs/ebnf/0.95.txt)
- [Diagram](docs/diagrams/0.95.xhtml)

**1996-12-25 - Ruby 1.0-961225**

This is the first public `1.0` release.

- [EBNF](docs/ebnf/1.0.961225.txt)
- [Diagram](docs/diagrams/1.0.961225.xhtml)

**1998-12-24 - Ruby 1.3.0**

This is considered a "development" release, and is meant to be used as a branch for the core developers and not used in production. It is released one day before the "stable" `1.2.0` version. It includes a couple of syntactic additions that are then used for development over the course of the next year before they are included in the `1.4.0` stable version. They are:

- *`begin..rescue..else..end` clauses*  
`rescue` already existed, but this provided support for the `else` keyword in this chain in the case that no exception was raised
- *`<<-` indentable heredocs*  
heredocs already existed, but you always had to put the ending at the beginning of the line; this change allowed the endings to be indented to the same indentation as the code
- *`::` method calls*  
effectively an alias for the `.` operator, there was a convention for a while to call class-level methods with `::`

**1998-12-25 - Ruby 1.2.0**

This is a "stable" release, and is meant for production. It's the first stable release since `1.0` was released exactly 2 years prior. A lot of new syntax was introduced in those two years, many of which form the foundation of the kind of Ruby that was see today. This includes:

- *heredocs*  
easily one of the most difficult-to-parse syntax constructs gets introduced
- *`=begin` to `=end`*  
multi-line comments now were easier to manage
- *`true` and `false`*  
these keywords didn't actually exist before this point
- *`BEGIN` and `END`*  
borrowing from awk, this syntax was very useful for scripts
- *`%w` word lists*  
here we start to see the beginning of the `%`-lists syntax
- *top-level constant access*  
you could now prefix a constant with `::` from within a nested scope to access a top-level constant
- *block arguments*  
arguments that were themselves blocks would now resolve
- *`||=` and `&&=` operators*  
this further extended the assignment operators with `||` and `&&` support

**1999-08-13 - Ruby 1.4.0**

This is another stable release that follows a little less than a year after `1.2.0`.

- [EBNF](docs/ebnf/1.4.0.txt)
- [Diagram](docs/diagrams/1.4.0.xhtml)

Not a huge amount changes with regard to syntax between the two versions, though there are lots of changes elsewhere in the codebase. The changes that were included were:

- *binary number literals*  
you can now write number literals with the `0b` prefix
- *anonymous `*` in method definitions*  
you now don't need to put an explicit name on splat arguments in method definitions
- *nested string interpolation*  
you used to not be able to do string interpolation within string interplation, but that was fixed here
- *multibyte character identifiers*  
there are now explicit multibyte character identifiers - this is more work toward supporting different encodings, but we won't truly get there until `1.9`

**2000-09-19 - Ruby 1.6.0**

A little over a year has passed since `1.4.0`, which means it's time for another stable release.

- [EBNF](docs/ebnf/1.6.0.txt)
- [Diagram](docs/diagrams/1.6.0.xhtml)

Only one thing really changed with the syntax between the two versions, which is that `rescue` can now be used in the modifier form like the conditionals and loops.

**2003-08-04 - Ruby 1.8.0**

A lot happens between `1.6` and `1.8`. 

- [EBNF](docs/ebnf/1.8.0.txt)
- [Diagram](docs/diagrams/1.8.0.xhtml)

- *`%W` word lists with interpolation*
- *dynamic symbols*
- *`break` and `next` take values*
- *nested class definition*
- *nested constant assignment*

**2007-12-25 - Ruby 1.9.0**

- [EBNF](docs/ebnf/1.9.0.txt)
- [Diagram](docs/diagrams/1.9.0.xhtml)

- `YARV`
- Block local variables
- Lambda literals
- Symbol hash keys
- [`ripper` merged](https://svn.ruby-lang.org/cgi-bin/viewvc.cgi?view=revision&revision=6891)

**2009-01-30 - Ruby 1.9.1**

- [EBNF](docs/ebnf/1.9.1.txt)
- [Diagram](docs/diagrams/1.9.1.xhtml)

- *encoding pragma*
- `.()` sugar for `.call`
- *post arguments*
- *block in block arguments*

**2011-10-31 - Ruby 1.9.3**

- [EBNF](docs/ebnf/1.9.3.txt)
- [Diagram](docs/diagrams/1.9.3.xhtml)

- *trailing commas*

**2013-02-24 - Ruby 2.0.0**

- [EBNF](docs/ebnf/2.0.0.txt)
- [Diagram](docs/diagrams/2.0.0.xhtml)

- [`Module#prepend`](https://bugs.ruby-lang.org/issues/1102)
- [Refinements](https://bugs.ruby-lang.org/issues/4085)
- [`%i` symbol lists](https://bugs.ruby-lang.org/issues/4985)
- [Keyword arguments](https://bugs.ruby-lang.org/issues/5474)

**2013-12-25 - Ruby 2.1.0**

- [EBNF](docs/ebnf/2.1.0.txt)
- [Diagram](docs/diagrams/2.1.0.xhtml)


- [Required keyword arguments](https://bugs.ruby-lang.org/issues/7701)
- [Rational and complex literals](https://bugs.ruby-lang.org/issues/8430)
- [Frozen string literal suffix](https://bugs.ruby-lang.org/issues/8579)

**2014-12-25 - Ruby 2.2.0**

- [EBNF](docs/ebnf/2.2.0.txt)
- [Diagram](docs/diagrams/2.2.0.xhtml)

- [Dynamic symbol hash keys](https://bugs.ruby-lang.org/issues/4276)

**2015-12-25 - Ruby 2.3.0**

- [EBNF](docs/ebnf/2.3.0.txt)
- [Diagram](docs/diagrams/2.3.0.xhtml)

- [frozen_string_literal pragma](https://bugs.ruby-lang.org/issues/8976)
- [`<<~` heredocs](https://bugs.ruby-lang.org/issues/9098)
- [`&.` operator](https://bugs.ruby-lang.org/issues/11537)

**2016-12-25 - Ruby 2.4.0**

- [EBNF](docs/ebnf/2.4.0.txt)
- [Diagram](docs/diagrams/2.4.0.xhtml)

- [Top level return](https://bugs.ruby-lang.org/issues/4840)
- [Refinements in `Symbol#to_proc`](https://bugs.ruby-lang.org/issues/9451)
- [Multiple assignment in a conditional](https://bugs.ruby-lang.org/issues/10617)

**2017-12-25 - Ruby 2.5.0**

- [EBNF](docs/ebnf/2.5.0.txt)
- [Diagram](docs/diagrams/2.5.0.xhtml)

- [`rescue` and `ensure` at the block level](https://bugs.ruby-lang.org/issues/12906)
- [Refinements in string interpolations](https://bugs.ruby-lang.org/issues/13812)

**2018-12-25 - Ruby 2.6.0**

- [EBNF](docs/ebnf/2.6.0.txt)
- [Diagram](docs/diagrams/2.6.0.xhtml)

- [Flip-flop (deprecated)](https://bugs.ruby-lang.org/issues/5400)
- [Endless range](https://bugs.ruby-lang.org/issues/12912)
- [Non-ASCII constant names](https://bugs.ruby-lang.org/issues/13770)
- [RubyVM::AbstractSyntaxTree](https://github.com/ruby/ruby/commit/0f3dcbdf38db6c7fb04ca0833bb1f9af2c3e7ca4)
- [Escape keywords from class/module scope removed](https://bugs.ruby-lang.org/issues/6354)

**2019-12-25 - Ruby 2.7.0**

- [EBNF](docs/ebnf/2.7.0.txt)
- [Diagram](docs/diagrams/2.7.0.xhtml)

- [Flip-flop (undeprecated)](https://bugs.ruby-lang.org/issues/5400)
- [Method reference operator (added)](https://bugs.ruby-lang.org/issues/13581)
- [Keyword arguments (warning about hash-based)](https://bugs.ruby-lang.org/issues/14183)
- [No other keywords syntax](https://bugs.ruby-lang.org/issues/14183)
- [Beginless range](https://bugs.ruby-lang.org/issues/14799)
- [Pattern matching](https://bugs.ruby-lang.org/issues/14912)
- [Numbered parameters](https://bugs.ruby-lang.org/issues/15723)
- [Rightward assignment](https://bugs.ruby-lang.org/issues/15921)
- [Argument forwarding](https://bugs.ruby-lang.org/issues/16253)
- [Method reference operator (removed)](https://bugs.ruby-lang.org/issues/16275)

**2020-12-25 - Ruby 3.0.0**

- [EBNF](docs/ebnf/3.0.0.txt)
- [Diagram](docs/diagrams/3.0.0.xhtml)

- [Keyword arguments (non-hash-based)](https://bugs.ruby-lang.org/issues/14183)
- [Single-line methods](https://bugs.ruby-lang.org/issues/16746)
- [Find pattern matching](https://bugs.ruby-lang.org/issues/16828)
- [shareable_constant_value pragma](https://bugs.ruby-lang.org/issues/17273)
- [`in` pattern matching](https://bugs.ruby-lang.org/issues/17371)

### Projects

**2001-01-10 - [Robert Feldt releases v0.0.1 of Ruth](https://sourceforge.net/projects/rubyvm/files/ruth/)**

- Extends Ruby 1.6 internals to support inspecting Ruby ASTs

**2001-10-20 - [Minero Aoki releases v0.0.1 of ripper](https://i.loveruby.net/archive/ripper/)**

**2002-10-09 - [Mathieu Bouchard releases v0.7.0 of MetaRuby](http://artengine.ca/matju/MetaRuby/)**

- Includes `RubySchema.rb`, a schema for validating Ruby ASTs

**2003-01-14 - [Yuya Kato releases v0.0.1 of bruby](http://bruby.osdn.jp/)**

- Extends Ruby 1.6 internals to support dumping and loading a Ruby AST to a binary format

**2004-11-10 - [Ryan Davis releases v1.0.0 of ParseTree](https://github.com/seattlerb/parsetree)**

- Extends Ruby 1.8 internals to support returning an AST by converting to Ruby objects

**2006-06-05 - [Dominik Bathon releases v0.1.0 of RubyNode](https://web.archive.org/web/20060630155424/http://rubynode.rubyforge.org/)**

- Extends Ruby 1.8 internals to support returning an AST by wrapping the NODE struct

**2007-11-14 - [Ryan Davis releases v1.0.0 of ruby_parser](https://github.com/seattlerb/ruby_parser)**

- Uses a `racc`-based compiler to generate s-expressions

**2009-07-25 - [Paul Brannan releases v0.5.0 of nodewrap](http://rubystuff.org/nodewrap/)**

- Allows dumping/loading the Ruby nodes and instruction sequences to a binary format

**2010-08-27 - [Michael Edgar releases v0.0.1 of laser](https://github.com/michaeledgar/laser)**

- Originally parsed regular expressions then `Ripper` to parse Ruby
- Features a type system, semantic analysis, documentation generation, and a plugin system

**2013-04-15 - [Peter Zotov releases v0.9.0 of parser](https://github.com/whitequark/parser)**

- Derives a new parser from `parse.y` in Ruby and a lexer test suite from `ruby_parser`

## Standards

**2011-03-22 - JIS X 3017**

**2012-04-15 - ISO/IEC 30170:2012**

## Parsers

- [Cardinal](https://github.com/parrot/cardinal) - an implementation on the Parrot VM
- [IronRuby](http://www.wilcob.com/Wilco/IronRuby/microsoft_ironruby.aspx) - an implementation on the .NET framework
- [JRuby](https://github.com/jruby/jruby) - an implementation on the JVM
- [MacRuby](http://macruby.org/) - an implementation for objective-c
- [melbourne](https://github.com/carlosbrando/melbourne) - Rubinius's parser as a gem
- [mruby](https://github.com/mruby/mruby) - an embeddable implementation
- [rdoc](https://github.com/ruby/rdoc) - documentation generator
- [RIL](http://www.cs.umd.edu/projects/PL/druby/papers/druby-dls09.pdf) - an intermediate language
- [rubinius](https://github.com/rubinius/rubinius) - an implementation in Ruby
- [saikuro](https://metricfu.github.io/Saikuro) - cyclomatic complexity linter
- [sorbet](https://sorbet.org/) - type system
- [sydparse](https://rubygems.org/gems/sydparse) - a reentrant Ruby parser
- [topaz](https://github.com/topazproject/topaz) - an implementation for RPython
- [tree-sitter-ruby](https://github.com/tree-sitter/tree-sitter-ruby) - a parser aimed at editors
- [TruffleRuby](https://github.com/oracle/truffleruby) - an implementation on the GraalVM
- [typedruby](https://github.com/typedruby/typedruby) - type system

## Projects using existing parsers

### parser

- [covered](https://github.com/ioquatix/covered) - code coverage reporter
- [deep-cover](https://github.com/deep-cover/deep-cover) - code coverage reporter
- [erb-lint](https://github.com/Shopify/erb-lint) - ERB file linter
- [fast](https://github.com/jonatas/fast) - AST editor
- [opal](https://github.com/opal/opal) - Ruby to JavaScript transpiler
- [packwerk](https://github.com/Shopify/packwerk) - encapsulation analyzer
- [querly](https://github.com/soutaro/querly) - method call finder
- [rdl](https://github.com/tupl-tufts/rdl) - type checker
- [reek](https://github.com/troessner/reek) - code smell analyzer
- [rubocop](https://github.com/rubocop/rubocop) - linter
- [rubrowser](https://github.com/emad-elsaid/rubrowser) - module relationship grapher
- [ruby-lint](https://github.com/YorickPeterse/ruby-lint) - linter
- [ruby-next](https://github.com/ruby-next/ruby-next) - transpiler and polyfill
- [ruby_detective](https://github.com/victor-am/ruby_detective) - module relationship grapher
- [rubycritic](https://github.com/whitesmith/rubycritic) - code quality reporter
- [seeing_is_believing](https://github.com/JoshCheek/seeing_is_believing) - editor intermediate value display
- [standard](https://github.com/testdouble/standard) - a rubocop wrapper with fewer options
- [steep](https://github.com/soutaro/steep) - static type checker
- [unparser](https://github.com/mbj/unparser) - code generation from the parser AST
- [vernacular](https://github.com/kddnewton/vernacular) - source code manipulation
- [yoda](https://github.com/tomoasleep/yoda) - static analyzer and language server

### ruby_parser

- [dawnscanner](https://github.com/thesp0nge/dawnscanner) - security analyzer
- [debride](https://github.com/seattlerb/debride) - unused code analyzer
- [fasterer](https://github.com/DamirSvrtan/fasterer) - performance linter
- [flay](https://github.com/seattlerb/flay) - code similarity analyzer
- [flog](https://github.com/seattlerb/flog) - code understandability analyzer
- [railroader](https://github.com/david-a-wheeler/railroader) - static security analyzer
- [roodi](https://github.com/roodi/roodi) - linter

### ripper

- [cane](https://github.com/square/cane) - linter
- [language_server-ruby](https://github.com/mtsmfm/language_server-ruby) - language server
- [prettier](https://github.com/prettier/plugin-ruby) - formatter
- [rubyfmt](https://github.com/penelopezone/rubyfmt) - formatter
- [rufo](https://github.com/ruby-formatter/rufo) - formatter
- [sandi_meter](https://github.com/makaroni4/sandi_meter) - linter
- [yard](https://github.com/lsegal/yard) - documentation generator

### RubyVM::AbstractSyntaxTree

- [solargraph](https://github.com/castwide/solargraph) - language server

### tree-sitter

- [vscode-ruby](https://github.com/rubyide/vscode-ruby) - language server

### Rubinius

- [pelusa](https://github.com/codegram/pelusa) - linter

### RIL

- [druby](http://www.cs.umd.edu/projects/PL/druby/) - type system
- [rtc](https://www.cs.tufts.edu/~jfoster/papers/oops13.pdf) - type system
- [rubydust](http://www.cs.umd.edu/~mwh/papers/rubydust.pdf) - type system

### JRuby

- [Ecstatic](https://projekter.aau.dk/projekter/files/61071016/1181807983.pdf) - type system

## Potential future syntax

- [Anonymous struct literal](https://bugs.ruby-lang.org/issues/16986)
