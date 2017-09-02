require 'dotenv'
require 'tinify'
Dotenv.load('/Users/fabioanselmo/Desktop/devvedNET-root/blog-assets/.env')
Tinify.key = ENV['TINYPNG_API']

ARGV.each do |file|
    filePath = '/Users/fabioanselmo/Desktop/devvedNET-root/blog-assets/featured-images/' + file
    puts '----------'
    puts "Tinypng is optimzing, #{file}"
    source = Tinify.from_file(filePath)
    source.to_file(filePath)
end

puts "Processing complete."