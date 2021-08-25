#!/usr/bin/env ruby

tokens = {}
ids = File.file?("defs/id.def") ? eval(File.read("defs/id.def"), binding) : {}
source = File.read("parse.y")

if File.file?("defs/keywords")
  # __ENCODING__, {keyword__ENCODING__, keyword__ENCODING__}, EXPR_END
  File.read("defs/keywords").scan(/^(.+?),\s\{?(\w+),\s+(\w+)/) do |(token, name1, name2)|
    tokens[name1] = token
    tokens[name2] = token
  end
elsif File.file?("keywords")
  # __ENCODING__, keyword__ENCODING__, keyword__ENCODING__, EXPR_END
  File.read("keywords").scan(/^(.+?),\s\{?(\w+),\s+(\w+)/) do |(token, name1, name2)|
    tokens[name1] = token
    tokens[name2] = token
  end
else
  source.scan(/^\s+"(.+?)",\s+(\w+),/) do |(value, token)|
    tokens[token] = value
  end

  source.scan(/^\s+(\w+),\s+"(.+?)",/) do |(token, value)|
    tokens[token] = value
  end
end

# %token tUPLUS RUBY_TOKEN(UPLUS) "unary+"
if ids.key?(:token_op)
  source.scan(/^%token\s+(?:<id>\s+)?(\w+)\s+RUBY_TOKEN\((.+)\)/) do |(token, name)|
    tokens[token] = ids[:token_op].detect { |(_, value, tname)| break value if name == tname }
  end
end

# %token tASSOC "=>"
source.scan(/^%token\s+(\w+)\s+"([^'\w]+)"/) do |(token, value)|
  tokens[token] = value
end

# {tDOT2, ".."},
token_source = source
token_source += File.read("symbol.c") if File.file?("symbol.c")
token_source.scan(/\{(t\w+),\s+"(.+?)"\},/) do |(token, value)|
  tokens[token] = value
end

# tEQQ, "===",
source.scan(/^\s+(t\w+),\s+"(.+?)",$/) do |(token, value)|
  tokens[token] = value
end

# -(unary)
tokens.each_value { |value| value.gsub!("(unary)", "@") }

# hard-coding this because we know it only comes from one place in the parser
tokens.merge!(
  "tWORDS_BEG" => "%W",
  "tQWORDS_BEG" => "%w",
  "tSYMBOLS_BEG" => "%I",
  "tQSYMBOLS_BEG" => "%i"
)

# Clean up the output by removing the actions
sbeg = source.index("\n%%") + 1
send = source.rindex("\n%%") + 1
grammar = source[sbeg, send-sbeg]
grammar.sub!(/.*\n/, "")
grammar.gsub!(/'\{'/, "'\001'")
grammar.gsub!(/["']\}["']/, "'\002'")
grammar.gsub!(%r{\*/}, "\003\003")
grammar.gsub!(%r{/\*[^\003]*\003\003}, '')
while grammar.gsub!(/\{[^{}]*\}/, ''); end
grammar.gsub!(/'\001'/, "'{'")
grammar.gsub!(/'\002'/, "'}'")
while grammar.gsub!(/^[ \t]*\n(\s)/, '\1'); end
grammar.gsub!(/([:|])[ \t\n]+(\w)/, '\1 \2')
grammar.gsub!(/%prec [^\s]+/, '')

# Substitute in each token with the literal value as a quoted string
tokens = tokens.sort_by { |key, _| -key.length }.to_h
grammar.gsub!(/(#{tokens.keys.join("|")})\b/) { "'#{tokens.fetch($1)}'" }

# A very special case handling rules that have a /* none */ as the last possible
# match
grammar.gsub!(/\| ((?:.+?)\s+:)/) { "|\n\n#{$1}" }

# Extract all of the rules
rules =
  grammar.scan(/^(\w+)\s*:(.+?)(?:(?<!');|^(?=[a-z]))/m).to_h do |name, rule|
    [name, rule.strip.split(/\s+/).join(" ").split(/\s+\|\s+/).uniq]
  end

# Delete every rule that actually results in an error
{
  "cname" => "tIDENTIFIER",
  "stmt_or_begin" => "'BEGIN' begin_block",
  "stmt" => "'alias' tGVAR tNTH_REF"
}.each { |name, value| rules[name]&.delete(value) }

# Delete every rule that references f_bad_arg
rules.delete("f_bad_arg")
rules.each do |name, values|
  values.delete("f_bad_arg") if values.include?("f_bad_arg")
end

# Transform the values back into regular strings
rules.transform_values! { |values| values.join(" | ") }

# Substitute in each rule that is just a single quoted string
rules.each do |name, rule|
  next if rule !~ /\A'[^|\s]+'\z/

  rules.delete(name)
  rules.each_value { |value| value.gsub!(/\b#{name}\b/, rule) }
end

# Substitute in each rule that is only referencing another rule
loop do
  subs = false

  rules.each do |name, rule|
    next if name == "program" || rule.include?(" ")

    subs ||= true
    rules.delete(name)
    rules.each_value { |value| value.gsub!(/\b#{name}\b/, rule) }
  end

  break unless subs
end

# Substitute in each rule that is only referenced once
loop do
  subs = false

  rules.each do |name, rule|
    next if name == "program"

    pattern = /\b#{name}\b/
    references = rules.select { |_name, value| value =~ pattern }
    next if name == "program" || references.length != 1

    rname, rrule = references.first
    next if rname == name || rrule.scan(pattern).length > 1

    subs ||= true
    rules.delete(name)
    rules[rname] = rrule.gsub!(/\b#{name}\b/, "(#{rule})")
  end

  break unless subs
end

puts rules.map { |name, rule| "#{name} ::= #{rule}" }
