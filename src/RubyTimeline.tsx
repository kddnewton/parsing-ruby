import React from "react";

import { Timeline, TimelineEntry, TimelineMarker, TimelineLink, TimelineTooltip } from "./display/Timeline";
import { Modal, ModalTrigger, ModalContent } from "./display/Modal";
import RubyMarker from "./RubyMarker";

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
        <Modal>
          <ModalTrigger>
            <RubyMarker />
            Robert Feldt releases v0.0.1 of Ruth
          </ModalTrigger>
          <ModalContent>
            <TimelineLink href="https://sourceforge.net/projects/rubyvm/files/ruth/" />
            <p>Extends Ruby 1.6 internals to support inspecting Ruby ASTs</p>
          </ModalContent>
        </Modal>
      </TimelineMarker>
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
        <p>Includes `RubySchema.rb`, a schema for validating Ruby ASTs</p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2003, 0, 14))} title="Yuya Kato releases v0.0.1 of bruby">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="http://bruby.osdn.jp/" />
        <p>Extends Ruby 1.6 internals to support dumping and loading a Ruby AST to a binary format</p>
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
        <p>Extends Ruby 1.8 internals to support returning an AST by converting to Ruby objects</p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2005, 9, 23))} title="Zev Blut releases v0.1.0 of saikuro">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="https://metricfu.github.io/Saikuro" />
        <p>Uses `irb/ruby-lex` to analyze Ruby code for for cyclomatic complexity</p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2006, 5, 5))} title="Dominik Bathon releases v0.1.0 of RubyNode">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="https://web.archive.org/web/20060630155424/http://rubynode.rubyforge.org/" />
        <p>Extends Ruby 1.8 internals to support returning an AST by wrapping the NODE struct</p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2007, 7, 1))} title="Ryan Davis releases v1.0.1 of flog">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="https://github.com/seattlerb/flog" />
        <p>Uses `ParseTree` to determine how difficult code is to read</p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2007, 10, 14))} title="Ryan Davis releases v1.0.0 of ruby_parser">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="https://github.com/seattlerb/ruby_parser" />
        <p>Uses a `racc`-based compiler to generate s-expressions</p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2007, 11, 25))} title="Ruby 1.9.0">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <p>`YARV`</p>
        <p>block local variables</p>
        <p>lambda literal syntax</p>
        <p>new hash key syntax</p>
        <p>`Ripper` merged in as standard library</p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2008, 10, 6))} title="Ryan Davis releases v1.0.0 of flay">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="https://github.com/seattlerb/flay" />
        <p>Uses `ruby_parser` to analyze code for structural similarities</p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2009, 6, 25))} title="Paul Brannan releases v0.5.0 of nodewrap">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="http://rubystuff.org/nodewrap/" />
        <p>Allows dumping/loading the Ruby nodes and instruction sequences to a binary format</p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2010, 7, 27))} title="Michael Edgar releases v0.0.1 of laser">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="https://github.com/michaeledgar/laser" />
        <p>Originally named Wool</p>
        <p>Originally parsed with regular expressions to determine style violations</p>
        <p>Eventually switched over to using `Ripper` to parse Ruby</p>
        <p>Features a type system, semantic analysis, documentation generation, and a plugin system</p>
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
        <p>Uses `Rubinius` to perform basic linting</p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2012, 2, 24))} title="Xavier Shay releases v1.1.0 of cane">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="https://github.com/square/cane" />
        <p>Uses `Ripper` to determine assignment, branch, conditional metrics</p>
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
        <p>keyword arguments</p>
        <p>`Module#prepend`</p>
        <p>`%i` symbol array literals</p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2013, 3, 15))} title="Peter Zotov releases v0.9.0 of parser">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="https://github.com/whitequark/parser" />
        <p>Derives a new parser from `parse.y` in Ruby and a lexer test suite from `ruby_parser`</p>
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
        <p>Uses `ruby_parser` to check for various code paths that can be made faster</p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2015, 11, 25))} title="Ruby 2.3.0">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <p>`# frozen_string_literal: true`</p>
        <p>`&.` operator</p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2016, 9, 10))} title="Soutaro Matsumoto releases v0.1.0 of querly">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <TimelineLink href="https://github.com/soutaro/querly" />
        <p>Uses the `parser` gem to find method calls with configured rules</p>
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
        <p>`rescue` and `ensure` at the block and method level</p>
      </TimelineTooltip>
    </TimelineEntry>
    <TimelineEntry date={new Date(Date.UTC(2018, 11, 25))} title="Ruby 2.6.0">
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineTooltip>
        <p>`RubyVM::AbstractSyntaxTree`</p>
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
