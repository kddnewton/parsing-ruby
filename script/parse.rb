#!/usr/bin/env ruby
# frozen_string_literal: true

parsing = false
entries = []

File.foreach(File.expand_path("../README.md", __dir__), chomp: true) do |line|
  parsing = true if line.start_with?("## Timeline")
  parsing = false if line.start_with?("## Projects")

  next if !parsing || line.empty?

  case line
  when /^(\d{4})-(\d{2})-(..) - (?:\[(.+)\]\((.+)\)|(.+))$/
    year, month, day = $1, $2.to_i(10) - 1, $3
    day = day == "??" ? 15 : day.to_i(10)

    title = $5 ? $4 : $6
    entries += <<~JSX.split("\n")
      <TimelineEntry date={new Date(Date.UTC(#{year}, #{month}, #{day}))} title=\"#{title}\">
        <TimelineMarker>
          <RubyMarker />
        </TimelineMarker>
        <TimelineTooltip>
        </TimelineTooltip>
      </TimelineEntry>
    JSX

    entries.insert(-3, "    <TimelineLink href=\"#{$5}\" />") if $5
  when /^- (.+)$/
    entries.insert(-3, "    <p>#{$1}</p>")
  end
end

puts ["  <Timeline>", *entries.map { |line| "    #{line}" }.join("\n"), "  </Timeline>"].join("\n")
