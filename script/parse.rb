#!/usr/bin/env ruby
# frozen_string_literal: true

require "erb"
require "kramdown"

parsing = false
entries = []
entry = nil

File.foreach(File.expand_path("../README.md", __dir__), chomp: true) do |line|
  parsing = true if line.start_with?("### Ruby versions")
  parsing = false if line.start_with?("## Parsers")
  next if !parsing || line.start_with?("#")

  if line =~ /^\*\*(\d{4})-(\d{2})-(\d{2}) - (.+)\*\*$/
    if entry
      entry[:body] =
        if entry[:body].strip.empty?
          ""
        else
          "\n#{Kramdown::Document.new(entry[:body]).to_html.chomp.split("\n").map { |line| "    #{line}" }.join("\n")}"
        end

      entries << entry
    end

    entry = {
      year: $1,
      month: $2.to_i(10),
      day: $3.to_i(10),
      title: Kramdown::Document.new($4).to_html.chomp.then { |title| title.include?("<p>") ? title.gsub!(/<\/?p>/, "") : title },
      body: +""
    }
  elsif entry
    entry[:body] << "#{line}\n"
  end
end

entries.sort_by! { |entry| [entry[:year], entry[:month], entry[:day]] }
entries.map! do |entry|
  <<~JSX
    <TimelineEntry date={new Date(Date.UTC(#{entry[:year]}, #{entry[:month] - 1}, #{entry[:day]}))}>
      <TimelineMarker>
        <RubyMarker />
      </TimelineMarker>
      <TimelineEntryTooltip>
        <h2>#{entry[:title]} <small>#{entry[:year]}-#{"%02d" % entry[:month]}-#{"%02d" % entry[:day]}</small></h2>#{entry[:body]}
      </TimelineEntryTooltip>
    </TimelineEntry>
  JSX
end

File.write(
  File.expand_path("../src/RubyTimeline.tsx", __dir__),
  ERB.new(DATA.read, trim_mode: "-").result_with_hash(entries: entries)
)

__END__
import React from "react";

import { Timeline, TimelineTooltip, TimelineTooltipContents, TimelineLine, TimelineEntry, TimelineMarker, TimelineEntryTooltip } from "./Timeline";
import RubyMarker from "./RubyMarker";
import RubyTooltip from "./RubyTooltip";

const RubyTimeline: React.FC = () => (
  <Timeline startDate={new Date(Date.UTC(1993, 0, 1))} endDate={new Date(Date.UTC(2021, 11, 31))}>
    <TimelineTooltip>
      <RubyTooltip>
        <TimelineTooltipContents />
      </RubyTooltip>
    </TimelineTooltip>
    <TimelineLine>
<%= entries.join.split("\n").map { |line| "      #{line}" }.join("\n") -%>
    </TimelineLine>
  </Timeline>
);

export default RubyTimeline;
