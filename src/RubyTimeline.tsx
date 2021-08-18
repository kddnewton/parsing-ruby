import React from "react";

import { Timeline, TimelineEntry, TimelineMarker, TimelineLink, TimelineTooltip } from "./Timeline";

const RubyMarker: React.FC = () => (
  <svg viewBox="-1 -1 136 117" version="1.1" xmlns="http://www.w3.org/2000/svg" className="ruby-marker">
    <g fill="none">
      <g strokeWidth="6">
        <path d="M24.2479013,0.221260022 L0.452034891,46.3285725 L24.2479013,0.221260022 Z" />
        <path d="M0.452034891,46.3285725 L67.079193,114.413094 L0.452034891,46.3285725 Z" />
        <path d="M67.079193,114.413094 L133.706351,46.3285725 L67.079193,114.413094 Z" />
        <path d="M109.466768,0.221260022 L133.706351,46.3285725 L109.466768,0.221260022 Z" />
        <path d="M109.910485,0.221260022 L24.6916175,0.221260022 L109.910485,0.221260022 Z" />
      </g>
      <path d="M0.452668771,46 L133.704872,46" strokeWidth="3"></path>
      <g strokeWidth="3">
        <path d="M24.2479013,0.221260022 L37.2276568,46.3285725" />
        <path d="M67.0802494,114.412462 L37.2266004,46.3279412" />
        <path d="M67.0802494,0.221260022 L37.2266004,46.3285725" />
        <path d="M109.910485,0.221260022 L96.9307291,46.3285725" />
        <path d="M67.0802494,114.412462 L96.9317856,46.3279412" />
        <path d="M67.0802494,0.221260022 L96.9317856,46.3285725" />
      </g>
    </g>
  </svg>
);

const RubyTimeline: React.FC = () => (
  <Timeline>
    <TimelineEntry date={new Date(Date.UTC(1995, 11, 21))} title="Ruby 0.95">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(1996, 11, 25))} title="Ruby 1.0">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(1998, 11, 15))} title="Ruby 1.2">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(1999, 7, 15))} title="Ruby 1.4">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2000, 8, 15))} title="Ruby 1.6">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2001, 0, 10))} title="Robert Feldt releases v0.0.1 of Ruth">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="https://sourceforge.net/projects/rubyvm/files/ruth/" />
        Extends Ruby 1.6 internals to support inspecting Ruby ASTs
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2001, 9, 20))} title="Minero Aoki releases v0.0.1 of ripper">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="https://i.loveruby.net/archive/ripper/" />
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2002, 2, 1))} title="Ruby 1.6.7">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2002, 9, 9))} title="Mathieu Bouchard releases v0.7.0 of MetaRuby">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="http://artengine.ca/matju/MetaRuby/" />
        Includes `RubySchema.rb`, a schema for validating Ruby ASTs
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2003, 0, 14))} title="Yuya Kato releases v0.0.1 of bruby">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="http://bruby.osdn.jp/" />
        Extends Ruby 1.6 internals to support dumping and loading a Ruby AST to a binary format
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2003, 7, 4))} title="Ruby 1.8.0">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2004, 10, 10))} title="Ryan Davis releases v1.0.0 of ParseTree">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="https://github.com/seattlerb/parsetree" />
        Extends Ruby 1.8 internals to support returning an AST by converting to Ruby objects
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2005, 9, 23))} title="Zev Blut releases v0.1.0 of saikuro">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="https://metricfu.github.io/Saikuro" />
        Uses `irb/ruby-lex` to analyze Ruby code for for cyclomatic complexity
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2006, 5, 5))} title="Dominik Bathon releases v0.1.0 of RubyNode">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="https://web.archive.org/web/20060630155424/http://rubynode.rubyforge.org/" />
        Extends Ruby 1.8 internals to support returning an AST by wrapping the NODE struct
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2007, 7, 1))} title="Ryan Davis releases v1.0.1 of flog">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="https://github.com/seattlerb/flog" />
        Uses `ParseTree` to determine how difficult code is to read
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2007, 10, 14))} title="Ryan Davis releases v1.0.0 of ruby_parser">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="https://github.com/seattlerb/ruby_parser" />
        Uses a `racc`-based compiler to generate s-expressions
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2007, 11, 25))} title="Ruby 1.9.0">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        `YARV`
        block local variables
        lambda literal syntax
        new hash key syntax
        `Ripper` merged in as standard library
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2008, 10, 6))} title="Ryan Davis releases v1.0.0 of flay">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="https://github.com/seattlerb/flay" />
        Uses `ruby_parser` to analyze code for structural similarities
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2009, 6, 25))} title="Paul Brannan releases v0.5.0 of nodewrap">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="http://rubystuff.org/nodewrap/" />
        Allows dumping/loading the Ruby nodes and instruction sequences to a binary format
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2010, 7, 27))} title="Michael Edgar releases v0.0.1 of laser">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="https://github.com/michaeledgar/laser" />
        Originally named Wool
        Originally parsed with regular expressions to determine style violations
        Eventually switched over to using `Ripper` to parse Ruby
        Features a type system, semantic analysis, documentation generation, and a plugin system
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2011, 4, 15))} title="Michael Edgar publishes senior thesis on laser">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="https://digitalcommons.dartmouth.edu/cgi/viewcontent.cgi?article=1071&context=senior_theses" />
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2011, 2, 22))} title="JIS X 3017">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2011, 9, 31))} title="Ruby 1.9.3">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2012, 1, 14))} title="Josep Bach releases v0.0.1 of pelusa">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="https://github.com/codegram/pelusa" />
        Uses `Rubinius` to perform basic linting
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2012, 2, 24))} title="Xavier Shay releases v1.1.0 of cane">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="https://github.com/square/cane" />
        Uses `Ripper` to determine assignment, branch, conditional metrics
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2012, 3, 15))} title="ISO/IEC 30170:2012">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2013, 1, 24))} title="Ruby 2.0.0">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        keyword arguments
        `Module#prepend`
        `%i` symbol array literals
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2013, 3, 15))} title="Peter Zotov releases v0.9.0 of parser">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="https://github.com/whitequark/parser" />
        Derives a new parser from `parse.y` in Ruby and a lexer test suite from `ruby_parser`
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2013, 11, 25))} title="Ruby 2.1.0">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2014, 11, 25))} title="Ruby 2.2.0">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2015, 1, 23))} title="Damir Svrtan releases v0.1.0 of fasterer">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="https://github.com/DamirSvrtan/fasterer" />
        Uses `ruby_parser` to check for various code paths that can be made faster
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2015, 11, 25))} title="Ruby 2.3.0">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        `# frozen_string_literal: true`
        `&.` operator
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2016, 9, 10))} title="Soutaro Matsumoto releases v0.1.0 of querly">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="https://github.com/soutaro/querly" />
        Uses the `parser` gem to find method calls with configured rules
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2016, 11, 25))} title="Ruby 2.4.0">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2017, 11, 25))} title="Ruby 2.5.0">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        `rescue` and `ensure` at the block and method level
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2018, 11, 25))} title="Ruby 2.6.0">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        `RubyVM::AbstractSyntaxTree`
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2019, 11, 25))} title="Ruby 2.7.0">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2020, 11, 25))} title="Ruby 3.0.0">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
      </TimelineTooltip>
    </TimelineEntry>
  </Timeline>
);

export default RubyTimeline;
