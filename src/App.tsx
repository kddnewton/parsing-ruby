// This file was generated by running script/readme.rb

import React from "react";

import PageHeader from "./PageHeader";
import { RubyMarker, RubyTooltip, RubyTimeline } from "./RubyTimeline";
import { Timeline, TimelineTooltip, TimelineLine, TimelineEntry, TimelineEntryTooltip } from "./Timeline";

const App = () => (
  <div className="container">
    <PageHeader />
    <Timeline startDate={new Date(Date.UTC(1993, 0, 1))} endDate={new Date(Date.UTC(2021, 11, 31))}>
      <RubyTimeline>
        <RubyTooltip>
          <TimelineTooltip />
        </RubyTooltip>
        <TimelineLine>
<TimelineEntry date={new Date(Date.UTC(1994, 0, 7))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2>Ruby 0.06 <small>1994-01-07</small></h2>

<p>This is the earliest <a href="https://cache.ruby-lang.org/pub/ruby/1.0/ChangeLog-pre-alpha">changelog entry</a> that I could find that had an explicit version on it. At this point Ruby was still a very early idea and the syntax was changing rapidly.</p>

<h4 id="changelog">ChangeLog</h4>

<p>Fri Jan  7 15:23:20 1994  Yukihiro Matsumoto  (matz at nws119)</p>

<pre><code>{`* baseline - version 0.06.
`}</code></pre>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(1995, 4, 19))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2>Ruby 0.76 <small>1995-05-19</small></h2>

<p>The changelog here is still entirely Yukihiro Matsumoto. It’s been a year since the last entry on this timeline and a ton has changed. The choice of including <code>0.76</code> is somewhat arbitrary here. It’s just that <a href="https://cache.ruby-lang.org">https://cache.ruby-lang.org</a> happens to have a tar file containing that particular release.</p>

<p>There are some interesting things happening that are mentioned in the changelog below. <code>include</code> used to be a keyword, but there are a couple of keywords that at the moment are going through “methodization” which extracts them from the grammar and moves them into standard-library space. We can see here as well that hashes used to be called <code>Dict</code>. This was the version that included syntax for hash literals and array literals (array literals used to be initialized with braces, but that change here).</p>

<p>The ToDo file used to live in the root of the repository in these older versions. It’s an interesting artifact, as it offers a window into Matz’ thinking at the time. We can see in this version and many future versions he mentions heredocs (which do eventually get added before <code>1.0</code>) as well as a byte code interpreter (what would eventually become <code>YARV</code>).</p>

<h4 id="grammar">Grammar</h4>

<ul>
  <li><a href="ebnf/0.76.txt">EBNF</a></li>
  <li><a href="diagrams/0.76.xhtml">Diagram</a></li>
</ul>

<h4 id="changelog">ChangeLog</h4>

<p>Wed Apr 26 09:50:56 1995  Yukihiro Matsumoto  (matz@ix-02)</p>

<pre><code>{`* parse.y: イテレータブロックの変数宣言を\`|'で括るようにした．これ
  でイテレータ変数がない時は宣言そのものを省略できる．文法の変更は
  久しぶりだ．
`}</code></pre>

<p>Mon Mar  6 19:34:32 1995  Yukihiro Matsumoto  (matz@ix-02)</p>

<pre><code>{`* eval.c(inlcude): メソッド化．動的にモジュールをインクルードでき
  るように．さらに任意のオブジェクトにもモジュールをインクルードで
  きるメソッド \`extend'も用意した．

* parse.y: 文法からincludeを削除．メソッド化．
`}</code></pre>

<p>Tue Feb 28 15:35:10 1995  Yukihiro Matsumoto  (matz@ix-02)</p>

<pre><code>{`* parse.y: 配列，連想配列の最後に\`,'をおけるように．
`}</code></pre>

<p>Fri Oct 14 13:22:18 1994  Yukihiro Matsumoto  (matz@ix-02)</p>

<pre><code>{`* version 0.52 released: ……なんてこったい.
`}</code></pre>

<p>Thu Jul 14 11:18:07 1994  Yukihiro Matsumoto  (matz@ix-02)</p>

<pre><code>{`* parse.y: Dictを生成する構文を追加. こちらを{..}にした.

* parse.y: 配列を生成する構文を[..]に変更した. 過去のRubyスクリプ
  トとの互換性が保てないが, Dictを生成する構文を導入するに当たり,
  perl5に合わせて(意識して), 変更する時期は今しかないと考えた. 
  *BACKWARD INCOMPATIBILITY*
`}</code></pre>

<h4 id="todo">ToDo</h4>

<ul>
  <li>format機能</li>
  <li>here document</li>
  <li>re-write regex code for speed</li>
  <li>byte code interpretor</li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(1995, 11, 21))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2>Ruby 0.95 <small>1995-12-21</small></h2>

<p>This is also somewhat arbitrary, but the cache has an entry for it so I’m including it here. Technically the last pre-1.0 release was <code>0.99.4-961224</code>. Between this release and <code>1.0-961225</code>, it’s mostly cleanup and preparation. At this point there are some other contributors, including Jun Kuroda and Hirofumi Watanabe.</p>

<p>The changelog mentions some interesting syntax changes, including changing the <code>defined</code> keyword to include a <code>?</code> since this release now supports <code>?</code> and <code>!</code> at the end of method names. There’s also an amusing anecdote about how the <code>rescue</code> keyword used to be misspelled but that this release fixed the typo. Also included are the <code>not</code> operator, dynamic superclasses, and optional parentheses on method definition arguments, to just name a few.</p>

<p>At this point in the ToDo file we get the addition of an item that says <code>hand written parser (recursive descent)</code>. While this one didn’t end up being executed at any point (Ruby has stuck with the Bison parser generator the entire way through to today) it’s a very interesting thought even with today’s codebase.</p>

<h4 id="grammar">Grammar</h4>

<ul>
  <li><a href="ebnf/0.95.txt">EBNF</a></li>
  <li><a href="diagrams/0.95.xhtml">Diagram</a></li>
</ul>

<h4 id="changelog">ChangeLog</h4>

<p>Thu Nov  9 23:26:01 1995  Yukihiro Matsumoto  <a href="mailto:matz@caelum.co.jp">matz@caelum.co.jp</a></p>

<pre><code>{`* parse.y (f_arglist): メソッド定義の引数を括弧で括らなくても良い
  ようにした．
`}</code></pre>

<p>Wed Nov  8 00:17:51 1995  Yukihiro Matsumoto  <a href="mailto:matz@caelum.co.jp">matz@caelum.co.jp</a></p>

<pre><code>{`* parse.y: class文のsuperclass部を定数から式に拡張した．
`}</code></pre>

<p>Fri Sep  8 14:18:51 1995  Yukihiro Matsumoto  <a href="mailto:matz@caelum.co.jp">matz@caelum.co.jp</a></p>

<pre><code>{`* ruby.texi: \`!', \`?'に対応してアップデート．

* parse.y: defined -&gt; defined?

* parse.y (yylex): 変数名の後ろに\`?'も許す．述語メソッドの後ろに
  \`?'を追加する．
`}</code></pre>

<p>Thu Sep  7 20:01:33 1995  Yukihiro Matsumoto  <a href="mailto:matz@caelum.co.jp">matz@caelum.co.jp</a></p>

<pre><code>{`* parse.y: 変数名の後ろに\`!'を許す．
`}</code></pre>

<p>Mon Aug  7 12:47:41 1995  Yukihiro Matsumoto  <a href="mailto:matz@caelum.co.jp">matz@caelum.co.jp</a></p>

<pre><code>{`* parse.y: resque -&gt; rescue．恥ずかしいがtypoを残しておくわけには
  いかないよなあ．なんで今まで気がつかなかったのか…．
`}</code></pre>

<p>Wed Jun  7 11:58:12 1995  Yukihiro Matsumoto  <a href="mailto:matz@ix-02">matz@ix-02</a></p>

<pre><code>{`* parse.y: not演算子の追加．優先順位の低い\`!'演算子．
`}</code></pre>

<h4 id="todo">ToDo</h4>

<ul>
  <li>Hand written parser(recursive decent)</li>
  <li>format機能</li>
  <li>here document</li>
  <li>re-write regex code for speed</li>
  <li>byte code interpretor</li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(1996, 11, 25))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2>Ruby 1.0.961225 <small>1996-12-25</small></h2>

<p>This is the first public <code>1.0</code> release, released on Christmas of 1996. A couple of things change here since our last entry, most of which include changes that take it from looking like C++ to looking more like the Ruby we know today. For example, the operator that indicates a superclass in a class declaration changes from <code>:</code> to <code>&lt;</code>. Also, the <code>continue</code> keyword gets renamed to <code>next</code>. <code>rescue</code> also gets a boost in utility, as it can now capture the exception as a variable and can rescue multiple exceptions at once. There’s also a very short-lived triple-quoted string that exists for about 2 weeks in the codebase before Matz removed it.</p>

<p>The todo file contains some interesting entries at this point. Beyond the <code>format</code> function that has been on the list for a while, the regex item now gains the “and copyright” suffix. There’s also an entry for access control/packages. This is stil being discussed today, and various efforts have been made to accomplish this in Ruby-space outside of the runtime like <a href="https://github.com/Shopify/packwerk">packwerk</a>.</p>

<h4 id="grammar">Grammar</h4>

<ul>
  <li><a href="ebnf/1.0.961225.txt">EBNF</a></li>
  <li><a href="diagrams/1.0.961225.xhtml">Diagram</a></li>
</ul>

<h4 id="changelog">ChangeLog</h4>

<p>Thu Dec 12 00:41:17 1996  Yukihiro Matsumoto  <a href="mailto:matz@caelum.co.jp">matz@caelum.co.jp</a></p>

<pre><code>{`* parse.y (parse_string): """..."""はやはり無くすことにした
`}</code></pre>

<p>Thu Nov 28 00:59:54 1996  Yukihiro Matsumoto  <a href="mailto:matz@caelum.co.jp">matz@caelum.co.jp</a></p>

<pre><code>{`* version 0.99.3-961128

* parse.y (parse_string): 3-quote styleの文字列(例:"""abc"d"e""")
`}</code></pre>

<p>Thu Aug 29 10:49:40 1996  Yukihiro Matsumoto  <a href="mailto:matz@caelum.co.jp">matz@caelum.co.jp</a></p>

<pre><code>{`* parse.y (expr): イテレータの新形式に「method do .. end」形式を採
  用した．もちろん昔の形式も有効．
`}</code></pre>

<p>Tue Aug 20 13:37:16 1996  Yukihiro Matsumoto  <a href="mailto:matz@caelum.co.jp">matz@caelum.co.jp</a></p>

<pre><code>{`* parse.y (primary): rescueの構文を変更(同定引数の追加，複数rescue)
`}</code></pre>

<p>Thu Jul 25 12:15:04 1996  Yukihiro Matsumoto  <a href="mailto:matz@caelum.co.jp">matz@caelum.co.jp</a></p>

<pre><code>{`* parse.y: break/next/redo/retryのメソッド化．

* parse.y (primary): unless/untilの復活
`}</code></pre>

<p>Wed May 22 19:48:42 1996  Yukihiro Matsumoto  <a href="mailto:matz@caelum.co.jp">matz@caelum.co.jp</a></p>

<pre><code>{`* parse.y (superclass): スーパークラスの指定子を\`:'から\`&lt;'に変更．
`}</code></pre>

<p>Wed Mar 27 10:02:44 1996  Yukihiro Matsumoto  <a href="mailto:matz@caelum.co.jp">matz@caelum.co.jp</a></p>

<pre><code>{`* parse.y: 予約語の変更 continue -&gt; next
`}</code></pre>

<h4 id="todo">ToDo</h4>

<ul>
  <li>パッケージまたは大域変数のアクセス制御</li>
  <li>format機能</li>
  <li>re-write regex code for speed and copyright</li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(1997, 11, 25))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2>Ruby 1.0.971225 <small>1997-12-25</small></h2>

<p>Following in what would eventually become quite a transition, Matz released a new version of Ruby on Christmas 1997. It’s still <code>1.0</code> (this is not yet following semantic versioning) but the suffix has been updated to include the date.</p>

<p>There are a couple of interesting syntactical additions to the language during this time. Regular expressions get a couple of special flags that indicate the character encoding. Perhaps this is one of the best advantages of having this language be created outside of an English-speaking country: encoding was always at the forefront. While we wouldn’t get great encoding support until <code>1.9</code>, even having the option at this point is a win.</p>

<h4 id="changelog">ChangeLog</h4>

<p>Mon Apr  7 11:36:16 1997  Yukihiro Matsumoto  <a href="mailto:matz@caelum.co.jp">matz@caelum.co.jp</a></p>

<pre><code>{`* parse.y (primary): syntax to access singleton class.
`}</code></pre>

<p>Thu Apr  3 02:12:31 1997  Yukihiro Matsumoto  <a href="mailto:matz@caelum.co.jp">matz@caelum.co.jp</a></p>

<pre><code>{`* parse.y (parse_regx): new option //[nes] to specify character
  code for regexp literals.  Last specified code option is valid.
`}</code></pre>

<p>Tue Mar 25 14:08:43 1997  Yukihiro Matsumoto  <a href="mailto:matz@caelum.co.jp">matz@caelum.co.jp</a></p>

<pre><code>{`* parse.y (expr): alias $var1 $var2 makes alias of the global
  variable. 
`}</code></pre>

<p>Fri Mar 14 14:36:28 1997  Yukihiro Matsumoto  <a href="mailto:matz@caelum.co.jp">matz@caelum.co.jp</a></p>

<pre><code>{`* parse.y (yylex): enables negative hex/octal numbers and \`_' in
  non-decimal numbers.
`}</code></pre>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(1998, 11, 24))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2>Ruby 1.3.0 <small>1998-12-24</small></h2>

<p>This is considered a “development” release, and is meant to be used as a branch for the core developers and not used in production. It is released one day before the “stable” <code>1.2.0</code> version. It includes a couple of syntactic additions that are then used for development over the course of the next year before they are included in the <code>1.4.0</code> stable version. They are:</p>

<ul>
  <li><em><code>begin..rescue..else..end</code> clauses</em><br />
<code>rescue</code> already existed, but this provided support for the <code>else</code> keyword in this chain in the case that no exception was raised</li>
  <li><em><code>&lt;&lt;-</code> indentable heredocs</em><br />
heredocs already existed, but you always had to put the ending at the beginning of the line; this change allowed the endings to be indented to the same indentation as the code</li>
  <li><em><code>::</code> method calls</em><br />
effectively an alias for the <code>.</code> operator, there was a convention for a while to call class-level methods with <code>::</code></li>
</ul>

<p>Also interesting to note in this version are 2 new entries in the todo file. The first is “named” arguments (what would eventually become keyword arguments). Though the syntax isn’t what ended up landing <code>:=</code> versus just <code>:</code>, it’s still interesting to see the entry all of the way back here.</p>

<p>Worth noting is the <code>objectify interpreters</code> entry. While I can’t speak to what this would actually look like, what it <em>could</em> be in reference to would be an object that could be accessed from Ruby-space that would accept an AST as an argument and be able to execute the code on demand. Extending this idea to include a reentrant parser, and Matz is effectively referring to the Rubinius project which would be started a little less than a decade later.</p>

<h4 id="changelog">ChangeLog</h4>

<p>Thu Dec 24 00:17:00 1998  Yukihiro Matsumoto  <a href="mailto:matz@netlab.co.jp">matz@netlab.co.jp</a></p>

<pre><code>{`* parse.y (primary): enable expr::identifier as method
  invocation.
`}</code></pre>

<p>Mon Dec  7 22:08:22 1998  Yukihiro Matsumoto  <a href="mailto:matz@netlab.co.jp">matz@netlab.co.jp</a></p>

<pre><code>{`* parse.y (primary): allows \`def obj::foo; .. end'.
`}</code></pre>

<p>Sat Dec  5 23:27:23 1998  Yukihiro Matsumoto  <a href="mailto:matz@netlab.co.jp">matz@netlab.co.jp</a></p>

<pre><code>{`* parse.y (here_document): indentable here-doc delimiter by
  \`&lt;&lt;-'.  Proposed by Clemens &lt;c.hintze@gmx.net&gt;.  Thanks.
`}</code></pre>

<p>Mon Nov 16 23:26:29 1998  Yukihiro Matsumoto  <a href="mailto:matz@netlab.co.jp">matz@netlab.co.jp</a></p>

<pre><code>{`* parse.y (primary): exec else clause if no exception raised.
`}</code></pre>

<p>Wed Oct 14 00:18:33 1998  Yukihiro Matsumoto  <a href="mailto:matz@netlab.co.jp">matz@netlab.co.jp</a></p>

<pre><code>{`* parse.y (when_args): \`when a, *b' style new syntax for array
  expansion in \`case'.
`}</code></pre>

<h4 id="todo">ToDo</h4>

<ul>
  <li>package or access control for global variables</li>
  <li>named arguments like foo(nation:=”german”).</li>
  <li>multiple return values, yield values.  maybe imcompatible</li>
  <li>objectify interpreters</li>
  <li>syntax tree -&gt; bytecode ???</li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(1998, 11, 25))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2>Ruby 1.2.0 <small>1998-12-25</small></h2>

<p>This is a “stable” release, and is meant for production. It’s the first stable release since <code>1.0</code> was released exactly 2 years prior. A lot of new syntax was introduced in those two years, many of which form the foundation of the kind of Ruby that was see today. Here are a couple of the standout entries:</p>

<ul>
  <li><em>heredocs</em><br />
easily one of the most difficult-to-parse syntax constructs gets introduced</li>
  <li><em><code>=begin</code> to <code>=end</code></em><br />
multi-line comments now were easier to manage</li>
  <li><em><code>true</code> and <code>false</code></em><br />
these keywords didn’t actually exist before this point</li>
  <li><em><code>BEGIN</code> and <code>END</code></em><br />
borrowing from awk, this syntax was very useful for scripts</li>
  <li><em><code>%w</code> word lists</em><br />
here we start to see the beginning of the <code>%</code>-lists syntax</li>
  <li><em>top-level constant access</em><br />
you could now prefix a constant with <code>::</code> from within a nested scope to access a top-level constant</li>
  <li><em>block arguments</em><br />
arguments that were themselves blocks would now resolve</li>
  <li><em><code>||=</code> and <code>&amp;&amp;=</code> operators</em><br />
this further extended the assignment operators with <code>||</code> and <code>&amp;&amp;</code> support</li>
</ul>

<p>You can see in the changelog that <code>__END__</code> is no longer a keyword with this release. Over time a lot of the keywords that we have today have flipped back and forth between being methods and being keywords, including <code>next</code> and <code>break</code> (for example).</p>

<h4 id="grammar">Grammar</h4>

<ul>
  <li><a href="ebnf/1.2.1.txt">EBNF</a></li>
  <li><a href="diagrams/1.2.1.xhtml">Diagram</a></li>
</ul>

<h4 id="changelog">ChangeLog</h4>

<p>Wed Jun 24 02:18:57 1998  Yukihiro Matsumoto  <a href="mailto:matz@netlab.co.jp">matz@netlab.co.jp</a></p>

<pre><code>{`* parse.y (mlhs): \`((a,b)),c = [[1,2]],3' assigns a=1,b=2,c=3.
`}</code></pre>

<p>Tue Jun 23 11:46:16 1998  Yukihiro Matsumoto  <a href="mailto:matz@netlab.co.jp">matz@netlab.co.jp</a></p>

<pre><code>{`* parse.y (yylex): \`&amp;&amp;=' and \`||=' added.
`}</code></pre>

<p>Fri Jun 19 14:34:49 1998  Yukihiro Matsumoto  <a href="mailto:matz@netlab.co.jp">matz@netlab.co.jp</a></p>

<pre><code>{`* parse.y (mlhs): nested multiple assignment.
`}</code></pre>

<p>Wed Apr 15 01:22:56 1998  Yukihiro Matsumoto  <a href="mailto:matz@netlab.co.jp">matz@netlab.co.jp</a></p>

<pre><code>{`* parse.y (yylex): allow nested parenthesises.
`}</code></pre>

<p>Wed Mar  4 01:39:52 1998  Yukihiro Matsumoto  <a href="mailto:matz@netlab.co.jp">matz@netlab.co.jp</a></p>

<pre><code>{`* parse.y (block_arg): new syntax - block argument in the
  calling arglist.
`}</code></pre>

<p>Thu Feb 26 17:22:13 1998  Yukihiro Matsumoto  <a href="mailto:matz@netlab.co.jp">matz@netlab.co.jp</a></p>

<pre><code>{`* parse.y (fname): convert reswords into symbols.

* parse.y (reswords): reserved words are now embedded in the
 	  syntax (sigh).

* parse.y: now reserved words can be method names safely.
`}</code></pre>

<p>Fri Feb 20 10:17:51 1998  Yukihiro Matsumoto  <a href="mailto:matz@netlab.co.jp">matz@netlab.co.jp</a></p>

<pre><code>{`* version 1.1b8 released.

* parse.y (stmt): if/unless modifiers returns nil, if condition is 
  not established.
`}</code></pre>

<p>Tue Feb 17 00:04:32 1998  Yukihiro Matsumoto  <a href="mailto:matz@netlab.co.jp">matz@netlab.co.jp</a></p>

<pre><code>{`* parse.y (yylex): new form \`::Const' to see toplevel constants.
`}</code></pre>

<p>Tue Jan 20 15:19:59 1998  Yukihiro Matsumoto  <a href="mailto:matz@netlab.co.jp">matz@netlab.co.jp</a></p>

<pre><code>{`* parse.y (terms): quoted word list by %w(a b c).
`}</code></pre>

<p>Fri Dec 12 00:50:25 1997  Yukihiro Matsumoto  <a href="mailto:matz@netlab.co.jp">matz@netlab.co.jp</a></p>

<pre><code>{`* parse.y (expr): BEGIN/END built in the syntax.
`}</code></pre>

<p>Thu Oct  9 11:17:50 1997  Yukihiro Matsumoto  <a href="mailto:matz@netlab.co.jp">matz@netlab.co.jp</a></p>

<pre><code>{`* parse.y (nextc): script parsing will be terminated by __END__ at
 	  beginning of line.

* eval.c (compile_error): \`__END__' is no longer a keyword.
`}</code></pre>

<p>Tue Sep 30 10:27:39 1997  Yukihiro Matsumoto  <a href="mailto:matz@netlab.co.jp">matz@netlab.co.jp</a></p>

<pre><code>{`* parse.y: new keywords \`true' and \`false' added.
`}</code></pre>

<p>Wed Aug 27 11:32:42 1997  Yukihiro Matsumoto  <a href="mailto:matz@netlab.co.jp">matz@netlab.co.jp</a></p>

<pre><code>{`* version 1.1 alpha3 released.

* parse.y (here_document): finally here document available now.
`}</code></pre>

<h4 id="todo">ToDo</h4>

<ul>
  <li>package or access control for global variables</li>
  <li>format</li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(1999, 7, 13))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2>Ruby 1.4.0 <small>1999-08-13</small></h2>

<p>This is another stable release that follows a little less than a year after <code>1.2.0</code>. Not a huge amount changes with regard to syntax between the two versions, though there are lots of changes elsewhere in the codebase. The changes that were included were:</p>

<ul>
  <li><em>binary number literals</em><br />
you can now write number literals with the <code>0b</code> prefix</li>
  <li><em>anonymous <code>*</code> in method definitions</em><br />
you now don’t need to put an explicit name on splat arguments in method definitions</li>
  <li><em>nested string interpolation</em><br />
you used to not be able to do string interpolation within string interplation, but that was fixed here</li>
  <li><em>multibyte character identifiers</em><br />
there are now explicit multibyte character identifiers - this is more work toward supporting different encodings, but we won’t truly get there until <code>1.9</code></li>
</ul>

<p>The todo file got a lot longer in this version. Below is just a snippet that relates to parsing, but in reality there were multiple sections added. You can see entries that we already had like the packaging system, named arguments, and objectify interpreters. There are also some new entries like <code>class variable</code> (what ended up becoming <code>@@variable</code>), <code>method to retrieve argument information</code> (this could be referring to method calls, but I think it’s referring to method parameters on the declaration, which would eventually become <code>Method#parameters</code>), and <code>compile time string concatenation</code> (which we eventually get where <code>"foo" "bar"</code> becomes <code>"foobar"</code>).</p>

<h4 id="grammar">Grammar</h4>

<ul>
  <li><a href="ebnf/1.4.0.txt">EBNF</a></li>
  <li><a href="diagrams/1.4.0.xhtml">Diagram</a></li>
</ul>

<h4 id="changelog">ChangeLog</h4>

<p>Thu Jun 24 19:11:29 1999  Yoshida Masato  <a href="mailto:yoshidam@yoshidam.net">yoshidam@yoshidam.net</a></p>

<pre><code>{`* parse.y (yylex): support multi-byte char identifiers.
`}</code></pre>

<p>Wed Jun 23 15:10:11 1999  Inaba Hiroto  <a href="mailto:inaba@sdd.tokyo-sc.toshiba.co.jp">inaba@sdd.tokyo-sc.toshiba.co.jp</a></p>

<pre><code>{`* parse.y (parse_regx): nested braces within #{} available.
`}</code></pre>

<p>Wed May 19 12:27:07 1999  Yukihiro Matsumoto  <a href="mailto:matz@netlab.co.jp">matz@netlab.co.jp</a></p>

<pre><code>{`* parse.y (f_rest_arg): allow just * for rest arg.

* parse.y (mlhs_basic): allow * without formal argument.
`}</code></pre>

<p>Fri Feb  5 22:11:08 1999  EGUCHI Osamu  <a href="mailto:eguchi@shizuokanet.ne.jp">eguchi@shizuokanet.ne.jp</a></p>

<pre><code>{`* parse.y (yylex): binary literal support, like 0b01001.

* parse.y (yylex): octal numbers can contain \`_'s.

* parse.y (yylex): now need at least one digit after prefix such
  as 0x, or 0b.

* bignum.c (rb_str2inum): recognize binary numbers like 0b0101.
`}</code></pre>

<h4 id="todo">ToDo</h4>

<ul>
  <li>compile time string concatenation, “hello” “world” =&gt; “helloworld”</li>
  <li>../… outside condition invokes operator method too.</li>
  <li>%w(a\ b\ c abc) =&gt; [“a b c”, “abc”]</li>
  <li>package or access control for global variables</li>
  <li>class variable (prefix?)</li>
  <li>named arguments like foo(nation:=”german”) or foo(nation: “german”).</li>
  <li>method to retrieve argument information (need new C API)</li>
  <li>multiple return values, yield values.  maybe incompatible ???</li>
  <li>cascading method invocation ???</li>
  <li>def Class#method .. end ??</li>
  <li>class Foo::Bar&lt;Baz .. end, module Boo::Bar .. end</li>
  <li>def Foo::Bar::baz() .. end ??</li>
  <li>objectify interpreters</li>
  <li>syntax tree -&gt; bytecode ???</li>
  <li>format like perl’s</li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(2000, 8, 19))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2>Ruby 1.6.0 <small>2000-09-19</small></h2>

<p>A little over a year has passed since <code>1.4.0</code>, which means it’s time for another stable release. Only one thing really changed with the syntax between the two versions, which is that <code>rescue</code> can now be used in the modifier form like the conditionals and loops.</p>

<h4 id="grammar">Grammar</h4>

<ul>
  <li><a href="ebnf/1.6.0.txt">EBNF</a></li>
  <li><a href="diagrams/1.6.0.xhtml">Diagram</a></li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(2001, 0, 10))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2><a href="https://sourceforge.net/projects/rubyvm/files/ruth/">Robert Feldt releases v0.0.1 of Ruth</a> <small>2001-01-10</small></h2>

<ul>
  <li>Extends Ruby 1.6 internals to support inspecting Ruby ASTs</li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(2001, 9, 20))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2><a href="https://i.loveruby.net/archive/ripper/">Minero Aoki releases v0.0.1 of ripper</a> <small>2001-10-20</small></h2>
  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(2002, 9, 9))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2><a href="http://artengine.ca/matju/MetaRuby/">Mathieu Bouchard releases v0.7.0 of MetaRuby</a> <small>2002-10-09</small></h2>

<ul>
  <li>Includes <code>RubySchema.rb</code>, a schema for validating Ruby ASTs</li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(2003, 0, 14))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2><a href="http://bruby.osdn.jp/">Yuya Kato releases v0.0.1 of bruby</a> <small>2003-01-14</small></h2>

<ul>
  <li>Extends Ruby 1.6 internals to support dumping and loading a Ruby AST to a binary format</li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(2003, 7, 4))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2>Ruby 1.8.0 <small>2003-08-04</small></h2>

<p>A lot happens between <code>1.6</code> and <code>1.8</code>.</p>

<ul>
  <li><em><code>%W</code> word lists with interpolation</em></li>
  <li><em>dynamic symbols</em></li>
  <li><em><code>break</code> and <code>next</code> take values</em></li>
  <li><em>nested class definition</em></li>
  <li><em>nested constant assignment</em></li>
</ul>

<h4 id="grammar">Grammar</h4>

<ul>
  <li><a href="ebnf/1.8.0.txt">EBNF</a></li>
  <li><a href="diagrams/1.8.0.xhtml">Diagram</a></li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(2004, 10, 10))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2><a href="https://github.com/seattlerb/parsetree">Ryan Davis releases v1.0.0 of ParseTree</a> <small>2004-11-10</small></h2>

<ul>
  <li>Extends Ruby 1.8 internals to support returning an AST by converting to Ruby objects</li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(2006, 5, 5))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2><a href="https://web.archive.org/web/20060630155424/http://rubynode.rubyforge.org/">Dominik Bathon releases v0.1.0 of RubyNode</a> <small>2006-06-05</small></h2>

<ul>
  <li>Extends Ruby 1.8 internals to support returning an AST by wrapping the NODE struct</li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(2007, 10, 14))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2><a href="https://github.com/seattlerb/ruby_parser">Ryan Davis releases v1.0.0 of ruby_parser</a> <small>2007-11-14</small></h2>

<ul>
  <li>Uses a <code>racc</code>-based compiler to generate s-expressions</li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(2007, 11, 25))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2>Ruby 1.9.0 <small>2007-12-25</small></h2>

<ul>
  <li><code>YARV</code></li>
  <li>Block local variables</li>
  <li>Lambda literals</li>
  <li>Symbol hash keys</li>
  <li><a href="https://svn.ruby-lang.org/cgi-bin/viewvc.cgi?view=revision&amp;revision=6891"><code>ripper</code> merged</a></li>
</ul>

<h4 id="grammar">Grammar</h4>

<ul>
  <li><a href="ebnf/1.9.0.txt">EBNF</a></li>
  <li><a href="diagrams/1.9.0.xhtml">Diagram</a></li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(2009, 0, 30))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2>Ruby 1.9.1 <small>2009-01-30</small></h2>

<ul>
  <li><em>encoding pragma</em></li>
  <li><code>.()</code> sugar for <code>.call</code></li>
  <li><em>post arguments</em></li>
  <li><em>block in block arguments</em></li>
</ul>

<h4 id="grammar">Grammar</h4>

<ul>
  <li><a href="ebnf/1.9.1.txt">EBNF</a></li>
  <li><a href="diagrams/1.9.1.xhtml">Diagram</a></li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(2009, 6, 25))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2><a href="http://rubystuff.org/nodewrap/">Paul Brannan releases v0.5.0 of nodewrap</a> <small>2009-07-25</small></h2>

<ul>
  <li>Allows dumping/loading the Ruby nodes and instruction sequences to a binary format</li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(2010, 7, 27))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2><a href="https://github.com/michaeledgar/laser">Michael Edgar releases v0.0.1 of laser</a> <small>2010-08-27</small></h2>

<ul>
  <li>Originally parsed regular expressions then <code>Ripper</code> to parse Ruby</li>
  <li>Features a type system, semantic analysis, documentation generation, and a plugin system</li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(2011, 2, 22))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2>JIS X 3017 <small>2011-03-22</small></h2>
  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(2011, 9, 31))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2>Ruby 1.9.3 <small>2011-10-31</small></h2>

<ul>
  <li><em>trailing commas</em></li>
</ul>

<h4 id="grammar">Grammar</h4>

<ul>
  <li><a href="ebnf/1.9.3.txt">EBNF</a></li>
  <li><a href="diagrams/1.9.3.xhtml">Diagram</a></li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(2012, 3, 15))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2>ISO/IEC 30170:2012 <small>2012-04-15</small></h2>
  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(2013, 1, 24))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2>Ruby 2.0.0 <small>2013-02-24</small></h2>

<ul>
  <li><a href="https://bugs.ruby-lang.org/issues/1102"><code>Module#prepend</code></a></li>
  <li><a href="https://bugs.ruby-lang.org/issues/4085">Refinements</a></li>
  <li><a href="https://bugs.ruby-lang.org/issues/4985"><code>%i</code> symbol lists</a></li>
  <li><a href="https://bugs.ruby-lang.org/issues/5474">Keyword arguments</a></li>
</ul>

<h4 id="grammar">Grammar</h4>

<ul>
  <li><a href="ebnf/2.0.0.txt">EBNF</a></li>
  <li><a href="diagrams/2.0.0.xhtml">Diagram</a></li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(2013, 3, 15))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2><a href="https://github.com/whitequark/parser">Peter Zotov releases v0.9.0 of parser</a> <small>2013-04-15</small></h2>

<ul>
  <li>Derives a new parser from <code>parse.y</code> in Ruby and a lexer test suite from <code>ruby_parser</code></li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(2013, 11, 25))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2>Ruby 2.1.0 <small>2013-12-25</small></h2>

<ul>
  <li><a href="https://bugs.ruby-lang.org/issues/7701">Required keyword arguments</a></li>
  <li><a href="https://bugs.ruby-lang.org/issues/8430">Rational and complex literals</a></li>
  <li><a href="https://bugs.ruby-lang.org/issues/8579">Frozen string literal suffix</a></li>
</ul>

<h4 id="grammar">Grammar</h4>

<ul>
  <li><a href="ebnf/2.1.0.txt">EBNF</a></li>
  <li><a href="diagrams/2.1.0.xhtml">Diagram</a></li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(2014, 11, 25))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2>Ruby 2.2.0 <small>2014-12-25</small></h2>

<ul>
  <li><a href="https://bugs.ruby-lang.org/issues/4276">Dynamic symbol hash keys</a></li>
</ul>

<h4 id="grammar">Grammar</h4>

<ul>
  <li><a href="ebnf/2.2.0.txt">EBNF</a></li>
  <li><a href="diagrams/2.2.0.xhtml">Diagram</a></li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(2015, 11, 25))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2>Ruby 2.3.0 <small>2015-12-25</small></h2>

<ul>
  <li><a href="https://bugs.ruby-lang.org/issues/8976">frozen_string_literal pragma</a></li>
  <li><a href="https://bugs.ruby-lang.org/issues/9098"><code>&lt;&lt;~</code> heredocs</a></li>
  <li><a href="https://bugs.ruby-lang.org/issues/11537"><code>&amp;.</code> operator</a></li>
</ul>

<h4 id="grammar">Grammar</h4>

<ul>
  <li><a href="ebnf/2.3.0.txt">EBNF</a></li>
  <li><a href="diagrams/2.3.0.xhtml">Diagram</a></li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(2016, 11, 25))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2>Ruby 2.4.0 <small>2016-12-25</small></h2>

<ul>
  <li><a href="https://bugs.ruby-lang.org/issues/4840">Top level return</a></li>
  <li><a href="https://bugs.ruby-lang.org/issues/9451">Refinements in <code>Symbol#to_proc</code></a></li>
  <li><a href="https://bugs.ruby-lang.org/issues/10617">Multiple assignment in a conditional</a></li>
</ul>

<h4 id="grammar">Grammar</h4>

<ul>
  <li><a href="ebnf/2.4.0.txt">EBNF</a></li>
  <li><a href="diagrams/2.4.0.xhtml">Diagram</a></li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(2017, 11, 25))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2>Ruby 2.5.0 <small>2017-12-25</small></h2>

<ul>
  <li><a href="https://bugs.ruby-lang.org/issues/12906"><code>rescue</code> and <code>ensure</code> at the block level</a></li>
  <li><a href="https://bugs.ruby-lang.org/issues/13812">Refinements in string interpolations</a></li>
</ul>

<h4 id="grammar">Grammar</h4>

<ul>
  <li><a href="ebnf/2.5.0.txt">EBNF</a></li>
  <li><a href="diagrams/2.5.0.xhtml">Diagram</a></li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(2018, 11, 25))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2>Ruby 2.6.0 <small>2018-12-25</small></h2>

<ul>
  <li><a href="https://bugs.ruby-lang.org/issues/5400">Flip-flop (deprecated)</a></li>
  <li><a href="https://bugs.ruby-lang.org/issues/12912">Endless range</a></li>
  <li><a href="https://bugs.ruby-lang.org/issues/13770">Non-ASCII constant names</a></li>
  <li><a href="https://github.com/ruby/ruby/commit/0f3dcbdf38db6c7fb04ca0833bb1f9af2c3e7ca4">RubyVM::AbstractSyntaxTree</a></li>
  <li><a href="https://bugs.ruby-lang.org/issues/6354">Escape keywords from class/module scope removed</a></li>
</ul>

<h4 id="grammar">Grammar</h4>

<ul>
  <li><a href="ebnf/2.6.0.txt">EBNF</a></li>
  <li><a href="diagrams/2.6.0.xhtml">Diagram</a></li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(2019, 11, 25))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2>Ruby 2.7.0 <small>2019-12-25</small></h2>

<ul>
  <li><a href="https://bugs.ruby-lang.org/issues/5400">Flip-flop (undeprecated)</a></li>
  <li><a href="https://bugs.ruby-lang.org/issues/13581">Method reference operator (added)</a></li>
  <li><a href="https://bugs.ruby-lang.org/issues/14183">Keyword arguments (warning about hash-based)</a></li>
  <li><a href="https://bugs.ruby-lang.org/issues/14183">No other keywords syntax</a></li>
  <li><a href="https://bugs.ruby-lang.org/issues/14799">Beginless range</a></li>
  <li><a href="https://bugs.ruby-lang.org/issues/14912">Pattern matching</a></li>
  <li><a href="https://bugs.ruby-lang.org/issues/15723">Numbered parameters</a></li>
  <li><a href="https://bugs.ruby-lang.org/issues/15921">Rightward assignment</a></li>
  <li><a href="https://bugs.ruby-lang.org/issues/16253">Argument forwarding</a></li>
  <li><a href="https://bugs.ruby-lang.org/issues/16275">Method reference operator (removed)</a></li>
</ul>

<h4 id="grammar">Grammar</h4>

<ul>
  <li><a href="ebnf/2.7.0.txt">EBNF</a></li>
  <li><a href="diagrams/2.7.0.xhtml">Diagram</a></li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>
<TimelineEntry date={new Date(Date.UTC(2020, 11, 25))}>
  <RubyMarker />
  <TimelineEntryTooltip>
    <h2>Ruby 3.0.0 <small>2020-12-25</small></h2>

<ul>
  <li><a href="https://bugs.ruby-lang.org/issues/14183">Keyword arguments (non-hash-based)</a></li>
  <li><a href="https://bugs.ruby-lang.org/issues/16746">Single-line methods</a></li>
  <li><a href="https://bugs.ruby-lang.org/issues/16828">Find pattern matching</a></li>
  <li><a href="https://bugs.ruby-lang.org/issues/17273">shareable_constant_value pragma</a></li>
  <li><a href="https://bugs.ruby-lang.org/issues/17371"><code>in</code> pattern matching</a></li>
</ul>

<h4 id="grammar">Grammar</h4>

<ul>
  <li><a href="ebnf/3.0.0.txt">EBNF</a></li>
  <li><a href="diagrams/3.0.0.xhtml">Diagram</a></li>
</ul>

  </TimelineEntryTooltip>
</TimelineEntry>

        </TimelineLine>
      </RubyTimeline>
    </Timeline>
  </div>
);

export default App;
