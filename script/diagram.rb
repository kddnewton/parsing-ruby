#!/usr/bin/env ruby
# frozen_string_literal: true

Dir["docs/diagrams/*.xhtml"].each do |filepath|
  contents = File.read(filepath)
  binding.irb
end
