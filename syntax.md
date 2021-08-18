### Notes

rdoc
opal
truffleruby
jruby
rubinius
[topaz](https://github.com/topazproject/topaz)
mruby
[sorbet](https://sorbet.org/)
[druby](http://www.cs.umd.edu/projects/PL/druby/)
[rts](https://www.cs.tufts.edu/~jfoster/papers/oops13.pdf)
[ecstatic](https://projekter.aau.dk/projekter/files/61071016/1181807983.pdf)
[tree-sitter-ruby](https://github.com/tree-sitter/tree-sitter-ruby)

#### parser

[code-explorer]
[covered]
[dawnscanner]
[deep-cover]
[dependabot-core]
[erb-lint](https://github.com/Shopify/erb-lint) - lints .erb files
[fast]
[packwerk](https://github.com/Shopify/packwerk) - analyzes Ruby for modularity
[rdl](https://github.com/tupl-tufts/rdl)
[reek](https://github.com/troessner/reek) - analyzes Ruby for code smells
[rubocop](https://docs.rubocop.org/rubocop)
[rubrowser](https://github.com/emad-elsaid/rubrowser) - renders a force-directed graph of module relationships
[ruby-lint](https://github.com/YorickPeterse/ruby-lint)
[ruby-next]
[ruby_detective]
[rubycritic](https://github.com/whitesmith/rubycritic) - wraps other static analysis tools to give code quality reports
[seeing_is_believing]
[solargraph]
[standard](https://github.com/testdouble/standard)
[steep](https://github.com/soutaro/steep)
[typed.rb]
[unparser]
[vernacular]
[visualize_ruby]
[yoda](https://github.com/tomoasleep/yoda) - static analyzer and language server for Ruby

#### ruby_parser

[dawnscanner]
[debride]
[fasterer]
[flay]
[flog]
[quality]
[railroader](https://github.com/david-a-wheeler/railroader) - static security analyzer
[roodi]

#### ripper

[rufo](https://github.com/ruby-formatter/rufo) - a formatter for Ruby code
[sandi_meter](https://github.com/makaroni4/sandi_meter) - analyzes Ruby code for violations of Sandi Metz's four rules
[yard](https://github.com/lsegal/yard)

### Timeline

1995-12-21 - Ruby 0.95

1996-12-25 - Ruby 1.0

1998-12-?? - Ruby 1.2

1999-08-?? - Ruby 1.4

2000-09-?? - Ruby 1.6

2001-01-10 - [Robert Feldt releases v0.0.1 of Ruth](https://sourceforge.net/projects/rubyvm/files/ruth/)
- Extends Ruby 1.6 internals to support inspecting Ruby ASTs

2001-10-20 - [Minero Aoki releases v0.0.1 of ripper](https://i.loveruby.net/archive/ripper/)

2002-03-01 - Ruby 1.6.7

2002-10-09 - [Mathieu Bouchard releases v0.7.0 of MetaRuby](http://artengine.ca/matju/MetaRuby/)
- Includes `RubySchema.rb`, a schema for validating Ruby ASTs

2003-01-14 - [Yuya Kato releases v0.0.1 of bruby](http://bruby.osdn.jp/)
- Extends Ruby 1.6 internals to support dumping and loading a Ruby AST to a binary format

2003-08-04 - Ruby 1.8.0

2004-11-10 - [Ryan Davis releases v1.0.0 of ParseTree](https://github.com/seattlerb/parsetree)
- Extends Ruby 1.8 internals to support returning an AST by converting to Ruby objects

2005-10-23 - [Zev Blut releases v0.1.0 of saikuro](https://metricfu.github.io/Saikuro)
- Uses `irb/ruby-lex` to analyze Ruby code for for cyclomatic complexity

2006-06-05 - [Dominik Bathon releases v0.1.0 of RubyNode](https://web.archive.org/web/20060630155424/http://rubynode.rubyforge.org/)
- Extends Ruby 1.8 internals to support returning an AST by wrapping the NODE struct

2007-08-01 - [Ryan Davis releases v1.0.1 of flog](https://github.com/seattlerb/flog)
- Uses `ParseTree` to determine how difficult code is to read

2007-11-14 - [Ryan Davis releases v1.0.0 of ruby_parser](https://github.com/seattlerb/ruby_parser)
- Uses a `racc`-based compiler to generate s-expressions

2007-12-25 - Ruby 1.9.0
- `YARV`
- block local variables
- lambda literal syntax
- new hash key syntax
- `Ripper` merged in as standard library

2008-11-06 - [Ryan Davis releases v1.0.0 of flay](https://github.com/seattlerb/flay)
- Uses `ruby_parser` to analyze code for structural similarities

2009-07-25 - [Paul Brannan releases v0.5.0 of nodewrap](http://rubystuff.org/nodewrap/)]
- Allows dumping/loading the Ruby nodes and instruction sequences to a binary format

2010-08-27 - [Michael Edgar releases v0.0.1 of laser](https://github.com/michaeledgar/laser)
- Originally named Wool
- Originally parsed with regular expressions to determine style violations
- Eventually switched over to using `Ripper` to parse Ruby
- Features a type system, semantic analysis, documentation generation, and a plugin system

2011-05-?? - [Michael Edgar publishes senior thesis on laser](https://digitalcommons.dartmouth.edu/cgi/viewcontent.cgi?article=1071&context=senior_theses)

2011-03-22 - JIS X 3017

2011-10-31 - Ruby 1.9.3

2012-02-14 - [Josep Bach releases v0.0.1 of pelusa](https://github.com/codegram/pelusa)
- Uses `Rubinius` to perform basic linting

2012-03-24 - [Xavier Shay releases v1.1.0 of cane](https://github.com/square/cane)
- Uses `Ripper` to determine assignment, branch, conditional metrics

2012-04-?? - ISO/IEC 30170:2012

2013-02-24 - Ruby 2.0.0
- keyword arguments
- `Module#prepend`
- `%i` symbol array literals

2013-04-15 - [Peter Zotov releases v0.9.0 of parser](https://github.com/whitequark/parser)
- Derives a new parser from `parse.y` in Ruby and a lexer test suite from `ruby_parser`

2013-12-25 - Ruby 2.1.0

2014-12-25 - Ruby 2.2.0

2015-02-23 - [Damir Svrtan releases v0.1.0 of fasterer](https://github.com/DamirSvrtan/fasterer)
- Uses `ruby_parser` to check for various code paths that can be made faster

2015-12-25 - Ruby 2.3.0
- `# frozen_string_literal: true`
- `&.` operator

2016-10-10 - [Soutaro Matsumoto releases v0.1.0 of querly](https://github.com/soutaro/querly)
- Uses the `parser` gem to find method calls with configured rules

2016-12-25 - Ruby 2.4.0

2017-12-25 - Ruby 2.5.0
- `rescue` and `ensure` at the block and method level

2018-12-25 - Ruby 2.6.0
- `RubyVM::AbstractSyntaxTree`

2019-12-25 - Ruby 2.7.0

2020-12-25 - Ruby 3.0.0
