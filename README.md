# Parsing Ruby

This project is an attempt to distill the history of efforts relating to parsing the Ruby programming language over time. That includes various implementations of Ruby (`MRI`, `YARV`, `Rubinius`, `JRuby`, `TruffleRuby`, etc.), gems that parse Ruby (`parser`, `ruby_parser`, `ripper`, etc.), as well as other projects that parse Ruby source for various reasons (`sorbet`, `tree-sitter`, `druby`, etc.).

Over time the community has developed a massive amount of projects whose goal is to understand Ruby source at a deeper level. This has resulted in myriad approaches to parsing, with various tradeoffs. They have all had to evolve with the language as new features have been proposed, created, and merged. Below is a timeline of this archaeological dig through history of parsing Ruby.

## Timeline

### Ruby versions

1994-01-07 - Ruby 0.06

1995-05-19 - Ruby 0.76

1995-12-21 - Ruby 0.95

1996-12-25 - Ruby 1.0-961225

1998-12-24 - Ruby 1.3.0
- `begin..rescue..else` clauses
- `<<-` indentable heredocs
- `::` method calls

1998-12-25 - Ruby 1.2.0
- Heredocs
- `=begin` to `=end`
- `true` and `false`
- `BEGIN` and `END`
- `%w` word lists
- Top-level constant access
- Block arguments
- `||=` and `&&=` operators

1999-08-13 - Ruby 1.4.0
- Binary number literals
- Anonymous `*` in method definitions
- Nested string interpolation
- Multibyte character identifiers

2000-09-19 - Ruby 1.6.0
- `rescue` modifier

2003-08-04 - Ruby 1.8.0
- `%W` word lists with interpolation
- Dynamic symbols
- `break` and `next` take values
- Nested class definition
- Nested constant assignment

2007-12-25 - Ruby 1.9.0
- `YARV`
- Block local variables
- Lambda literals
- Symbol hash keys
- [`ripper` merged](https://svn.ruby-lang.org/cgi-bin/viewvc.cgi?view=revision&revision=6891)

2009-01-30 - Ruby 1.9.1
- Encoding pragma
- `.()` sugar for `.call`
- Post arguments
- Block in block arguments

2011-10-31 - Ruby 1.9.3
- Trailing commas

2013-02-24 - Ruby 2.0.0
- [`Module#prepend`](https://bugs.ruby-lang.org/issues/1102)
- [Refinements](https://bugs.ruby-lang.org/issues/4085)
- [`%i` symbol lists](https://bugs.ruby-lang.org/issues/4985)
- [Keyword arguments](https://bugs.ruby-lang.org/issues/5474)

2013-12-25 - Ruby 2.1.0
- [Required keyword arguments](https://bugs.ruby-lang.org/issues/7701)
- [Rational and complex literals](https://bugs.ruby-lang.org/issues/8430)
- [Frozen string literal suffix](https://bugs.ruby-lang.org/issues/8579)

2014-12-25 - Ruby 2.2.0
- [Dynamic symbol hash keys](https://bugs.ruby-lang.org/issues/4276)

2015-12-25 - Ruby 2.3.0
- [frozen_string_literal pragma](https://bugs.ruby-lang.org/issues/8976)
- [`<<~` heredocs](https://bugs.ruby-lang.org/issues/9098)
- [`&.` operator](https://bugs.ruby-lang.org/issues/11537)

2016-12-25 - Ruby 2.4.0
- [Top level return](https://bugs.ruby-lang.org/issues/4840)
- [Refinements in `Symbol#to_proc`](https://bugs.ruby-lang.org/issues/9451)
- [Multiple assignment in a conditional](https://bugs.ruby-lang.org/issues/10617)

2017-12-25 - Ruby 2.5.0
- [`rescue` and `ensure` at the block level](https://bugs.ruby-lang.org/issues/12906)
- [Refinements in string interpolations](https://bugs.ruby-lang.org/issues/13812)

2018-12-25 - Ruby 2.6.0
- [Flip-flop (deprecated)](https://bugs.ruby-lang.org/issues/5400)
- [Endless range](https://bugs.ruby-lang.org/issues/12912)
- [Non-ASCII constant names](https://bugs.ruby-lang.org/issues/13770)
- [RubyVM::AbstractSyntaxTree](https://github.com/ruby/ruby/commit/0f3dcbdf38db6c7fb04ca0833bb1f9af2c3e7ca4)
- [Escape keywords from class/module scope removed](https://bugs.ruby-lang.org/issues/6354)

2019-12-25 - Ruby 2.7.0
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

2020-12-25 - Ruby 3.0.0
- [Keyword arguments (non-hash-based)](https://bugs.ruby-lang.org/issues/14183)
- [Single-line methods](https://bugs.ruby-lang.org/issues/16746)
- [Find pattern matching](https://bugs.ruby-lang.org/issues/16828)
- [shareable_constant_value pragma](https://bugs.ruby-lang.org/issues/17273)
- [`in` pattern matching](https://bugs.ruby-lang.org/issues/17371)

Future??
[Anonymous struct literal](https://bugs.ruby-lang.org/issues/16986)

### Projects

2001-01-10 - [Robert Feldt releases v0.0.1 of Ruth](https://sourceforge.net/projects/rubyvm/files/ruth/)
- Extends Ruby 1.6 internals to support inspecting Ruby ASTs

2001-10-20 - [Minero Aoki releases v0.0.1 of ripper](https://i.loveruby.net/archive/ripper/)

2002-10-09 - [Mathieu Bouchard releases v0.7.0 of MetaRuby](http://artengine.ca/matju/MetaRuby/)
- Includes `RubySchema.rb`, a schema for validating Ruby ASTs

2003-01-14 - [Yuya Kato releases v0.0.1 of bruby](http://bruby.osdn.jp/)
- Extends Ruby 1.6 internals to support dumping and loading a Ruby AST to a binary format

2004-11-10 - [Ryan Davis releases v1.0.0 of ParseTree](https://github.com/seattlerb/parsetree)
- Extends Ruby 1.8 internals to support returning an AST by converting to Ruby objects

2006-06-05 - [Dominik Bathon releases v0.1.0 of RubyNode](https://web.archive.org/web/20060630155424/http://rubynode.rubyforge.org/)
- Extends Ruby 1.8 internals to support returning an AST by wrapping the NODE struct

2007-11-14 - [Ryan Davis releases v1.0.0 of ruby_parser](https://github.com/seattlerb/ruby_parser)
- Uses a `racc`-based compiler to generate s-expressions

2009-07-25 - [Paul Brannan releases v0.5.0 of nodewrap](http://rubystuff.org/nodewrap/)
- Allows dumping/loading the Ruby nodes and instruction sequences to a binary format

2010-08-27 - [Michael Edgar releases v0.0.1 of laser](https://github.com/michaeledgar/laser)
- Originally parsed regular expressions then `Ripper` to parse Ruby
- Features a type system, semantic analysis, documentation generation, and a plugin system

2013-04-15 - [Peter Zotov releases v0.9.0 of parser](https://github.com/whitequark/parser)
- Derives a new parser from `parse.y` in Ruby and a lexer test suite from `ruby_parser`

## Standards

2011-03-22 - JIS X 3017

2012-04-15 - ISO/IEC 30170:2012

## Parsers

- [Cardinal](https://github.com/parrot/cardinal) - an implementation on the Parrot VM
- [IronRuby](http://www.wilcob.com/Wilco/IronRuby/microsoft_ironruby.aspx) - an implementation on the .NET framework
- [jruby](https://github.com/jruby/jruby) - an implementation on the JVM
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

## RIL

- [druby](http://www.cs.umd.edu/projects/PL/druby/) - type system
- [rtc](https://www.cs.tufts.edu/~jfoster/papers/oops13.pdf) - type system
- [rubydust](http://www.cs.umd.edu/~mwh/papers/rubydust.pdf) - type system

## JRuby

- [Ecstatic](https://projekter.aau.dk/projekter/files/61071016/1181807983.pdf) - type system
