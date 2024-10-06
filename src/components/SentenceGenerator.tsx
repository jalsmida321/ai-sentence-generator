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

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4">
        <label htmlFor="topic" className="block mb-2 font-semibold">
          {t('main.topic')}
        </label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          placeholder={t('main.topicPlaceholder')}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="style" className="block mb-2 font-semibold">
          {t('main.style')}
        </label>
        <select
          id="style"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="casual">{t('main.styleCasual')}</option>
          <option value="formal">{t('main.styleFormal')}</option>
          <option value="poetic">{t('main.stylePoetic')}</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="count" className="block mb-2 font-semibold">
          {t('main.count')}
        </label>
        <input
          type="number"
          id="count"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
          min="1"
          max="5"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <button
        onClick={generateSentences}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
      >
        {loading ? (
          <>
            <RefreshCw className="animate-spin mr-2" />
            {t('main.loading')}
          </>
        ) : (
          t('main.generateButton')
        )}
      </button>
      {sentences.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Generated Sentences:</h2>
          <ul className="list-disc pl-5">
            {sentences.map((sentence, index) => (
              <li key={index} className="mb-2">
                {sentence}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SentenceGenerator