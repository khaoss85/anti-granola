import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import HowItWorks from '@/components/HowItWorks'
import DetectionTable from '@/components/DetectionTable'
import Features from '@/components/Features'
import DownloadSection from '@/components/DownloadSection'
import SupportProject from '@/components/SupportProject'
import FAQ from '@/components/FAQ'
import { getFAQSchema, getHowToSchema } from '@/lib/schema'

const faqData = [
  {
    question: 'Is it legal to use Nullify?',
    answer:
      'Yes, absolutely. Nullify runs locally on your own computer and simply monitors what software is active during your meetings. It\'s the equivalent of checking your Task Manager. In fact, many jurisdictions give you the legal right to know when you\'re being recorded — Nullify helps you exercise that right.',
  },
  {
    question: 'Does Nullify block Granola from running?',
    answer:
      'Nullify offers multiple protection levels. At its base level, it detects transcription tools and alerts you. With Audio Shield enabled, it can disrupt transcription accuracy using psychoacoustic perturbation — making the captured audio unintelligible to AI while sounding normal to humans.',
  },
  {
    question: 'Will people on the call hear the audio shield?',
    answer:
      'No. The Audio Shield uses psychoacoustic techniques designed to be imperceptible to human ears while disrupting AI speech-to-text systems. Other participants will hear your normal voice. The perturbation targets the specific frequency patterns that transcription algorithms rely on.',
  },
  {
    question: 'Does it work with Zoom, Google Meet, Microsoft Teams?',
    answer:
      'Yes. Nullify works with all major meeting platforms including Zoom, Google Meet, Microsoft Teams, Webex, and others. It monitors at the system level, so it detects transcription tools regardless of which meeting platform you\'re using.',
  },
  {
    question: 'How do I know if someone is recording my meeting?',
    answer:
      'Traditional platform indicators (like the red recording dot) only detect in-platform recording. Stealth tools like Granola bypass these entirely. Nullify monitors for process-level and network-level signatures of known transcription tools, catching what platform indicators miss.',
  },
  {
    question: 'Is Granola recording without my consent legal?',
    answer:
      'It depends on your jurisdiction. In 13 U.S. states (including California, Illinois, and Florida), all parties must consent to recording. Under GDPR in Europe, recording without consent violates data protection laws. The Otter.ai class-action lawsuit shows this is an active legal issue. Regardless of legality, you deserve to know when you\'re being recorded.',
  },
]

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFAQSchema(faqData)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getHowToSchema()),
        }}
      />
      <Hero />
      <Problem />
      <HowItWorks />
      <DetectionTable />
      <Features />
      <DownloadSection />
      <SupportProject />
      <FAQ />
    </>
  )
}
