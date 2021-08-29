Copyright 2006 Dominik Bathon <dbatml@gmx.de>

RubyNode
========

RubyNode is a library that allows read only access to Ruby's internal NODE
structure. It can retrieve the node trees of methods and procs and it can use
Ruby's parser to parse Ruby source code strings to node trees.

It provides the class RubyNode, which wraps an internal NODE. Trees of RubyNode
instances can also be transformed into trees of arrays and hashes (similar to
s-expressions), which are easy to manipulate and work with.


Requirements
------------

RubyNode is tested with Ruby 1.8.4, but it should also work with other 1.8
versions and also with 1.9.


Installation
------------

RubyNode generates some of its C source code from Ruby's source code, because
the node types and other details differ between Ruby versions.

For Ruby 1.8.4 the needed source files are included in this package. To compile
RubyNode for other Ruby version than 1.8.4, you will need that version's source
tar ball extracted somewhere.

So, for Ruby 1.8.4 just run (as root):

  ruby setup.rb

That command will compile the C extension and install all files to their
default location (to customize the installation, please see "ruby setup.rb
--help")

For other Ruby versions you need to provide the (absolute) path to the source
directory for that Ruby version in the enviroment variable RUBY_SOURCE_DIR.
Example (as root):

  RUBY_SOURCE_DIR="/path/to/ruby_source" ruby setup.rb


Usage
-----

Just require "rubynode" and use it. Here is a short irb sessions that shows
some of the things you can do with RubyNode:

>> require "rubynode"
=> true

Body node of a method:

>> def plus_1(x)
>>   x + 1
>> end
=> nil
>> pp method(:plus_1).body_node.transform
[:scope,
 {:next=>
   [:block,
    [[:args, {:rest=>-1, :cnt=>1, :opt=>false}],
     [:call,
      {:args=>[:array, [[:lit, {:lit=>1}]]],
       :mid=>:+,
       :recv=>[:lvar, {:vid=>:x, :cnt=>2}]}]]],
  :rval=>[:cref, {:next=>false, :clss=>Object}],
  :tbl=>[:x]}]
=> nil

Body node and var node of a proc:

>> add_2 = proc { |x| x + 2 }
=> #<Proc:0xb7f24c00@(irb):6>
>> pp add_2.body_node.transform
[:call,
 {:args=>[:array, [[:lit, {:lit=>2}]]], :mid=>:+, :recv=>[:dvar, {:vid=>:x}]}]
=> nil
>> pp add_2.var_node.transform
[:dasgn_curr, {:vid=>:x, :value=>false}]
=> nil

Parse a string to nodes:

>> pp "3.times { puts 'Ruby' }".parse_to_nodes.transform
[:iter,
 {:var=>false,
  :iter=>[:call, {:args=>false, :mid=>:times, :recv=>[:lit, {:lit=>3}]}],
  :body=>[:fcall, {:args=>[:array, [[:str, {:lit=>"Ruby"}]]], :mid=>:puts}]}]
=> nil

For more details see api.txt.

Have fun!


Feedback
--------

If you find a bug, think that something doesn't work as it should or have other
suggestions, then please don't hesitate to contact me (dbatml@gmx.de) and tell
me about it.


Thanks
------

I would like to thank Paul Brannan for writing Nodewrap, which inspired me to
write RubyNode and also gave me some ideas and code.


License
-------

RubyNode is licensed under the same terms as Ruby.

The distribution contains some (extracts from) files from Ruby which are
Copyright Yukihiro Matsumoto (see those files).
