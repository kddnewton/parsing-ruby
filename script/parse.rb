#!/usr/bin/env ruby
# frozen_string_literal: true

require "kramdown"

parsing = false
entries = []

File.foreach(File.expand_path("../README.md", __dir__), chomp: true) do |line|
  parsing = true if line.start_with?("### Ruby versions")
  parsing = false if line.start_with?("Future??")

  next if !parsing || line.empty?

  case line
  when /^(\d{4})-(\d{2})-(\d{2}) - (.+)$/
    year, month, day, version = $1, $2.to_i(10) - 1, $3.to_i(10), $4

    entries += <<~JSX.split("\n")
      <TimelineEntry date={new Date(Date.UTC(#{year}, #{month}, #{day}))}>
        <TimelineMarker>
          <RubyMarker />
        </TimelineMarker>
        <TimelineTooltip>
        </TimelineTooltip>
      </TimelineEntry>
    JSX
  when /^- (.+)$/
    entries.insert(-3, "    #{Kramdown::Document.new($1).to_html.chomp}")
  end
end

puts ["  <Timeline>", *entries.map { |line| "    #{line}" }.join("\n"), "  </Timeline>"].join("\n")
