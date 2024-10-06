import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RefreshCw } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || '/api';

const SentenceGenerator: React.FC = () => {
  const { t, i18n } = useTranslation()
  const [sentences, setSentences] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [topic, setTopic] = useState('')
  const [style, setStyle] = useState('casual')
  const [count, setCount] = useState(1)

  const generateSentences = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/generate-sentences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          style,
          count,
          language: i18n.language,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate sentences')
      }

      const data = await response.json()
      setSentences(data.sentences)
    } catch (error) {
      console.error('Error generating sentences:', error)
      setSentences([t('error.generation')])
    } finally {
      setLoading(false)
    }
  }

  // ... rest of the component remains the same
}

export default SentenceGenerator