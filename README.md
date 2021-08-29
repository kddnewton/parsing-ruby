# Parsing Ruby

This project is an attempt to distill the history of efforts relating to parsing the Ruby programming language. That includes various implementations of Ruby (`MRI`, `YARV`, `Rubinius`, `JRuby`, `TruffleRuby`, etc.), gems that parse Ruby (`parser`, `ruby_parser`, `ripper`, etc.), as well as other projects that parse Ruby source for various reasons (`sorbet`, `tree-sitter`, `RIL`, etc.).

Over time the community has developed a massive amount of projects whose goal is to understand Ruby source at a deeper level. This has resulted in myriad approaches to parsing, with various tradeoffs. They have all had to evolve with the language as new features have been proposed, created, and merged. Below is a timeline of this archaeological dig through the history of parsing Ruby.

## Ruby versions

### 1994-01-07 - Ruby 0.06

This is the earliest [changelog entry](https://cache.ruby-lang.org/pub/ruby/1.0/ChangeLog-pre-alpha) that I could find that had an explicit version on it. At this point Ruby was still a very early idea and the syntax was changing rapidly.

#### ChangeLog

Fri Jan  7 15:23:20 1994  Yukihiro Matsumoto  (matz at nws119)

	* baseline - version 0.06.

### 1995-05-19 - Ruby 0.76

The changelog here is still entirely Yukihiro Matsumoto. It's been a year since the last entry on this timeline and a ton has changed. The choice of including `0.76` is somewhat arbitrary here. It's just that [https://cache.ruby-lang.org](https://cache.ruby-lang.org) happens to have a tar file containing that particular release.

There are some interesting things happening that are mentioned in the changelog below. `include` used to be a keyword, but there are a couple of keywords that at the moment are going through "methodization" which extracts them from the grammar and moves them into standard-library space. We can see here as well that hashes used to be called `Dict`. This was the version that included syntax for hash literals and array literals (array literals used to be initialized with braces, but that change here).

The ToDo file used to live in the root of the repository in these older versions. It's an interesting artifact, as it offers a window into Matz' thinking at the time. We can see in this version and many future versions he mentions heredocs (which do eventually get added before `1.0`) as well as a byte code interpreter (what would eventually become `YARV`).

#### Grammar

- [EBNF](docs/ebnf/0.76.txt)
- [Diagram](docs/diagrams/0.76.xhtml)

#### ChangeLog

Wed Apr 26 09:50:56 1995  Yukihiro Matsumoto  (matz@ix-02)

	* parse.y: イテレータブロックの変数宣言を`|'で括るようにした．これ
	  でイテレータ変数がない時は宣言そのものを省略できる．文法の変更は
	  久しぶりだ．
<!--- block arguments within pipes --->

Mon Mar  6 19:34:32 1995  Yukihiro Matsumoto  (matz@ix-02)

	* eval.c(inlcude): メソッド化．動的にモジュールをインクルードでき
	  るように．さらに任意のオブジェクトにもモジュールをインクルードで
	  きるメソッド `extend'も用意した．
<!--- include/extend modules dynamically --->

	* parse.y: 文法からincludeを削除．メソッド化．
<!--- remove include from the grammar --->

Tue Feb 28 15:35:10 1995  Yukihiro Matsumoto  (matz@ix-02)

	* parse.y: 配列，連想配列の最後に`,'をおけるように．
<!--- trailing commas in arrays and hashes --->

Fri Oct 14 13:22:18 1994  Yukihiro Matsumoto  (matz@ix-02)

	* version 0.52 released: ……なんてこったい.
<!--- what a mess --->

Thu Jul 14 11:18:07 1994  Yukihiro Matsumoto  (matz@ix-02)

	* parse.y: Dictを生成する構文を追加. こちらを{..}にした.
<!--- syntax for hash literals --->

	* parse.y: 配列を生成する構文を[..]に変更した. 過去のRubyスクリプ
	  トとの互換性が保てないが, Dictを生成する構文を導入するに当たり,
	  perl5に合わせて(意識して), 変更する時期は今しかないと考えた. 
	  *BACKWARD INCOMPATIBILITY*
<!--- syntax for array literals --->

#### ToDo

* format機能
* here document
* re-write regex code for speed
* byte code interpretor

### 1995-12-21 - Ruby 0.95

This is also somewhat arbitrary, but the cache has an entry for it so I'm including it here. Technically the last pre-1.0 release was `0.99.4-961224`. Between this release and `1.0-961225`, it's mostly cleanup and preparation. At this point there are some other contributors, including Jun Kuroda and Hirofumi Watanabe.

The changelog mentions some interesting syntax changes, including changing the `defined` keyword to include a `?` since this release now supports `?` and `!` at the end of method names. There's also an amusing anecdote about how the `rescue` keyword used to be misspelled but that this release fixed the typo. Also included are the `not` operator, dynamic superclasses, and optional parentheses on method definition arguments, to just name a few.

At this point in the ToDo file we get the addition of an item that says `hand written parser (recursive descent)`. While this one didn't end up being executed at any point (Ruby has stuck with the Bison parser generator the entire way through to today) it's a very interesting thought even with today's codebase.

#### Grammar

- [EBNF](docs/ebnf/0.95.txt)
- [Diagram](docs/diagrams/0.95.xhtml)

#### ChangeLog

Thu Nov  9 23:26:01 1995  Yukihiro Matsumoto  <matz@caelum.co.jp>

	* parse.y (f_arglist): メソッド定義の引数を括弧で括らなくても良い
	  ようにした．
<!--- method definition arguments optional parentheses --->

Wed Nov  8 00:17:51 1995  Yukihiro Matsumoto  <matz@caelum.co.jp>

	* parse.y: class文のsuperclass部を定数から式に拡張した．
<!--- superclass can be an expression instead of a constant --->

Fri Sep  8 14:18:51 1995  Yukihiro Matsumoto  <matz@caelum.co.jp>

	* ruby.texi: `!', `?'に対応してアップデート．
<!--- updated for ! and ? --->

	* parse.y: defined -> defined?

	* parse.y (yylex): 変数名の後ろに`?'も許す．述語メソッドの後ろに
	  `?'を追加する．
<!--- allow ? after a variable name --->

Thu Sep  7 20:01:33 1995  Yukihiro Matsumoto  <matz@caelum.co.jp>

	* parse.y: 変数名の後ろに`!'を許す．
<!--- allow ! after a variable name --->

Mon Aug  7 12:47:41 1995  Yukihiro Matsumoto  <matz@caelum.co.jp>

	* parse.y: resque -> rescue．恥ずかしいがtypoを残しておくわけには
	  いかないよなあ．なんで今まで気がつかなかったのか…．
<!--- rename resque to rescue --->

Wed Jun  7 11:58:12 1995  Yukihiro Matsumoto  <matz@ix-02>

	* parse.y: not演算子の追加．優先順位の低い`!'演算子．
<!--- not operator --->

#### ToDo

* Hand written parser(recursive decent)
* format機能
* here document
* re-write regex code for speed
* byte code interpretor

### 1996-12-25 - Ruby 1.0.961225

This is the first public `1.0` release, released on Christmas of 1996. A couple of things change here since our last entry, most of which include changes that take it from looking like C++ to looking more like the Ruby we know today. For example, the operator that indicates a superclass in a class declaration changes from `:` to `<`. Also, the `continue` keyword gets renamed to `next`. `rescue` also gets a boost in utility, as it can now capture the exception as a variable and can rescue multiple exceptions at once. There's also a very short-lived triple-quoted string that exists for about 2 weeks in the codebase before Matz removed it.

The todo file contains some interesting entries at this point. Beyond the `format` function that has been on the list for a while, the regex item now gains the "and copyright" suffix. There's also an entry for access control/packages. This is stil being discussed today, and various efforts have been made to accomplish this in Ruby-space outside of the runtime like [packwerk](https://github.com/Shopify/packwerk).

#### Grammar

- [EBNF](docs/ebnf/1.0.961225.txt)
- [Diagram](docs/diagrams/1.0.961225.xhtml)

#### ChangeLog

Thu Dec 12 00:41:17 1996  Yukihiro Matsumoto  <matz@caelum.co.jp>

	* parse.y (parse_string): """..."""はやはり無くすことにした

Thu Nov 28 00:59:54 1996  Yukihiro Matsumoto  <matz@caelum.co.jp>

	* version 0.99.3-961128

	* parse.y (parse_string): 3-quote styleの文字列(例:"""abc"d"e""")

Thu Aug 29 10:49:40 1996  Yukihiro Matsumoto  <matz@caelum.co.jp>

	* parse.y (expr): イテレータの新形式に「method do .. end」形式を採
	  用した．もちろん昔の形式も有効．
<!--- iterator format to do...end --->

Tue Aug 20 13:37:16 1996  Yukihiro Matsumoto  <matz@caelum.co.jp>

	* parse.y (primary): rescueの構文を変更(同定引数の追加，複数rescue)
<!--- rescue gets identification argument, multiple rescue --->

Thu Jul 25 12:15:04 1996  Yukihiro Matsumoto  <matz@caelum.co.jp>

	* parse.y: break/next/redo/retryのメソッド化．
<!--- break/next/redo/retry methodization --->

	* parse.y (primary): unless/untilの復活
<!--- bringing back unless/until --->

Wed May 22 19:48:42 1996  Yukihiro Matsumoto  <matz@caelum.co.jp>

	* parse.y (superclass): スーパークラスの指定子を`:'から`<'に変更．
<!--- superclass from : to < --->

Wed Mar 27 10:02:44 1996  Yukihiro Matsumoto  <matz@caelum.co.jp>

	* parse.y: 予約語の変更 continue -> next

#### ToDo

* パッケージまたは大域変数のアクセス制御
* format機能
* re-write regex code for speed and copyright

### 1997-12-25 - Ruby 1.0.971225

Following in what would eventually become quite a transition, Matz released a new version of Ruby on Christmas 1997. It's still `1.0` (this is not yet following semantic versioning) but the suffix has been updated to include the date.

There are a couple of interesting syntactical additions to the language during this time. Regular expressions get a couple of special flags that indicate the character encoding. Perhaps this is one of the best advantages of having this language be created outside of an English-speaking country: encoding was always at the forefront. While we wouldn't get great encoding support until `1.9`, even having the option at this point is a win.

#### ChangeLog

Mon Apr  7 11:36:16 1997  Yukihiro Matsumoto  <matz@caelum.co.jp>

	* parse.y (primary): syntax to access singleton class.

Thu Apr  3 02:12:31 1997  Yukihiro Matsumoto  <matz@caelum.co.jp>

	* parse.y (parse_regx): new option //[nes] to specify character
	  code for regexp literals.  Last specified code option is valid.

Tue Mar 25 14:08:43 1997  Yukihiro Matsumoto  <matz@caelum.co.jp>

	* parse.y (expr): alias $var1 $var2 makes alias of the global
	  variable. 

Fri Mar 14 14:36:28 1997  Yukihiro Matsumoto  <matz@caelum.co.jp>

	* parse.y (yylex): enables negative hex/octal numbers and `_' in
	  non-decimal numbers.

### 1998-12-24 - Ruby 1.3.0

This is considered a "development" release, and is meant to be used as a branch for the core developers and not used in production. It is released one day before the "stable" `1.2.0` version. It includes a couple of syntactic additions that are then used for development over the course of the next year before they are included in the `1.4.0` stable version. They are:

- *`begin..rescue..else..end` clauses*  
`rescue` already existed, but this provided support for the `else` keyword in this chain in the case that no exception was raised
- *`<<-` indentable heredocs*  
heredocs already existed, but you always had to put the ending at the beginning of the line; this change allowed the endings to be indented to the same indentation as the code
- *`::` method calls*  
effectively an alias for the `.` operator, there was a convention for a while to call class-level methods with `::`

Also interesting to note in this version are 2 new entries in the todo file. The first is "named" arguments (what would eventually become keyword arguments). Though the syntax isn't what ended up landing `:=` versus just `:`, it's still interesting to see the entry all of the way back here.

Worth noting is the `objectify interpreters` entry. While I can't speak to what this would actually look like, what it _could_ be in reference to would be an object that could be accessed from Ruby-space that would accept an AST as an argument and be able to execute the code on demand. Extending this idea to include a reentrant parser, and Matz is effectively referring to the Rubinius project which would be started a little less than a decade later.

#### ChangeLog

Thu Dec 24 00:17:00 1998  Yukihiro Matsumoto  <matz@netlab.co.jp>

	* parse.y (primary): enable expr::identifier as method
	  invocation.

Mon Dec  7 22:08:22 1998  Yukihiro Matsumoto  <matz@netlab.co.jp>

	* parse.y (primary): allows `def obj::foo; .. end'.

Sat Dec  5 23:27:23 1998  Yukihiro Matsumoto  <matz@netlab.co.jp>

	* parse.y (here_document): indentable here-doc delimiter by
	  `<<-'.  Proposed by Clemens <c.hintze@gmx.net>.  Thanks.

Mon Nov 16 23:26:29 1998  Yukihiro Matsumoto  <matz@netlab.co.jp>

	* parse.y (primary): exec else clause if no exception raised.

Wed Oct 14 00:18:33 1998  Yukihiro Matsumoto  <matz@netlab.co.jp>

	* parse.y (when_args): `when a, *b' style new syntax for array
	  expansion in `case'.

#### ToDo

* package or access control for global variables
* named arguments like foo(nation:="german").
* multiple return values, yield values.  maybe imcompatible
* objectify interpreters
* syntax tree -> bytecode ???

### 1998-12-25 - Ruby 1.2.0

This is a "stable" release, and is meant for production. It's the first stable release since `1.0` was released exactly 2 years prior. A lot of new syntax was introduced in those two years, many of which form the foundation of the kind of Ruby that was see today. Here are a couple of the standout entries:

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

You can see in the changelog that `__END__` is no longer a keyword with this release. Over time a lot of the keywords that we have today have flipped back and forth between being methods and being keywords, including `next` and `break` (for example).

#### Grammar

- [EBNF](docs/ebnf/1.2.1.txt)
- [Diagram](docs/diagrams/1.2.1.xhtml)

#### ChangeLog

Wed Jun 24 02:18:57 1998  Yukihiro Matsumoto  <matz@netlab.co.jp>

	* parse.y (mlhs): `((a,b)),c = [[1,2]],3' assigns a=1,b=2,c=3.

Tue Jun 23 11:46:16 1998  Yukihiro Matsumoto  <matz@netlab.co.jp>

	* parse.y (yylex): `&&=' and `||=' added.

Fri Jun 19 14:34:49 1998  Yukihiro Matsumoto  <matz@netlab.co.jp>

	* parse.y (mlhs): nested multiple assignment.

Wed Apr 15 01:22:56 1998  Yukihiro Matsumoto  <matz@netlab.co.jp>

	* parse.y (yylex): allow nested parenthesises.

Wed Mar  4 01:39:52 1998  Yukihiro Matsumoto  <matz@netlab.co.jp>

	* parse.y (block_arg): new syntax - block argument in the
	  calling arglist.

Thu Feb 26 17:22:13 1998  Yukihiro Matsumoto  <matz@netlab.co.jp>

	* parse.y (fname): convert reswords into symbols.

	* parse.y (reswords): reserved words are now embedded in the
 	  syntax (sigh).

	* parse.y: now reserved words can be method names safely.

Fri Feb 20 10:17:51 1998  Yukihiro Matsumoto  <matz@netlab.co.jp>

	* version 1.1b8 released.

	* parse.y (stmt): if/unless modifiers returns nil, if condition is 
	  not established.

Tue Feb 17 00:04:32 1998  Yukihiro Matsumoto  <matz@netlab.co.jp>

	* parse.y (yylex): new form `::Const' to see toplevel constants.

Tue Jan 20 15:19:59 1998  Yukihiro Matsumoto  <matz@netlab.co.jp>

	* parse.y (terms): quoted word list by %w(a b c).

Fri Dec 12 00:50:25 1997  Yukihiro Matsumoto  <matz@netlab.co.jp>

	* parse.y (expr): BEGIN/END built in the syntax.

Thu Oct  9 11:17:50 1997  Yukihiro Matsumoto  <matz@netlab.co.jp>

	* parse.y (nextc): script parsing will be terminated by __END__ at
 	  beginning of line.

	* eval.c (compile_error): `__END__' is no longer a keyword.

Tue Sep 30 10:27:39 1997  Yukihiro Matsumoto  <matz@netlab.co.jp>

	* parse.y: new keywords `true' and `false' added.

Wed Aug 27 11:32:42 1997  Yukihiro Matsumoto  <matz@netlab.co.jp>

	* version 1.1 alpha3 released.

	* parse.y (here_document): finally here document available now.

#### ToDo

* package or access control for global variables
* format

### 1999-08-13 - Ruby 1.4.0

This is another stable release that follows a little less than a year after `1.2.0`. Not a huge amount changes with regard to syntax between the two versions, though there are lots of changes elsewhere in the codebase. The changes that were included were:

- *binary number literals*  
you can now write number literals with the `0b` prefix
- *anonymous `*` in method definitions*  
you now don't need to put an explicit name on splat arguments in method definitions
- *nested string interpolation*  
you used to not be able to do string interpolation within string interplation, but that was fixed here
- *multibyte character identifiers*  
there are now explicit multibyte character identifiers - this is more work toward supporting different encodings, but we won't truly get there until `1.9`

The todo file got a lot longer in this version. Below is just a snippet that relates to parsing, but in reality there were multiple sections added. You can see entries that we already had like the packaging system, named arguments, and objectify interpreters. There are also some new entries like `class variable` (what ended up becoming `@@variable`), `method to retrieve argument information` (this could be referring to method calls, but I think it's referring to method parameters on the declaration, which would eventually become `Method#parameters`), and `compile time string concatenation` (which we eventually get where `"foo" "bar"` becomes `"foobar"`).

#### Grammar

- [EBNF](docs/ebnf/1.4.0.txt)
- [Diagram](docs/diagrams/1.4.0.xhtml)

#### ChangeLog

Thu Jun 24 19:11:29 1999  Yoshida Masato  <yoshidam@yoshidam.net>

	* parse.y (yylex): support multi-byte char identifiers.

Wed Jun 23 15:10:11 1999  Inaba Hiroto  <inaba@sdd.tokyo-sc.toshiba.co.jp>

	* parse.y (parse_regx): nested braces within #{} available.

Wed May 19 12:27:07 1999  Yukihiro Matsumoto  <matz@netlab.co.jp>

	* parse.y (f_rest_arg): allow just * for rest arg.

	* parse.y (mlhs_basic): allow * without formal argument.

Fri Feb  5 22:11:08 1999  EGUCHI Osamu  <eguchi@shizuokanet.ne.jp>

	* parse.y (yylex): binary literal support, like 0b01001.

	* parse.y (yylex): octal numbers can contain `_'s.

	* parse.y (yylex): now need at least one digit after prefix such
	  as 0x, or 0b.

	* bignum.c (rb_str2inum): recognize binary numbers like 0b0101.

#### ToDo

* compile time string concatenation, "hello" "world" => "helloworld"
* ../... outside condition invokes operator method too.
* %w(a\ b\ c abc) => ["a b c", "abc"]
* package or access control for global variables
* class variable (prefix?)
* named arguments like foo(nation:="german") or foo(nation: "german").
* method to retrieve argument information (need new C API)
* multiple return values, yield values.  maybe incompatible ???
* cascading method invocation ???
* def Class#method .. end ??
* class Foo::Bar<Baz .. end, module Boo::Bar .. end
* def Foo::Bar::baz() .. end ??
* objectify interpreters
* syntax tree -> bytecode ???
* format like perl's

### 1999-12-07 - Ruby 1.5.0

Quickly following the release of `1.4.2` is the release of `1.5.0`. Not a ton of time has passed so there aren't too many syntactical changes to mention. A couple of quick highlights though include `rescue` getting the additional modifier syntax like the conditionals and loops. We also get compile-time string concatenation (something that was listed in the todo from the previous version).

For the first time, the idea of `rescue` having a special `!!` operator is mentioned. This lives on in the todo file for quite a while. I'm not aware of if it was ever seriously considered.

#### Grammar

- [EBNF](docs/ebnf/1.5.0.txt)
- [Diagram](docs/diagrams/1.5.0.xhtml)

#### ChangeLog

Mon Nov  8 14:28:18 1999  Yukihiro Matsumoto  <matz@netlab.co.jp>

	* parse.y (stmt): rescue modifier added to the syntax.

Thu Oct 14 02:00:10 1999  Yukihiro Matsumoto  <matz@netlab.co.jp>

	* parse.y (string): compile time string concatenation.

#### ToDo

- def foo; .. rescue .. end
- compile time string concatenation, "hello" "world" => "helloworld"
- assignable constant, which now should be called shared variable.
- class variable (prefix?) -- done by shared variable
- rescue modifier; a rescue b => begin a rescue; b end
* operator !! for  rescue.
* objectify symbols
* objectify characters
* ../... outside condition invokes operator method too.
* ... inside condition turns off just before right condition.???
* %w(a\ b\ c abc) => ["a b c", "abc"]
* package or access control for global variables??
* named arguments like foo(nation:="german") or foo(nation: "german").
* method to retrieve argument information (need new C API)
* multiple return values, yield values.  maybe incompatible ???
* cascading method invocation ???
* def Class#method .. end ??
* class Foo::Bar<Baz .. end, module Boo::Bar .. end
* def Foo::Bar::baz() .. end ??
- RUBYOPT environment variable
- alias $defout $>
* objectify interpreters
* syntax tree -> bytecode ???

### 2000-09-19 - Ruby 1.6.0

A little over a year has passed since `1.4.0`, which means it's time for another stable release. Only one big thing really changed with the syntax between the two versions, which is that `rescue` can now be used in the modifier form like the conditionals and loops. 

Interestingly there are a couple of references to the flip-flop operator in the todo file. This has got to be one of the most controversial Ruby features. Later in `2.6` it will be deprecated, and then un-deprecated in `2.7`. Either way it's definitely one of the more interesting syntactical constructs.

There's also a mention of `0` being evaluated as falsy. Fortunately this one did not make it in, as that would have somewhat drastically changed the semantics of Ruby as we know it.

#### Grammar

- [EBNF](docs/ebnf/1.6.0.txt)
- [Diagram](docs/diagrams/1.6.0.xhtml)

#### ChangeLog

Mon Sep 11 14:24:47 2000  Yukihiro Matsumoto  <matz@ruby-lang.org>

	* parse.y (command_call): kYIELD moved to this rule to allow
	  'a = yield b'. (ruby-bugs-ja:#PR15) 

Fri Sep  1 10:36:29 2000  Yukihiro Matsumoto  <matz@ruby-lang.org>

	* parse.y (aref_args,opt_call_args): add block_call to allow a
	  method without parentheses and with block as a last argument.

Tue Jul 11 16:54:17 2000  Yukihiro Matsumoto  <matz@netlab.co.jp>

	* parse.y (yylex): `@<digit>' is no longer a valid instance
	  variable name.

Sat May  6 23:35:47 2000  Yukihiro Matsumoto  <matz@netlab.co.jp>

	* parse.y (lhs): should allow `obj.Attr = 5' type expression.

Mon Jan 24 02:56:44 2000  Yukihiro Matsumoto  <matz@netlab.co.jp>

	* parse.y (yylex): -2.abs should be `(-2).abs' to accomplish the
	  principle of less surprise.  `+2' too.

#### ToDo

- def foo; .. rescue .. end
- rescue modifier; a rescue b => begin a rescue; b end
- %w(a\ b\ c abc) => ["a b c", "abc"]
- class variable (prefix @@)
- rescue RuntimeError => err
* operator !! for rescue. ???
* objectify characters
* ../... outside condition invokes operator method too.
* ... inside condition turns off just before right condition.???
* package or access control for global variables??
* named arguments like foo(nation:="german") or foo(nation: "german").
* multiple return values, yield values.  maybe incompatible ???
* cascading method invocation ???
* def Class#method .. end ??
* class Foo::Bar<Baz .. end, module Boo::Bar .. end
* def Foo::Bar::baz() .. end ??
* Fixnum 0 as false ????
* non confusing in-block local variable (is it possible?)
  + remove scope by block
  + variables appears within block may have independent values.
- alias $defout $>
* objectify interpreters ???
* syntax tree -> bytecode ???

### 2001-06-01 - Ruby 1.7.1

About a year has passed since `1.6` was released, and Ruby is starting to pick up a little steam. It's also starting to look more and more like the Ruby that folks use today. You probably won't see any `1.7` code the wild any more, but it's possible you might get a glimse of `1.8`. Syntactically, a couple of things have been merged:

The `break` and `next` keywords now accept values. This becomes useful for methods like `detect`/`find` to controls the output of the overall loop. `%w` also gains the ability to escape spaces within the bounds, which was previously on the todo list. Finally, `rescue` can be added to singleton method bodies.

#### Grammar

- [EBNF](docs/ebnf/1.7.1.txt)
- [Diagram](docs/diagrams/1.7.1.xhtml)

#### ChangeLog

Tue May 22 02:37:45 2001  Yukihiro Matsumoto  <matz@ruby-lang.org>

	* parse.y (expr): "break" and "next" to take optional expression,
	  which is used as a value for termination. [new, experimental]

Tue Mar  6 10:50:29 2001  Yukihiro Matsumoto  <matz@ruby-lang.org>

	* parse.y (primary): rescue and ensure clauses should be allowed
	  to appear in singleton method body.

Wed Feb  7 16:05:22 2001  Nobuyoshi Nakada  <nobu.nakada@nifty.ne.jp>

	* parse.y (parse_quotedwords): %w should allow parenthesis escape.

Sat Dec  2 22:32:43 2000  Yukihiro Matsumoto  <matz@ruby-lang.org>

	* parse.y (stmt): multiple right hand side for single assignment
	  (e.g. a = 1,2) is allowed.

#### ToDo

* operator !! for rescue. ???
* objectify characters
* ../... outside condition invokes operator method too.
* ... inside condition turns off just before right condition.???
* package or access control for global variables??
* named arguments like foo(nation:="german") or foo(nation: "german").
* method to retrieve argument information (needs new C API)
* multiple return values, yield values.  maybe incompatible ???
* cascading method invocation ???
* def Class#method .. end ??
* class Foo::Bar<Baz .. end, module Boo::Bar .. end
* def Foo::Bar::baz() .. end ??
* I18N (or M17N) script/string/regexp
* Fixnum 0 as false ????
* discourage use of symbol variables (e.g. $/, etc.) in manual
* discourage use of Perlish features by giving warnings.
* non confusing in-block local variable (is it possible?)
  + remove scope by block
  + variables appears within block may have independent values.
* decide whether begin with rescue or ensure make do..while loop.
* a +1 to be a+1, not a(+1).
* raise exception by `` error
* jar like combined library package.
* objectify interpreters ???
* syntax tree -> bytecode ???
* Built-in Interactive Ruby.

### 2003-08-04 - Ruby 1.8.0

A lot happens between `1.7` and `1.8`. It's been 2 years since the `1.7` release, and Ruby has started to pick up in popularity. The popular "pickaxe" book `Programming Ruby` (Andy Hunt, Chad Fowler, and Dave Thomas) was released in 2001, which helped spread Ruby even further outside of Japan. Later that year in October, the first international Ruby conference was held in Tampa, Florida. From there, Ruby Central was founded by Chad Fowler and David Black. All of this momentum helped push a lot of companies to start to try out Ruby for the first time, including 37Signals.

Syntactically, there are a couple of notable changes, including:

- *`%W` word lists with interpolation*  
much like `%q` and `%Q`, `%W` is created as the word-list version that supports interpolation
- *dynamic symbols*  
symbols can now be created with interpolation
- *`break` and `next` take values*  
this becomes useful for methods like `detect`/`find` to controls the output of the overall loop
- *nested constant assignment*  
you can now assign the constants multiple levels deep using the `::` operator

`%w` also gains the ability to escape spaces within the bounds, which was previously on the todo list. `rescue` can additionally be added to class and module bodies, where previously it was only on method definitions.

The todo list includes a couple of interesting new additions. There's mention of in-block local variables and the scoping they acquire. This would be addressed in `1.9`. There's also mention of attempting to discourage folks from calling methods without parentheses. To my knowledge no linter currently exists for Ruby, but this would probably be the first rule if one did.

Finally, there's the first explicit mention in the todo file of a parser API. Other tools have already started to crop up outside of core Ruby (like `ripper`) that give direct access to the `NODE` syntax tree structs, and with the increase in popularity the demand for these kinds of tools has only grown. This is the last minor version that did not ship with a first-class parser API, as `ripper` would be merged in `1.9`.

#### Grammar

- [EBNF](docs/ebnf/1.8.0.txt)
- [Diagram](docs/diagrams/1.8.0.xhtml)

#### ChangeLog

Thu Feb 20 10:11:30 2003  Yukihiro Matsumoto  <matz@ruby-lang.org>

	* parse.y (clhs): allow "Foo::Bar = x".

Wed Feb  5 17:11:02 2003  Yukihiro Matsumoto  <matz@ruby-lang.org>

	* parse.y (yylex): no .<digit> float literal anymore.

Mon Nov  4 16:49:14 2002  Yukihiro Matsumoto  <matz@ruby-lang.org>

	* parse.y (primary): allow 'when'-less case statement; persuaded
	  by Sean Chittenden.

Fri Oct 18 23:11:21 2002  Nobuyoshi Nakada  <nobu.nokada@softhome.net>

	* parse.y (value_expr0): allow return/break/next/redo/retry in rhs
	  of logical operator.  [ruby-dev:18534]

Fri Oct 11 15:58:06 2002  Yukihiro Matsumoto  <matz@ruby-lang.org>

	* parse.y (arg): rescue modifier is now an operator with
	  precedence right below assignments. i.e. "a = b rescue c" now
	  parsed as "a = (b rescue c)", not as "(a = b) rescue c". [new]
	  [experimental]

Fri Jul 19 10:52:32 2002  Yukihiro Matsumoto  <matz@ruby-lang.org>

	* parse.y (yylex): new decimal notation '0d4567'.

Sat Jun 15 22:56:37 2002  Yukihiro Matsumoto  <matz@ruby-lang.org>

	* parse.y (yylex): obsolete '?<whitespace>'; use '?\s', '?\n',
	  etc, instead.

Tue May 28 14:07:00 2002  Yukihiro Matsumoto  <matz@ruby-lang.org>

	* parse.y (arg): no more ugly hack for "**", so that "-2**2" to be
	  parsed as "(-2)**2", whereas "- 2**2" or "-(2)**2" to be parsed
	  as "-(2**2)".

	* parse.y (yylex): '-2' to be literal fixnum. [new]

Tue Mar 26 01:56:33 2002  Yukihiro Matsumoto  <matz@ruby-lang.org>

	* parse.y (primary): while/until statement modifiers to "begin"
	  statement now work as "do .. while" even when begin statement
	  has "rescue" or "ensure" [new].

	* parse.y (bodystmt): rescue/ensure is allowed at every bodies,
	  i.e. method bodies, begin bodies, class bodies[new], and module
	  bodies[new].

Wed Aug 29 02:18:53 2001  Yukihiro Matsumoto  <matz@ruby-lang.org>

	* parse.y (yylex): ternary ? can be followed by newline.

#### ToDo

- class Foo::Bar<Baz .. end, module Boo::Bar .. end
* operator !! for rescue. ???
* objectify characters
* ../... outside condition invokes operator method too.
* ... inside condition turns off just before right condition.???
* package or access control for global variables??
* named arguments like foo(nation:="german") or foo(nation: "german").
* method to retrieve argument information (needs new C API)
* multiple return values, yield values.  maybe incompatible ???
* cascading method invocation ???
* def Class#method .. end ??
* def Foo::Bar::baz() .. end ??
* Fixnum 0 as false ????
* non confusing in-block local variable (is it possible?)
  + remove scope by block
  + variables appears within block may have independent values.
* method combination, e.g. before, after, around, etc.
* "in" modifier, to annotate, or to encourage assertion.
* private instance variable (as in Python?) @_foo in class Foo => @_Foo_foo
* warn/error "bare word" method, like "foo",  you should type "foo()"
* :symbol => value hash in the form of {symbol: value, ...} ??
* objectify interpreters ???
* syntax tree -> bytecode ???
* Parser API
* trap every method invocation, which can be enabled by e.g. trap_call :method.

### 2007-12-25 - Ruby 1.9.0

- `YARV`
- block local variables
- lambda literals
- symbol hash keys
- [`ripper` merged](https://svn.ruby-lang.org/cgi-bin/viewvc.cgi?view=revision&revision=6891)

#### Grammar

- [EBNF](docs/ebnf/1.9.0.txt)
- [Diagram](docs/diagrams/1.9.0.xhtml)

### 2009-01-30 - Ruby 1.9.1

- *encoding pragma*
- `.()` sugar for `.call`
- *post arguments*
- *block in block arguments*

#### Grammar

- [EBNF](docs/ebnf/1.9.1.txt)
- [Diagram](docs/diagrams/1.9.1.xhtml)

### 2011-10-31 - Ruby 1.9.3

- *trailing commas*

#### Grammar

- [EBNF](docs/ebnf/1.9.3.txt)
- [Diagram](docs/diagrams/1.9.3.xhtml)

### 2013-02-24 - Ruby 2.0.0

- [`Module#prepend`](https://bugs.ruby-lang.org/issues/1102)
- [Refinements](https://bugs.ruby-lang.org/issues/4085)
- [`%i` symbol lists](https://bugs.ruby-lang.org/issues/4985)
- [Keyword arguments](https://bugs.ruby-lang.org/issues/5474)

#### Grammar

- [EBNF](docs/ebnf/2.0.0.txt)
- [Diagram](docs/diagrams/2.0.0.xhtml)

### 2013-12-25 - Ruby 2.1.0

- [Required keyword arguments](https://bugs.ruby-lang.org/issues/7701)
- [Rational and complex literals](https://bugs.ruby-lang.org/issues/8430)
- [Frozen string literal suffix](https://bugs.ruby-lang.org/issues/8579)

#### Grammar

- [EBNF](docs/ebnf/2.1.0.txt)
- [Diagram](docs/diagrams/2.1.0.xhtml)

### 2014-12-25 - Ruby 2.2.0

- [Dynamic symbol hash keys](https://bugs.ruby-lang.org/issues/4276)

#### Grammar

- [EBNF](docs/ebnf/2.2.0.txt)
- [Diagram](docs/diagrams/2.2.0.xhtml)

### 2015-12-25 - Ruby 2.3.0

- [frozen_string_literal pragma](https://bugs.ruby-lang.org/issues/8976)
- [`<<~` heredocs](https://bugs.ruby-lang.org/issues/9098)
- [`&.` operator](https://bugs.ruby-lang.org/issues/11537)

#### Grammar

- [EBNF](docs/ebnf/2.3.0.txt)
- [Diagram](docs/diagrams/2.3.0.xhtml)

### 2016-12-25 - Ruby 2.4.0

- [Top level return](https://bugs.ruby-lang.org/issues/4840)
- [Refinements in `Symbol#to_proc`](https://bugs.ruby-lang.org/issues/9451)
- [Multiple assignment in a conditional](https://bugs.ruby-lang.org/issues/10617)

#### Grammar

- [EBNF](docs/ebnf/2.4.0.txt)
- [Diagram](docs/diagrams/2.4.0.xhtml)

### 2017-12-25 - Ruby 2.5.0

- [`rescue` and `ensure` at the block level](https://bugs.ruby-lang.org/issues/12906)
- [Refinements in string interpolations](https://bugs.ruby-lang.org/issues/13812)

#### Grammar

- [EBNF](docs/ebnf/2.5.0.txt)
- [Diagram](docs/diagrams/2.5.0.xhtml)

### 2018-12-25 - Ruby 2.6.0

- [Flip-flop (deprecated)](https://bugs.ruby-lang.org/issues/5400)
- [Endless range](https://bugs.ruby-lang.org/issues/12912)
- [Non-ASCII constant names](https://bugs.ruby-lang.org/issues/13770)
- [RubyVM::AbstractSyntaxTree](https://github.com/ruby/ruby/commit/0f3dcbdf38db6c7fb04ca0833bb1f9af2c3e7ca4)
- [Escape keywords from class/module scope removed](https://bugs.ruby-lang.org/issues/6354)

#### Grammar

- [EBNF](docs/ebnf/2.6.0.txt)
- [Diagram](docs/diagrams/2.6.0.xhtml)

### 2019-12-25 - Ruby 2.7.0

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

#### Grammar

- [EBNF](docs/ebnf/2.7.0.txt)
- [Diagram](docs/diagrams/2.7.0.xhtml)

### 2020-12-25 - Ruby 3.0.0

- [Keyword arguments (non-hash-based)](https://bugs.ruby-lang.org/issues/14183)
- [Single-line methods](https://bugs.ruby-lang.org/issues/16746)
- [Find pattern matching](https://bugs.ruby-lang.org/issues/16828)
- [shareable_constant_value pragma](https://bugs.ruby-lang.org/issues/17273)
- [`in` pattern matching](https://bugs.ruby-lang.org/issues/17371)

#### Grammar

- [EBNF](docs/ebnf/3.0.0.txt)
- [Diagram](docs/diagrams/3.0.0.xhtml)

## Projects

### 2000-10-01 - nodeDump 0.1.0

Following the release of Ruby `1.6`, Dave Thomas created the [nodeDump](http://web.archive.org/web/20010302133702/http://www.pragmaticprogrammer.com:80/ruby/downloads/nodeDump.html) project. It walked the AST that Ruby generated after parsing and dumped out human-readable documentation about what Ruby would be evaluating. This ended up inspiring a bunch of other projects, and to my knowledge is the first real attempt at accessing and manipulating the AST outside of the core Ruby developers.

When this is released there is also mention of the `ii` project by Guy Decoux, but for whatever reason that appears to be lost to internet history (it was hosted on an ftp server that is no longer live).

This project and the many others that it inspired live on until `1.9` when CRuby switched over to the `YARV` bytecode interpreter. Because a lot of internals had to change to support that switch, most of the projects from around this time no longer functioned on the newer Ruby versions.

#### Links

- [README](docs/projects/nodeDump/README.txt)

### 2001-01-10 - ruth 0.0.1

A little while after `nodeDump` is released, Robert Feldt creates [ruth](https://sourceforge.net/projects/rubyvm/files/ruth/) (short for Ruby under the hood). It is effectively a generalized form of the `nodeDump` utility, and provides two Ruby-space methods, `Ruby::Interpreter.parse` and `Ruby::Interpreter.method_body`. These return something that is akin to s-expressions that can then be manipulated. As with `nodeDump`, it's a C extension that parses `node.h` to generate all of the necessary metadata.

#### Links

- [readme](docs/projects/ruth/readme.txt)

### 2001-10-20 - ripper 0.0.1

Following on the heels of the release of Ruby `1.7`, Minero Aoki releases [ripper](https://i.loveruby.net/archive/ripper/), an event-driver Ruby parser. This is, to date, the most complete alternative Ruby parser, and boasts the ability to provide an entire AST or just a small subset. It functions by taking the `parse.y` from Ruby and modifying the actions. (This is the approach that almost every alternative implementation to CRuby ends up taking, as it's extremely difficult to replicate the exact parsing behavior without a copy of the grammar file.)

Ripper is one of the few projects of this era to survive the `1.8` to `1.9` migration, likely because Aoki was a core contributor and made sure it additionally worked on the `YARV` branch. Eventually this project would become the way that many other projects retreived AST information, though it was always marked as "experimental". Even today the README for ripper says `Ripper is still early-alpha version.`.

#### Links

- [readme](docs/projects/ripper/readme.txt)
- [sample/comment.rb](docs/projects/ripper/sample/comment.rb.txt)

### 2002-10-09 - MetaRuby 0.7.0

[MetaRuby](http://artengine.ca/matju/MetaRuby/) is a pretty interesting project that Mathieu Bouchard started around the Ruby 1.7 era. It was an attempt to implement a lot of the Ruby standard library in pure Ruby, predating the Rubinius project by a while. The reason I'm including it in this list is that in version `0.7.0`, MetaRuby included `RubySchema.rb`, which was a method of validating the shape of the Ruby abstract syntax tree.

#### Links

- [Overview](docs/projects/MetaRuby/Overview.txt)
- [RubySchema.rb](docs/projects/MetaRuby/RubySchema.rb.txt)

### 2004-11-10 - ParseTree 1.0.0

A little over a year after the release of `1.8`, Ryan Davis released [ParseTree](https://github.com/seattlerb/parsetree). It used internals specific to `1.8` to build out s-expressions that you could programmatically access. Interestingly it was tested against all of the available gems at the time it was written with a tool called `gauntlet`.

#### Links

- [README.txt](docs/projects/parsetree/README.txt)
- [lib/gauntlet_parsetree.rb](docs/projects/parsetree/lib/gauntlet_parsetree.rb.txt)

### 2006-06-05 - RubyNode 0.1.0

Still in the Ruby `1.8` to `1.9` timeline, Dominik Bathon released [RubyNode](https://web.archive.org/web/20060630155424/http://rubynode.rubyforge.org/). It was similar in spirit to `ParseTree`, except that it returns hashes of options on arrays and generally sticks a little closer to the internal node structure.

#### Links

- [README.txt](docs/projects/rubynode/README.txt)

### 2007-11-14 - ruby_parser 1.0.0

- Ryan Davis https://github.com/seattlerb/ruby_parser
- Uses a `racc`-based compiler to generate s-expressions

### 2009-07-25 - nodewrap 0.5.0

- Paul Brannan http://rubystuff.org/nodewrap/
- Allows dumping/loading the Ruby nodes and instruction sequences to a binary format

### 2010-08-27 - laser 0.0.1

- Michael Edgar https://github.com/michaeledgar/laser
- Originally parsed regular expressions then `Ripper` to parse Ruby
- Features a type system, semantic analysis, documentation generation, and a plugin system

### 2013-04-15 - parser 0.9.0

- Peter Zotov https://github.com/whitequark/parser
- Derives a new parser from `parse.y` in Ruby and a lexer test suite from `ruby_parser`

## Standards

### 2011-03-22 - JIS X 3017

### 2012-04-15 - ISO/IEC 30170:2012

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

## parser

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

## ruby_parser

- [dawnscanner](https://github.com/thesp0nge/dawnscanner) - security analyzer
- [debride](https://github.com/seattlerb/debride) - unused code analyzer
- [fasterer](https://github.com/DamirSvrtan/fasterer) - performance linter
- [flay](https://github.com/seattlerb/flay) - code similarity analyzer
- [flog](https://github.com/seattlerb/flog) - code understandability analyzer
- [railroader](https://github.com/david-a-wheeler/railroader) - static security analyzer
- [roodi](https://github.com/roodi/roodi) - linter

## ripper

- [cane](https://github.com/square/cane) - linter
- [language_server-ruby](https://github.com/mtsmfm/language_server-ruby) - language server
- [prettier](https://github.com/prettier/plugin-ruby) - formatter
- [rubyfmt](https://github.com/penelopezone/rubyfmt) - formatter
- [rufo](https://github.com/ruby-formatter/rufo) - formatter
- [sandi_meter](https://github.com/makaroni4/sandi_meter) - linter
- [yard](https://github.com/lsegal/yard) - documentation generator

## RubyVM::AbstractSyntaxTree

- [solargraph](https://github.com/castwide/solargraph) - language server

## tree-sitter

- [vscode-ruby](https://github.com/rubyide/vscode-ruby) - language server

## Rubinius

- [pelusa](https://github.com/codegram/pelusa) - linter

## RIL

- [druby](http://www.cs.umd.edu/projects/PL/druby/) - type system
- [rtc](https://www.cs.tufts.edu/~jfoster/papers/oops13.pdf) - type system
- [rubydust](http://www.cs.umd.edu/~mwh/papers/rubydust.pdf) - type system

## JRuby

- [Ecstatic](https://projekter.aau.dk/projekter/files/61071016/1181807983.pdf) - type system

## Potential future syntax

- [Anonymous struct literal](https://bugs.ruby-lang.org/issues/16986)
