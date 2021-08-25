#!/usr/bin/env ruby
# frozen_string_literal: true

Dir["docs/diagrams/*.xhtml"].each do |filepath|
  contents = File.read(filepath)
  version = File.basename(filepath, ".xhtml")

  contents.gsub!("<body>", "<body>\n      <h1>Ruby v#{version}</h1>")
  File.write(filepath, contents)
end
