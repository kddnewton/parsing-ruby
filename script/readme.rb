#!/usr/bin/env ruby
# frozen_string_literal: true

require "erb"
require "kramdown"

parsing = false
entries = []
entry = nil

push_entry = -> (entry) {
  entry[:body] =
    if entry[:body].strip.empty?
      ""
    else
      html = Kramdown::Document.new(entry[:body].gsub(/<!--- .+? --->\n/, "")).to_html

      html.gsub!("{", "&#123;")
      html.gsub!("}", "&#125;")

      html.gsub!("\\s", "\\\\\\s")
      html.gsub!("\\n", "\\\\\\n")

      html.gsub!("`", "\\\\`")
      html.gsub!("<pre><code>", "<pre><code>{`")
      html.gsub!("</code></pre>", "`}</code></pre>")

      "\n#{html.chomp}"
    end

  entries << entry
}

File.foreach(File.expand_path("../README.md", __dir__), chomp: true) do |line|
  parsing = true if line.start_with?("## Ruby versions")
  next if !parsing || line.start_with?("## ")

  if match = line.match(/^### (\d{4})-(\d{2})-(\d{2}) - (.+)$/)
    push_entry.call(entry) if entry
    entry = {
      year: match[1],
      month: match[2].to_i(10),
      day: match[3].to_i(10),
      title: match[4],
      body: +""
    }
  elsif entry
    line.gsub!("(docs/", "(")
    entry[:body] << "#{line}\n"
  end
end

push_entry.call(entry)
entries.sort_by! { |entry| [entry[:year], entry[:month], entry[:day]] }

entries.map! do |entry|
  <<~JSX
    <TimelineEntry date={new Date(Date.UTC(#{entry[:year]}, #{entry[:month] - 1}, #{entry[:day]}))}>
      <RubyMarker />
      <TimelineEntryTooltip>
        <h2>#{entry[:title]} <small>#{entry[:year]}-#{"%02d" % entry[:month]}-#{"%02d" % entry[:day]}</small></h2>#{entry[:body]}
      </TimelineEntryTooltip>
    </TimelineEntry>
  JSX
end

File.write(
  File.expand_path("../src/App.tsx", __dir__),
  ERB.new(DATA.read).result_with_hash(entries: entries)
)

__END__
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
<%= entries.join %>
        </TimelineLine>
      </RubyTimeline>
    </Timeline>
  </div>
);

export default App;
