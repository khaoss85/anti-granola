import Link from 'next/link'
import { Check, Shield } from 'lucide-react'

const tools = [
  { name: 'Granola', type: 'Stealth', process: true, network: true },
  { name: 'Otter.ai', type: 'Bot + Stealth', process: true, network: true },
  { name: 'Fireflies.ai', type: 'Bot', process: true, network: true },
  { name: 'Read.ai', type: 'Stealth', process: true, network: true },
  { name: 'tl;dv', type: 'Bot', process: true, network: true },
  { name: 'Fathom', type: 'Stealth', process: true, network: true },
  { name: 'Supernormal', type: 'Bot', process: true, network: false },
  { name: 'Tactiq', type: 'Extension', process: true, network: false },
]

export default function DetectionTable() {
  return (
    <section className="border-t border-white/5 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">What We Detect</h2>
          <p className="mt-4 text-lg text-zinc-400">
            Nullify detects all major meeting transcription tools — including the invisible ones.
          </p>
        </div>

        {/* Desktop table */}
        <div className="mt-12 hidden overflow-hidden rounded-2xl border border-white/10 md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Tool</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Type</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                  Process Detection
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                  Network Detection
                </th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool, i) => (
                <tr
                  key={tool.name}
                  className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-white">{tool.name}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        tool.type === 'Stealth'
                          ? 'bg-red-500/10 text-red-400'
                          : tool.type === 'Bot'
                            ? 'bg-yellow-500/10 text-yellow-400'
                            : 'bg-zinc-500/10 text-zinc-400'
                      }`}
                    >
                      {tool.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {tool.process && <Check className="mx-auto h-5 w-5 text-green-500" />}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {tool.network ? (
                      <Check className="mx-auto h-5 w-5 text-green-500" />
                    ) : (
                      <span className="text-xs text-zinc-600">Coming soon</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="mt-12 grid gap-4 md:hidden">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-white">{tool.name}</span>
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    tool.type === 'Stealth'
                      ? 'bg-red-500/10 text-red-400'
                      : tool.type === 'Bot'
                        ? 'bg-yellow-500/10 text-yellow-400'
                        : 'bg-zinc-500/10 text-zinc-400'
                  }`}
                >
                  {tool.type}
                </span>
              </div>
              <div className="mt-3 flex gap-4 text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  {tool.process && <Check className="h-3.5 w-3.5 text-green-500" />}
                  Process
                </span>
                <span className="flex items-center gap-1">
                  {tool.network && <Check className="h-3.5 w-3.5 text-green-500" />}
                  Network
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <Link
            href="/blog/block-granola-transcription"
            className="font-medium text-red-400 transition hover:text-red-300 hover:underline"
          >
            How to block Granola →
          </Link>
          <Link
            href="/blog/block-otter-ai-recording"
            className="font-medium text-red-400 transition hover:text-red-300 hover:underline"
          >
            How to block Otter.ai →
          </Link>
          <Link
            href="/blog/detect-secret-meeting-transcription"
            className="font-medium text-red-400 transition hover:text-red-300 hover:underline"
          >
            Detect secret transcription →
          </Link>
        </div>
      </div>
    </section>
  )
}
