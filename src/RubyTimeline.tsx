import React from "react";

import { Timeline, TimelineEntry, TimelineMarker, TimelineTooltip } from "./display/Timeline";
import { Modal, ModalTrigger, ModalContent } from "./display/Modal";
import RubyMarker from "./RubyMarker";

const RubyTimeline: React.FC = () => (
  <Timeline>
    <TimelineEntry date={new Date(Date.UTC(1994, 0, 7))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(1995, 4, 19))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(1995, 11, 21))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(1996, 11, 25))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(1998, 11, 24))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <p><code>begin..rescue..else</code> clauses</p>
        <p><code>&lt;&lt;-</code> indentable heredocs</p>
        <p><code>::</code> method calls</p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(1998, 11, 25))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <p>Heredocs</p>
        <p><code>=begin</code> to <code>=end</code></p>
        <p><code>true</code> and <code>false</code></p>
        <p><code>BEGIN</code> and <code>END</code></p>
        <p><code>%w</code> word lists</p>
        <p>Top-level constant access</p>
        <p>Block arguments</p>
        <p><code>||=</code> and <code>&amp;&amp;=</code> operators</p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(1999, 7, 13))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <p>Binary number literals</p>
        <p>Anonymous <code>*</code> in method definitions</p>
        <p>Nested string interpolation</p>
        <p>Multibyte character identifiers</p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2000, 8, 19))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <p><code>rescue</code> modifier</p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2003, 7, 4))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <p><code>%W</code> word lists with interpolation</p>
        <p>Dynamic symbols</p>
        <p><code>break</code> and <code>next</code> take values</p>
        <p>Nested class definition</p>
        <p>Nested constant assignment</p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2007, 11, 25))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <p><code>YARV</code></p>
        <p>Block local variables</p>
        <p>Lambda literals</p>
        <p>Symbol hash keys</p>
        <p><a href="https://svn.ruby-lang.org/cgi-bin/viewvc.cgi?view=revision&amp;revision=6891"><code>ripper</code> merged</a></p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2009, 0, 30))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <p>Encoding pragma</p>
        <p><code>.()</code> sugar for <code>.call</code></p>
        <p>Post arguments</p>
        <p>Block in block arguments</p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2011, 9, 31))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <p>Trailing commas</p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2013, 1, 24))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <p><a href="https://bugs.ruby-lang.org/issues/1102"><code>Module#prepend</code></a></p>
        <p><a href="https://bugs.ruby-lang.org/issues/4085">Refinements</a></p>
        <p><a href="https://bugs.ruby-lang.org/issues/4985"><code>%i</code> symbol lists</a></p>
        <p><a href="https://bugs.ruby-lang.org/issues/5474">Keyword arguments</a></p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2013, 11, 25))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <p><a href="https://bugs.ruby-lang.org/issues/7701">Required keyword arguments</a></p>
        <p><a href="https://bugs.ruby-lang.org/issues/8430">Rational and complex literals</a></p>
        <p><a href="https://bugs.ruby-lang.org/issues/8579">Frozen string literal suffix</a></p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2014, 11, 25))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <p><a href="https://bugs.ruby-lang.org/issues/4276">Dynamic symbol hash keys</a></p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2015, 11, 25))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <p><a href="https://bugs.ruby-lang.org/issues/8976">frozen_string_literal pragma</a></p>
        <p><a href="https://bugs.ruby-lang.org/issues/9098"><code>&lt;&lt;~</code> heredocs</a></p>
        <p><a href="https://bugs.ruby-lang.org/issues/11537"><code>&amp;.</code> operator</a></p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2016, 11, 25))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <p><a href="https://bugs.ruby-lang.org/issues/4840">Top level return</a></p>
        <p><a href="https://bugs.ruby-lang.org/issues/9451">Refinements in <code>Symbol#to_proc</code></a></p>
        <p><a href="https://bugs.ruby-lang.org/issues/10617">Multiple assignment in a conditional</a></p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2017, 11, 25))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <p><a href="https://bugs.ruby-lang.org/issues/12906"><code>rescue</code> and <code>ensure</code> at the block level</a></p>
        <p><a href="https://bugs.ruby-lang.org/issues/13812">Refinements in string interpolations</a></p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2018, 11, 25))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <p><a href="https://bugs.ruby-lang.org/issues/5400">Flip-flop (deprecated)</a></p>
        <p><a href="https://bugs.ruby-lang.org/issues/12912">Endless range</a></p>
        <p><a href="https://bugs.ruby-lang.org/issues/13770">Non-ASCII constant names</a></p>
        <p><a href="https://github.com/ruby/ruby/commit/0f3dcbdf38db6c7fb04ca0833bb1f9af2c3e7ca4">RubyVM::AbstractSyntaxTree</a></p>
        <p><a href="https://bugs.ruby-lang.org/issues/6354">Escape keywords from class/module scope removed</a></p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2019, 11, 25))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <p><a href="https://bugs.ruby-lang.org/issues/5400">Flip-flop (undeprecated)</a></p>
        <p><a href="https://bugs.ruby-lang.org/issues/13581">Method reference operator (added)</a></p>
        <p><a href="https://bugs.ruby-lang.org/issues/14183">Keyword arguments (warning about hash-based)</a></p>
        <p><a href="https://bugs.ruby-lang.org/issues/14183">No other keywords syntax</a></p>
        <p><a href="https://bugs.ruby-lang.org/issues/14799">Beginless range</a></p>
        <p><a href="https://bugs.ruby-lang.org/issues/14912">Pattern matching</a></p>
        <p><a href="https://bugs.ruby-lang.org/issues/15723">Numbered parameters</a></p>
        <p><a href="https://bugs.ruby-lang.org/issues/15921">Rightward assignment</a></p>
        <p><a href="https://bugs.ruby-lang.org/issues/16253">Argument forwarding</a></p>
        <p><a href="https://bugs.ruby-lang.org/issues/16275">Method reference operator (removed)</a></p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2020, 11, 25))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <p><a href="https://bugs.ruby-lang.org/issues/14183">Keyword arguments (non-hash-based)</a></p>
        <p><a href="https://bugs.ruby-lang.org/issues/16746">Single-line methods</a></p>
        <p><a href="https://bugs.ruby-lang.org/issues/16828">Find pattern matching</a></p>
        <p><a href="https://bugs.ruby-lang.org/issues/17273">shareable_constant_value pragma</a></p>
        <p><a href="https://bugs.ruby-lang.org/issues/17371"><code>in</code> pattern matching</a></p>
      </TimelineTooltip>
    </TimelineEntry>
  </Timeline>
);

export default RubyTimeline;
