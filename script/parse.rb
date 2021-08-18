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
    entry = "#{indent}<TimelineEntry date={new Date(Date.UTC(#{year}, #{month}, #{day}))} title=\"#{title}\""
    entry =
      if $5
        "#{entry}>\n#{indent}  <TimelineLink href=\"#{$5}\" />\n#{indent}</TimelineEntry>"
      else
        "#{entry} />"
      end

    entries << entry
  when /^- (.+)$/
    entries[-1] =
      if entries[-1].end_with?("</TimelineEntry>")
        entries[-1].split("\n").insert(-2, "#{indent}  #{$1}").join("\n")
      else
        "#{entries[-1][0..-4]}>\n#{indent}  #{$1}\n#{indent}</TimelineEntry>"
      end
  end
end

puts entries
