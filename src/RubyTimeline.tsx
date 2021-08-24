import React from "react";

import { Timeline, TimelineEntry, TimelineMarker, TimelineTooltip } from "./Timeline";
import RubyMarker from "./RubyMarker";
import RubyTooltip from "./RubyTooltip";

const RubyTimeline: React.FC = () => (
  <Timeline startDate={new Date(Date.UTC(1993, 0, 1))} endDate={new Date(Date.UTC(2021, 11, 31))}>
    <TimelineEntry date={new Date(Date.UTC(1994, 0, 7))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2>Ruby 0.06 <small>1994-01-07</small></h2>
          
          <p>This is the earliest <a href="https://cache.ruby-lang.org/pub/ruby/1.0/ChangeLog-pre-alpha">changelog entry</a> that I could find that had an explicit version on it. At this point Ruby was still a very early idea and the syntax was changing rapidly.</p>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(1995, 4, 19))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2>Ruby 0.76 <small>1995-05-19</small></h2>
          
          <p>The changelog here is still entirely Yukihiro Matsumoto. It’s been a year since the last entry on this timeline and a ton has changed. Th choice of including <code>0.76</code> is somewhat arbitrary here. It’s just that <a href="https://cache.ruby-lang.org">https://cache.ruby-lang.org</a> happens to have a tar file containing that particular release.</p>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(1995, 11, 21))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2>Ruby 0.95 <small>1995-12-21</small></h2>
          
          <p>This is also somewhat arbitrary, but the cache has an entry for it so I’m including it here. Technically the last pre-1.0 release was <code>0.99.4-961224</code>. Between this release and <code>1.0-961225</code>, it’s mostly cleanup and preparation. At this point there are some other contributors, including Jun Kuroda and Hirofumi Watanabe.</p>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(1996, 11, 25))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2>Ruby 1.0-961225 <small>1996-12-25</small></h2>
          
          <p>This is the first public <code>1.0</code> release.</p>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(1998, 11, 24))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
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
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(1998, 11, 25))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2>Ruby 1.2.0 <small>1998-12-25</small></h2>
          
          <p>This is a “stable” release, and is meant for production. It’s the first stable release since <code>1.0</code> was released exactly 2 years prior. A lot of new syntax was introduced in those two years, many of which form the foundation of the kind of Ruby that was see today. This includes:</p>
          
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
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(1999, 7, 13))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2>Ruby 1.4.0 <small>1999-08-13</small></h2>
          
          <ul>
            <li>Binary number literals</li>
            <li>Anonymous <code>*</code> in method definitions</li>
            <li>Nested string interpolation</li>
            <li>Multibyte character identifiers</li>
          </ul>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2000, 8, 19))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2>Ruby 1.6.0 <small>2000-09-19</small></h2>
          
          <ul>
            <li><code>rescue</code> modifier</li>
          </ul>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2003, 7, 4))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2>Ruby 1.8.0 <small>2003-08-04</small></h2>
          
          <ul>
            <li><code>%W</code> word lists with interpolation</li>
            <li>Dynamic symbols</li>
            <li><code>break</code> and <code>next</code> take values</li>
            <li>Nested class definition</li>
            <li>Nested constant assignment</li>
          </ul>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2007, 11, 25))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2>Ruby 1.9.0 <small>2007-12-25</small></h2>
          
          <ul>
            <li><code>YARV</code></li>
            <li>Block local variables</li>
            <li>Lambda literals</li>
            <li>Symbol hash keys</li>
            <li><a href="https://svn.ruby-lang.org/cgi-bin/viewvc.cgi?view=revision&amp;revision=6891"><code>ripper</code> merged</a></li>
          </ul>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2009, 0, 30))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2>Ruby 1.9.1 <small>2009-01-30</small></h2>
          
          <ul>
            <li>Encoding pragma</li>
            <li><code>.()</code> sugar for <code>.call</code></li>
            <li>Post arguments</li>
            <li>Block in block arguments</li>
          </ul>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2011, 9, 31))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2>Ruby 1.9.3 <small>2011-10-31</small></h2>
          
          <ul>
            <li>Trailing commas</li>
          </ul>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2013, 1, 24))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2>Ruby 2.0.0 <small>2013-02-24</small></h2>
          
          <ul>
            <li><a href="https://bugs.ruby-lang.org/issues/1102"><code>Module#prepend</code></a></li>
            <li><a href="https://bugs.ruby-lang.org/issues/4085">Refinements</a></li>
            <li><a href="https://bugs.ruby-lang.org/issues/4985"><code>%i</code> symbol lists</a></li>
            <li><a href="https://bugs.ruby-lang.org/issues/5474">Keyword arguments</a></li>
          </ul>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2013, 11, 25))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2>Ruby 2.1.0 <small>2013-12-25</small></h2>
          
          <ul>
            <li><a href="https://bugs.ruby-lang.org/issues/7701">Required keyword arguments</a></li>
            <li><a href="https://bugs.ruby-lang.org/issues/8430">Rational and complex literals</a></li>
            <li><a href="https://bugs.ruby-lang.org/issues/8579">Frozen string literal suffix</a></li>
          </ul>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2014, 11, 25))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2>Ruby 2.2.0 <small>2014-12-25</small></h2>
          
          <ul>
            <li><a href="https://bugs.ruby-lang.org/issues/4276">Dynamic symbol hash keys</a></li>
          </ul>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2015, 11, 25))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2>Ruby 2.3.0 <small>2015-12-25</small></h2>
          
          <ul>
            <li><a href="https://bugs.ruby-lang.org/issues/8976">frozen_string_literal pragma</a></li>
            <li><a href="https://bugs.ruby-lang.org/issues/9098"><code>&lt;&lt;~</code> heredocs</a></li>
            <li><a href="https://bugs.ruby-lang.org/issues/11537"><code>&amp;.</code> operator</a></li>
          </ul>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2016, 11, 25))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2>Ruby 2.4.0 <small>2016-12-25</small></h2>
          
          <ul>
            <li><a href="https://bugs.ruby-lang.org/issues/4840">Top level return</a></li>
            <li><a href="https://bugs.ruby-lang.org/issues/9451">Refinements in <code>Symbol#to_proc</code></a></li>
            <li><a href="https://bugs.ruby-lang.org/issues/10617">Multiple assignment in a conditional</a></li>
          </ul>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2017, 11, 25))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2>Ruby 2.5.0 <small>2017-12-25</small></h2>
          
          <ul>
            <li><a href="https://bugs.ruby-lang.org/issues/12906"><code>rescue</code> and <code>ensure</code> at the block level</a></li>
            <li><a href="https://bugs.ruby-lang.org/issues/13812">Refinements in string interpolations</a></li>
          </ul>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2018, 11, 25))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2>Ruby 2.6.0 <small>2018-12-25</small></h2>
          
          <ul>
            <li><a href="https://bugs.ruby-lang.org/issues/5400">Flip-flop (deprecated)</a></li>
            <li><a href="https://bugs.ruby-lang.org/issues/12912">Endless range</a></li>
            <li><a href="https://bugs.ruby-lang.org/issues/13770">Non-ASCII constant names</a></li>
            <li><a href="https://github.com/ruby/ruby/commit/0f3dcbdf38db6c7fb04ca0833bb1f9af2c3e7ca4">RubyVM::AbstractSyntaxTree</a></li>
            <li><a href="https://bugs.ruby-lang.org/issues/6354">Escape keywords from class/module scope removed</a></li>
          </ul>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2019, 11, 25))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
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
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2020, 11, 25))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2>Ruby 3.0.0 <small>2020-12-25</small></h2>
          
          <ul>
            <li><a href="https://bugs.ruby-lang.org/issues/14183">Keyword arguments (non-hash-based)</a></li>
            <li><a href="https://bugs.ruby-lang.org/issues/16746">Single-line methods</a></li>
            <li><a href="https://bugs.ruby-lang.org/issues/16828">Find pattern matching</a></li>
            <li><a href="https://bugs.ruby-lang.org/issues/17273">shareable_constant_value pragma</a></li>
            <li><a href="https://bugs.ruby-lang.org/issues/17371"><code>in</code> pattern matching</a></li>
          </ul>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2001, 0, 10))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2><a href="https://sourceforge.net/projects/rubyvm/files/ruth/">Robert Feldt releases v0.0.1 of Ruth</a> <small>2001-01-10</small></h2>
          
          <ul>
            <li>Extends Ruby 1.6 internals to support inspecting Ruby ASTs</li>
          </ul>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2001, 9, 20))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2><a href="https://i.loveruby.net/archive/ripper/">Minero Aoki releases v0.0.1 of ripper</a> <small>2001-10-20</small></h2>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2002, 9, 9))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2><a href="http://artengine.ca/matju/MetaRuby/">Mathieu Bouchard releases v0.7.0 of MetaRuby</a> <small>2002-10-09</small></h2>
          
          <ul>
            <li>Includes <code>RubySchema.rb</code>, a schema for validating Ruby ASTs</li>
          </ul>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2003, 0, 14))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2><a href="http://bruby.osdn.jp/">Yuya Kato releases v0.0.1 of bruby</a> <small>2003-01-14</small></h2>
          
          <ul>
            <li>Extends Ruby 1.6 internals to support dumping and loading a Ruby AST to a binary format</li>
          </ul>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2004, 10, 10))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2><a href="https://github.com/seattlerb/parsetree">Ryan Davis releases v1.0.0 of ParseTree</a> <small>2004-11-10</small></h2>
          
          <ul>
            <li>Extends Ruby 1.8 internals to support returning an AST by converting to Ruby objects</li>
          </ul>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2006, 5, 5))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2><a href="https://web.archive.org/web/20060630155424/http://rubynode.rubyforge.org/">Dominik Bathon releases v0.1.0 of RubyNode</a> <small>2006-06-05</small></h2>
          
          <ul>
            <li>Extends Ruby 1.8 internals to support returning an AST by wrapping the NODE struct</li>
          </ul>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2007, 10, 14))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2><a href="https://github.com/seattlerb/ruby_parser">Ryan Davis releases v1.0.0 of ruby_parser</a> <small>2007-11-14</small></h2>
          
          <ul>
            <li>Uses a <code>racc</code>-based compiler to generate s-expressions</li>
          </ul>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2009, 6, 25))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2><a href="http://rubystuff.org/nodewrap/">Paul Brannan releases v0.5.0 of nodewrap</a> <small>2009-07-25</small></h2>
          
          <ul>
            <li>Allows dumping/loading the Ruby nodes and instruction sequences to a binary format</li>
          </ul>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2010, 7, 27))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2><a href="https://github.com/michaeledgar/laser">Michael Edgar releases v0.0.1 of laser</a> <small>2010-08-27</small></h2>
          
          <ul>
            <li>Originally parsed regular expressions then <code>Ripper</code> to parse Ruby</li>
            <li>Features a type system, semantic analysis, documentation generation, and a plugin system</li>
          </ul>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2013, 3, 15))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2><a href="https://github.com/whitequark/parser">Peter Zotov releases v0.9.0 of parser</a> <small>2013-04-15</small></h2>
          
          <ul>
            <li>Derives a new parser from <code>parse.y</code> in Ruby and a lexer test suite from <code>ruby_parser</code></li>
          </ul>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2011, 2, 22))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <RubyTooltip>
          <h2>JIS X 3017 <small>2011-03-22</small></h2>
        </RubyTooltip>
      </TimelineTooltip>
    </TimelineEntry>
  </Timeline>
);

export default RubyTimeline;
