# Run: ruby tests/export-secrets.rb (requires bash, jq, and openssl).
require 'json'
require 'open3'
require 'tmpdir'
require 'yaml'

workflow = YAML.load_file(File.expand_path('../.github/workflows/export-secrets.yml', __dir__))
script = workflow.fetch('jobs').fetch('export').fetch('steps').first.fetch('run')
sample = { 'MULTILINE' => "line one\n'\"$()`value", 'GITHUB_TOKEN' => 'temporary-token',
           'EXPORT_PASSPHRASE' => 'test-only-passphrase' }

Dir.mktmpdir do |dir|
  env = { 'SECRETS_JSON' => JSON.generate(sample), 'EXPORT_PASSPHRASE' => sample['EXPORT_PASSPHRASE'],
          'RUNNER_TEMP' => dir }
  stdout, stderr, status = Open3.capture3(env, 'bash', '-e', '-o', 'pipefail', '-c', script)
  raise 'Encryption failed or emitted output' unless status.success? && stdout.empty? && stderr.empty?
  encrypted = File.join(dir, 'secrets.json.enc')
  plaintext, _, status = Open3.capture3(env, 'openssl', 'enc', '-d', '-aes-256-cbc', '-pbkdf2',
                                       '-iter', '600000', '-md', 'sha256', '-pass',
                                       'env:EXPORT_PASSPHRASE', '-in', encrypted)
  raise 'Round-trip mismatch' unless status.success? && JSON.parse(plaintext) == { 'MULTILINE' => sample['MULTILINE'] }
  File.delete(encrypted)
  _, _, status = Open3.capture3(env.merge('EXPORT_PASSPHRASE' => ''), 'bash', '-e', '-o', 'pipefail', '-c', script)
  raise 'Missing passphrase must fail without an export' if status.success? || File.exist?(encrypted)
end

puts 'Secret export checks passed.'
