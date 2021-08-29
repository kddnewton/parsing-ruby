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

Ruby `1.9.0` was a very large change because it integrated Koichi Sasada's graduate thesis [YARV](http://www.atdot.net/yarv/oopsla2005eabstract-rc1.pdf) which stands for yet another RubyVM. It switched from being a tree-walk algorithm that kept an abstract syntax tree around to manipulate to being a bytecode interpreter that kept around instruction sequences.

In addition, while this transition was being made, [`ripper` was merged](https://svn.ruby-lang.org/cgi-bin/viewvc.cgi?view=revision&revision=6891) into trunk. Now instead of forking `parse.y` and maintaining its own grammar, it instead was integrated into the main Ruby `parse.y`. In introduced a special comment format that lived inside the grammar actions that functioned as an alternate action that should be taken in the case that `ripper` was being built. Mostly it "dispatched" events when those tree nodes were being reduced and then continued building the tree.

There were a couple of additional (somewhat controversial) syntactical additions to the language with this version as well. Those include lambda literals (as in `-> (foo) { foo * 2 }`) and symbol hash keys (as in `{ foo: "bar" }`). To this day there are folks that will avoid both of those syntax constructs.

#### Grammar

- [EBNF](docs/ebnf/1.9.0.txt)
- [Diagram](docs/diagrams/1.9.0.xhtml)

#### ToDo

- class Foo::Bar<Baz .. end, module Boo::Bar .. end
- raise exception by `` error
- clarify evaluation order of operator argument (=~, .., ...)
- :symbol => value hash in the form of {symbol: value, ...} ??
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
* discourage use of symbol variables (e.g. $/, etc.) in manual
* discourage use of Perlish features by giving warnings.
* decide whether begin with rescue or ensure make do..while loop.
* method combination, e.g. before, after, around, etc.
* .. or something like defadvice in Emacs.
* property - for methods, or for objects in general.
* "in" modifier, to annotate, or to encourage assertion.
* selector namespace - something like generic-flet in CLOS, to help RubyBehavior
* private instance variable (as in Python?) @_foo in class Foo => @_Foo_foo
* warn/error "bare word" method, like "foo",  you should type "foo()"
* objectify interpreters ???
* MicroRuby
* Built-in Interactive Ruby.
* Parser API
* Ruby module -- Ruby::Version, Ruby::Interpreter

#### Projects

Although it was meant for testing, various projects have cropped up that have used `RubyVM::AbstractSyntaxTree` to access the Ruby parse tree. The biggest one worth mentioning is [solargraph](https://github.com/castwide/solargraph), a Ruby language server.

### 2009-01-30 - Ruby 1.9.1

It took a little over a year for Ruby to reach `1.9.1` from `1.9.0`. This was considered the first "stable" release of the `1.9` series, as most of the kinks with YARV had been worked out at this point.

There was a lot of work at this time in Ruby around encoding. Before, everything was assumed to be ASCII-ish. The `1.9` series made encoding into a first class citizen, which including creating the `encoding` pragma. This ended up becoming a pattern as other pragma were intoduced later (notably `frozen_string_literal`).

There were a couple of other interesting additions at this time as well. This includes the `foo.()` operator alias which resolves to the `call` method. Also introduced were positional arguments that followed a splat argument. Finally we also got block parameters as block variables.

#### Grammar

- [EBNF](docs/ebnf/1.9.1.txt)
- [Diagram](docs/diagrams/1.9.1.xhtml)

### 2011-10-31 - Ruby 1.9.3

Two full years later, and Ruby is still in the `1.9` series. The language itself has completely taken off, due in some part to the popularity of Ruby on Rails, which is now definitively in vogue. For the language itself, not a ton of syntax has changed in this time (a lot of work is being done on the standard library and the shiny new underlying bytecode interpreter). The only thing truly of note at this point is that you can now put trailing commas on method invocations.

This version of Ruby is particularly special for a couple of reasons. The grammar for this version of Ruby ended up being included in a couple of international standards, as Ruby became officially recognized first by the Japanese Standards Association in [JIS X 3017](https://standards.globalspec.com/std/1651983/JIS%20X%203017), and second by the International Organization for Standardization in [ISO/IEC 30170:2012](https://www.iso.org/obp/ui/#iso:std:iso-iec:30170:ed-1:v1:en).

This time period in Ruby's history is significant in that the influx of new users and the popularity of the language had gotten the attention of some larger companies that were now interested in investing in its future. This resulted in myriad implementations of Ruby being attempted on every platform imaginable, including the Java Virtual Machine, the Parrot Virtual Machine, the Common Language Runtime, and others.

#### Grammar

- [EBNF](docs/ebnf/1.9.3.txt)
- [Diagram](docs/diagrams/1.9.3.xhtml)

### 2013-02-24 - Ruby 2.0.0

After another year and a half of development since `1.9.3`, `2.0.0` was released. Around this time `bugs.ruby-lang.org` was introduced as the official bug tracker and so the remaining features on this list can include links to the original discussion. These include:

- [`Module#prepend`](https://bugs.ruby-lang.org/issues/1102)  
The ability to inject a module into the ancestor chain _before_ the current class so that you could call `super` to access the original method. This drastically simplified a common construct at the time called `alias_method_chain`.
- [Refinements](https://bugs.ruby-lang.org/issues/4085)  
Another controversial feature that created the `using` and `refine` keywords that allowed lexically-scoped monkey-patches.
- [`%i` symbol lists](https://bugs.ruby-lang.org/issues/4985)  
A small but useful addition that expanded the `%w` pattern to `%i` to make lists of symbols.
- [Keyword arguments](https://bugs.ruby-lang.org/issues/5474)  
Otherwise known as "named" arguments, these were arguments on method calls and definitions that had explicit names. The syntax looked/looks _very_ similar to bare hashes without the braces. So much so that it ended up being implemented using a hash as the final argument to the method call, which caused a fair amount of compatibility problems. This ended up being remedied in `3.0` a full 8 years later.

#### Grammar

- [EBNF](docs/ebnf/2.0.0.txt)
- [Diagram](docs/diagrams/2.0.0.xhtml)

### 2013-12-25 - Ruby 2.1.0

Starting with Ruby `2.1.0`, Ruby starts releasing on a very consistent schedule of every Christmas. The changes in this version include:

- [Required keyword arguments](https://bugs.ruby-lang.org/issues/7701)  
Previously you always had to specify a default value, but this change allowed those values to be omitted.
- [Rational and complex literals](https://bugs.ruby-lang.org/issues/8430)  
Rational and Complex already existed as classes, but this allowed syntax like `1/2r` for creating them without explicitly referencing the class.
- [Frozen string literal suffix](https://bugs.ruby-lang.org/issues/8579)  
This is an interesting addition that was temporarily merged and then replaced before this version was released. The proposal was to add an `f` suffix to strings to make them frozen by default without having to call a method. This is a theme that we'll see a lot over time as folks continually propose more ways to remove string allocations. This eventually gets obviated by a proposal to [optimize .freeze](https://bugs.ruby-lang.org/issues/8992) on strings within the compiler.

#### Grammar

- [EBNF](docs/ebnf/2.1.0.txt)
- [Diagram](docs/diagrams/2.1.0.xhtml)

### 2014-12-25 - Ruby 2.2.0

In Ruby `2.2.0`, the only large syntax change is that you can now use [dynamic symbol hash keys](https://bugs.ruby-lang.org/issues/4276). This means you can do something like `{ "foo #{bar}": baz }`.

#### Grammar

- [EBNF](docs/ebnf/2.2.0.txt)
- [Diagram](docs/diagrams/2.2.0.xhtml)

### 2015-12-25 - Ruby 2.3.0

As with `2.1.0`, there are still ongoing discussions of frozen strings, and we end up settling on the [frozen_string_literal pragma](https://bugs.ruby-lang.org/issues/8976) (following in the tradition of the encoding pragma). This allows users to specify that all strings in the file should be frozen by default. This was considered a temporary measure to prepare for an eventual future where all strings in Ruby would be frozen by default (this was also added as a command-line switch). This was promised for Ruby 3, but didn't end up making it in.

In addition to the pragma, we also got [`<<~` heredocs](https://bugs.ruby-lang.org/issues/9098) that stripped common leading whitespace, and the [`&.` operator](https://bugs.ruby-lang.org/issues/11537) (otherwise known as the "lonely" operator), which only called the method if the receiver was not `nil`.

#### Grammar

- [EBNF](docs/ebnf/2.3.0.txt)
- [Diagram](docs/diagrams/2.3.0.xhtml)

### 2016-12-25 - Ruby 2.4.0

Since its addition three years ago, refinements have not quite been adopted in many places. Nevertheless, work continues on them in this release where you can now use [refined methods with the `Symbol#to_proc`](https://bugs.ruby-lang.org/issues/9451) syntax. For example, if you were to refine `Integer#to_s`, you could now write `[1, 2, 3].map(&:to_s)` and it would function as you would expect.

In addition, we got [top-level return](https://bugs.ruby-lang.org/issues/4840), which was useful in scripts where you wanted to bail from the entire program if some precondition was not met (like a dependency not beig available or not being on the right platform). Finally, you could now use [multiple assignment in a conditional](https://bugs.ruby-lang.org/issues/10617).

#### Grammar

- [EBNF](docs/ebnf/2.4.0.txt)
- [Diagram](docs/diagrams/2.4.0.xhtml)

### 2017-12-25 - Ruby 2.5.0

Work continues on refinements, as in this release we get [refinements in string interpolations](https://bugs.ruby-lang.org/issues/13812). Also released in this version were [`rescue` and `ensure` at the block level](https://bugs.ruby-lang.org/issues/12906), which had been referenced in the ToDo file for quite a few years at this point.

#### Grammar

- [EBNF](docs/ebnf/2.5.0.txt)
- [Diagram](docs/diagrams/2.5.0.xhtml)

### 2018-12-25 - Ruby 2.6.0

Keeping with their release schedule of every Christmas, Ruby `2.6.0` was released one year to the day following `2.5.0`. One of the most interesting additions to history of parsing Ruby came in this version, which was the addition of [RubyVM::AbstractSyntaxTree](https://github.com/ruby/ruby/commit/0f3dcbdf38db6c7fb04ca0833bb1f9af2c3e7ca4). This addition was accidental, it was added as a means of testing another feature that was being added. Unfortunately for the maintainer, [people noticed](https://bugs.ruby-lang.org/issues/14844).

`RubyVM::AbstractSyntaxTree` uses the internal `NODE` structs to build out an abstract syntax tree, much like many of the projects from the `1.6` to `1.8` days. Because it's written into core Ruby, it necessarily has access to things that other projects don't, which makes it particular faithful to the syntax. It is both praised and criticized on release, as it means another module that other implementations have to support if it becomes the blessed path for accessing the Ruby parse tree. The discussion continues to this day.

Other syntax additions include:

- [Flip-flop (deprecated)](https://bugs.ruby-lang.org/issues/5400)  
At this point the `flip-flop` operator is deprecated, much to the chagrin of the commenters on the linked issue. This deprecation ends up getting reverted in Ruby `2.7`.
- [Endless range](https://bugs.ruby-lang.org/issues/12912)  
Ranges without endings get added to the syntax, which is a nice pairing with the lazy enumerable methods that have recently been merged. This allows things like `(0..).lazy.map { |number| number * 2 }.take(10)`, for example, to get the first 10 even numbers.
- [Non-ASCII constant names](https://bugs.ruby-lang.org/issues/13770)  
Constants in this version can now use non-ASCII characters in their names, which makes for all kinds of fun obfuscated code involving emojis.
- [Escape keywords from class/module scope removed](https://bugs.ruby-lang.org/issues/6354)  
An extremely rarely (hopefully) used feature of Ruby was that you could call `break` within a class and module body. This was effectively a bug, but it's interesting and included here because syntax is extremely rarely removed from Ruby. This is one of the few exceptions.

#### Grammar

- [EBNF](docs/ebnf/2.6.0.txt)
- [Diagram](docs/diagrams/2.6.0.xhtml)

### 2019-12-25 - Ruby 2.7.0

Ruby `2.7.0` brought the biggest amount of new syntax to any version of Ruby. It boasts all kinds of interesting changes, including:

- [Flip-flop (undeprecated)](https://bugs.ruby-lang.org/issues/5400)  
To the cheers of fans of the flip-flop operator, the deprecation was removed.
- [Method reference operator (added)](https://bugs.ruby-lang.org/issues/13581)  
The method reference operator `.:` was added, as a shortcut for accessing a method object like `foo.method(:bar)`.
- [Keyword arguments (warning about hash-based)](https://bugs.ruby-lang.org/issues/14183)  
Since the addition of keyword arguments back in Ruby `2.0`, they've always been backed by an internal hash. That resulted in all kinds of compatibility issues between implementations of Ruby. To simplify things, in `3.0` they decided to make them "real" arguments instead of using an internal hash structure. To ease the transition, Ruby `2.7.0` detected when code would break in `3.0` and warned about that usage.
- [No other keywords syntax](https://bugs.ruby-lang.org/issues/14183)  
To define that no other keywords would be allowed on a method call, you could now use the special `**nil` syntax.
- [Beginless range](https://bugs.ruby-lang.org/issues/14799)  
To complement the endless ranges from the previous minor version, ranges could now omit the beginning as well.
- [Pattern matching](https://bugs.ruby-lang.org/issues/14912)  
A massive influx of syntax comes in `2.7` with the introduction of pattern matching. It's similar to a `case..when` statement, but instead uses `case..in` and comes with a whole host of new syntactical constructs. It merits its [own documentation page](https://github.com/ruby/ruby/blob/master/doc/syntax/pattern_matching.rdoc) being added to trunk.
- [Numbered parameters](https://bugs.ruby-lang.org/issues/15723)  
An interesting addition to this version is numbered parameters. Take a look at the linked issue to see all of the proposed variants. This addition takes inspiration from languages like Scala that support a default block variable.
- [Rightward assignment](https://bugs.ruby-lang.org/issues/15921)  
Even before `2.7` lands, pattern matching gets another addition which is rightward assignment. You can now assign variables using the special `=>` syntax, as in `foo => bar` which assigns to the `bar` local variable. This adds to the pattern matching because you can now pattern match in rightward assignment.
- [Argument forwarding](https://bugs.ruby-lang.org/issues/16253)  
Because keyword arguments are changing so much, its necessary to make a blessed path for forwarding named and unnamed arguments to another method. You can now use the ellipsis operator (`...`) to send every kind of argument (positional, keyword, and block) over to another method call. This helped eliminate some of the more problematic single-splat usage that was previously being used to accomplish this.
- [Method reference operator (removed)](https://bugs.ruby-lang.org/issues/16275)  
Unfortunately, the method reference operator that had been added earlier in the year ended up being reverted. Check the linked issue for the discussion of why.

#### Grammar

- [EBNF](docs/ebnf/2.7.0.txt)
- [Diagram](docs/diagrams/2.7.0.xhtml)

### 2020-12-25 - Ruby 3.0.0

Seven years since the release of Ruby `2.0`, Ruby goes `3.0`. A lot of changes that don't have to do with syntax are included in this release. Syntactically, there are a couple of interesting additions:

- [Keyword arguments (non-hash-based)](https://bugs.ruby-lang.org/issues/14183)  
The `3.x` version of keyword arguments (as opposed to the hash-based `2.x` version). This is the feature that Ruby `2.7` warned about constantly because folks were using the final hash argument to support keyword arguments before.
- [Single-line methods](https://bugs.ruby-lang.org/issues/16746)  
Methods can now be written as `def foo = bar` for more concise syntax.
- [Find pattern matching](https://bugs.ruby-lang.org/issues/16828)  
Pattern matching gets another type of pattern called the `"find"` pattern, which allows you to specify two `*` operators on each side of the value that you're searching for.
- [shareable_constant_value pragma](https://bugs.ruby-lang.org/issues/17273)  
To better support shared values across ractors, this pragma was added to make constant values shareable without having to freeze them. It's a [somewhat complicated](https://docs.ruby-lang.org/en/3.0.0/doc/syntax/comments_rdoc.html#label-shareable_constant_value+Directive) option that involves a lot of explanation in the linked doc.
- [`in` pattern matching](https://bugs.ruby-lang.org/issues/17371)  
Pattern matching gets one more boost with the ability to use the `in` operator for a single line. This is similar to rightward assignment, but returns the value of the match.

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

#### Projects

Even though ripper has always been marked as `"experimental"`, a number of projects rely on it for accessing the parse tree. They've mostly been using it since it got merged into trunk with `1.9`. Those projects include:

- [cane](https://github.com/square/cane) - a linter
- [language_server-ruby](https://github.com/mtsmfm/language_server-ruby) - a language server
- [prettier](https://github.com/prettier/plugin-ruby) - a formatter
- [rubyfmt](https://github.com/penelopezone/rubyfmt) - a formatter
- [rufo](https://github.com/ruby-formatter/rufo) - a formatter
- [sandi_meter](https://github.com/makaroni4/sandi_meter) - a linter
- [yard](https://github.com/lsegal/yard) - a documentation generator

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

Just before `1.9` was released, Ryan Davis created a spiritual sequel to `ParseTree` that would function running with the `1.9` branch. He took the `parse.y` file from core Ruby and rewrote the actions to be pure Ruby before piping it through `racc`. This was a similar idea to `ripper`, except that it was in Ruby instead of C.

#### Links

[lib/ruby_parser.y](docs/projects/ruby_parser/lib/ruby_parser.y.txt)

#### Projects

A number of projects use `ruby_parser` as a way of accessing the syntax tree. Most of these were similarly created by Ryan Davis, but some others exist as well. Those include:

- [dawnscanner](https://github.com/thesp0nge/dawnscanner) - a security analyzer
- [debride](https://github.com/seattlerb/debride) - an unused code analyzer
- [fasterer](https://github.com/DamirSvrtan/fasterer) - a performance linter
- [flay](https://github.com/seattlerb/flay) - a code similarity analyzer
- [flog](https://github.com/seattlerb/flog) - a code understandability analyzer
- [railroader](https://github.com/david-a-wheeler/railroader) - a static security analyzer
- [roodi](https://github.com/roodi/roodi) - a linter

### 2010-08-27 - laser 0.0.1

An interesting addition to this list is an excerpt from the academic side of Ruby. In 2010 Michael Edgar publishd his undergraduate thesis called [laser](https://github.com/michaeledgar/laser) (originally called wool, laser came from lexically- and statically-enriched Ruby). It was a linter, a type system, a documentation generation tool, and more. It featured a plugin system and performed semantic analysis. It was one of the more fully-fledged static analysis tools written for Ruby at this point. It originally parsed Ruby source using regular expressions just to check whitespace but upgraded to `ripper` eventually to do more complicated analyses.

### 2013-04-15 - parser 0.9.0

Around the `2.0.0` days, Peter Zotov created the [parser gem](https://github.com/whitequark/parser). In the same tradition of other implementations of Ruby, it took the `parse.y` file from Ruby (and the lexer test suite from Ryan Davis' `ruby_parser`) and derived a new parser for creating syntax trees.

#### Links

- [README.md](docs/projects/parser/README.md.txt)
- [lib/parser/ruby20.y](docs/projects/parser/lib/parser/ruby20.y.txt)

#### Projects

From its humble beginnings, `parser` ended up getting the attention of a lot of other developers because of its well-documented trees, easy-to-use APIs, and rewriting support. All kinds of other tools ended up being built on top of it, including:

- [covered](https://github.com/ioquatix/covered) - a code coverage reporter
- [deep-cover](https://github.com/deep-cover/deep-cover) - a code coverage reporter
- [erb-lint](https://github.com/Shopify/erb-lint) - an ERB file linter
- [fast](https://github.com/jonatas/fast) - an AST editor
- [opal](https://github.com/opal/opal) - a Ruby to JavaScript transpiler
- [packwerk](https://github.com/Shopify/packwerk) - an encapsulation analyzer
- [querly](https://github.com/soutaro/querly) - a method call finder
- [rdl](https://github.com/tupl-tufts/rdl) - a type checker
- [reek](https://github.com/troessner/reek) - a code smell analyzer
- [rubocop](https://github.com/rubocop/rubocop) - a linter
- [rubrowser](https://github.com/emad-elsaid/rubrowser) - a module relationship grapher
- [ruby-lint](https://github.com/YorickPeterse/ruby-lint) - a linter
- [ruby-next](https://github.com/ruby-next/ruby-next) - a transpiler and polyfill
- [ruby_detective](https://github.com/victor-am/ruby_detective) - a module relationship grapher
- [rubycritic](https://github.com/whitesmith/rubycritic) - a code quality reporter
- [seeing_is_believing](https://github.com/JoshCheek/seeing_is_believing) - an editor intermediate value display
- [standard](https://github.com/testdouble/standard) - a rubocop wrapper with fewer options
- [steep](https://github.com/soutaro/steep) - a static type checker
- [unparser](https://github.com/mbj/unparser) - a code generation from the parser AST
- [vernacular](https://github.com/kddnewton/vernacular) - a source code manipulation
- [yoda](https://github.com/tomoasleep/yoda) - a static analyzer and language server

## Standards

### 2011-03-22 - JIS X 3017

Japanese Standards Association standard [JIS X 3017](https://standards.globalspec.com/std/1651983/JIS%20X%203017).

### 2012-04-15 - ISO/IEC 30170:2012

International Organization for Standardization standard [ISO/IEC 30170:2012](https://www.iso.org/obp/ui/#iso:std:iso-iec:30170:ed-1:v1:en).

## Parsers

- [Cardinal](https://github.com/parrot/cardinal) - an implementation on the Parrot VM
- [IronRuby](http://www.wilcob.com/Wilco/IronRuby/microsoft_ironruby.aspx) - an implementation on the .NET framework
- [JRuby](https://github.com/jruby/jruby) - an implementation on the JVM
	- [Ecstatic](https://projekter.aau.dk/projekter/files/61071016/1181807983.pdf) - type system
- [MacRuby](http://macruby.org/) - an implementation for objective-c
- [melbourne](https://github.com/carlosbrando/melbourne) - Rubinius's parser as a gem
- [mruby](https://github.com/mruby/mruby) - an embeddable implementation
- [rdoc](https://github.com/ruby/rdoc) - documentation generator
- [RIL](http://www.cs.umd.edu/projects/PL/druby/papers/druby-dls09.pdf) - an intermediate language
  - [druby](http://www.cs.umd.edu/projects/PL/druby/) - type system
  - [rtc](https://www.cs.tufts.edu/~jfoster/papers/oops13.pdf) - type system
  - [rubydust](http://www.cs.umd.edu/~mwh/papers/rubydust.pdf) - type system
- [rubinius](https://github.com/rubinius/rubinius) - an implementation in Ruby
	- [pelusa](https://github.com/codegram/pelusa) - linter
- [saikuro](https://metricfu.github.io/Saikuro) - cyclomatic complexity linter
- [sorbet](https://sorbet.org/) - type system
- [sydparse](https://rubygems.org/gems/sydparse) - a reentrant Ruby parser
- [topaz](https://github.com/topazproject/topaz) - an implementation for RPython
- [tree-sitter-ruby](https://github.com/tree-sitter/tree-sitter-ruby) - a parser aimed at editors
	- [vscode-ruby](https://github.com/rubyide/vscode-ruby) - language server
- [TruffleRuby](https://github.com/oracle/truffleruby) - an implementation on the GraalVM
- [typedruby](https://github.com/typedruby/typedruby) - type system
