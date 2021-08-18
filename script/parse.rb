#!/usr/bin/env ruby
# frozen_string_literal: true

indent = "      "

parsing = false
entries = []

File.foreach(File.expand_path("../README.md", __dir__), chomp: true) do |line|
  parsing |= line.start_with?("### Timeline")
  next if !parsing || line.empty?

  case line
  when /^(\d{4})-(\d{2})-(..) - (?:\[(.+)\]\((.+)\)|(.+))$/
    year, month, day = $1, $2.to_i(10) - 1, $3
    day = day == "??" ? 15 : day.to_i(10)

    title = $5 ? $4 : $6
    entry = <<~JSX
      #{indent}<TimelineEntry date={new Date(Date.UTC(#{year}, #{month}, #{day}))} title=\"#{title}\">
      #{indent}  <TimelineMarker>
      #{indent}    <RubyMarker />
      #{indent}  </TimelineMarker>
      #{indent}  <TimelineTooltip>
      #{indent}  </TimelineTooltip>
      #{indent}</TimelineEntry>
    JSX

    entry = entry.split("\n").insert(-3, "#{indent}    <TimelineLink href=\"#{$5}\" />").join("\n") if $5
    entries << entry
  when /^- (.+)$/
    entries[-1] = entries[-1].split("\n").insert(-3, "#{indent}    #{$1}").join("\n")
  end
end

puts entries
