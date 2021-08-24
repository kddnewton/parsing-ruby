#!/usr/bin/env ruby
# frozen_string_literal: true

require "erb"
require "kramdown"

parsing = false
entries = +""
entry = nil

File.foreach(File.expand_path("../README.md", __dir__), chomp: true) do |line|
  parsing = true if line.start_with?("### Ruby versions")
  parsing = false if line.start_with?("## Parsers")
  next if !parsing || line.start_with?("#")

  if line =~ /^(\d{4})-(\d{2})-(\d{2}) - (.+)$/
    if entry
      body =
        if entry[:body].strip.empty?
          ""
        else
          "\n#{Kramdown::Document.new(entry[:body]).to_html.chomp.split("\n").map { |line| "      #{line}" }.join("\n")}"
        end

      entries << <<~JSX
        <TimelineEntry date={new Date(Date.UTC(#{entry[:year]}, #{entry[:month] - 1}, #{entry[:day]}))}>
          <TimelineMarker>
            <RubyMarker />
          </TimelineMarker>
          <TimelineTooltip>
            <RubyTooltip>
              <h2>#{entry[:title]} <small>#{entry[:year]}-#{"%02d" % entry[:month]}-#{"%02d" % entry[:day]}</small></h2>#{body}
            </RubyTooltip>
          </TimelineTooltip>
        </TimelineEntry>
      JSX
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

File.write(File.expand_path("../src/RubyTimeline.tsx", __dir__), ERB.new(DATA.read, trim_mode: "-").result_with_hash(timeline: <<-JSX))
  <Timeline startDate={new Date(Date.UTC(1993, 0, 1))} endDate={new Date(Date.UTC(2021, 11, 31))}>
#{entries.split("\n").map { |line| "    #{line}" }.join("\n")}
  </Timeline>
JSX

__END__
import React from "react";

import { Timeline, TimelineEntry, TimelineMarker, TimelineTooltip } from "./Timeline";
import RubyMarker from "./RubyMarker";
import RubyTooltip from "./RubyTooltip";

const RubyTimeline: React.FC = () => (
<%= timeline -%>
);

export default RubyTimeline;
