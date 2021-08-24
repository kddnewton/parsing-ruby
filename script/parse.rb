#!/usr/bin/env ruby
# frozen_string_literal: true

require "kramdown"

parsing = false
entries = []

File.foreach(File.expand_path("../README.md", __dir__), chomp: true) do |line|
  parsing = true if line.start_with?("### Ruby versions")
  parsing = false if line.start_with?("## Parsers")
  next if !parsing || line.empty?

  case line
  when /^(\d{4})-(\d{2})-(\d{2}) - (.+)$/
    year, month, day, title = $1, $2.to_i(10), $3.to_i(10), Kramdown::Document.new($4).to_html.chomp
    title.gsub!(/<\/?p>/, "") if title.include?("<p>")

    entries += <<~JSX.split("\n")
      <TimelineEntry date={new Date(Date.UTC(#{year}, #{month - 1}, #{day}))}>
        <TimelineMarker>
          <RubyMarker />
        </TimelineMarker>
        <TimelineTooltip>
          <RubyTooltip>
            <h2>#{title} <small>#{year}-#{"%02d" % month}-#{"%02d" % day}</small></h2>
          </RubyTooltip>
        </TimelineTooltip>
      </TimelineEntry>
    JSX
  when /^- (.+)$/
    entries.insert(-4, "      #{Kramdown::Document.new($1).to_html.chomp}")
  end
end

puts "  <Timeline startDate={new Date(Date.UTC(1993, 0, 1))} endDate={new Date(Date.UTC(2021, 11, 31))}>"
puts entries.map { |line| "    #{line}" }
puts "  </Timeline>"
