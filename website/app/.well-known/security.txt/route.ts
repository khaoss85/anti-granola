export function GET() {
  const body = `# Security Policy for Nullify
# https://nullify.guru

Contact: https://github.com/khaoss85/nullify/security/advisories
Expires: 2027-12-31T23:59:00.000Z
Preferred-Languages: en, it
Canonical: https://nullify.guru/.well-known/security.txt
Policy: https://github.com/khaoss85/nullify/security/policy
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
