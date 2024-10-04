import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RefreshCw } from 'lucide-react'

const SentenceGenerator: React.FC = () => {
  const { t, i18n } = useTranslation()
  const [sentences, setSentences] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [topic, setTopic] = useState('')
  const [style, setStyle] = useState('casual')
  const [count, setCount] = useState(1)

  const generateSentences = async () => {
    setLoading(true)
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const dummySentences: { [key: string]: string[] } = {
      en: [
        "The quick brown fox jumps over the lazy dog.",
        "A journey of a thousand miles begins with a single step.",
        "To be or not to be, that is the question."
      ],
      es: [
        "El rápido zorro marrón salta sobre el perro perezoso.",
        "Un viaje de mil millas comienza con un solo paso.",
        "Ser o no ser, esa es la cuestión."
      ],
      fr: [
        "Le rapide renard brun saute par-dessus le chien paresseux.",
        "Un voyage de mille lieues commence par un seul pas.",
        "Être ou ne pas être, telle est la question."
      ],
      de: [
        "Der schnelle braune Fuchs springt über den faulen Hund.",
        "Eine Reise von tausend Meilen beginnt mit einem einzigen Schritt.",
        "Sein oder nicht sein, das ist hier die Frage."
      ],
      zh: [
        "快速的棕色狐狸跳过懒惰的狗。",
        "千里之行始于足下。",
        "生存还是毁灭，这是一个问题。"
      ],
      ja: [
        "素早い茶色のキツネが怠け者の犬を飛び越えます。",
        "千里の道も一歩から始まる。",
        "生きるべきか死ぬべきか、それが問題だ。"
      ],
    }
    const generatedSentences = dummySentences[i18n.language] || ["Sentence not available in this language."]
    setSentences(generatedSentences.slice(0, count))
    setLoading(false)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">{t('main.title')}</h2>
      <div className="mb-4">
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
          {t('main.topic')}
        </label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder={t('main.topicPlaceholder')}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-1">
          {t('main.style')}
        </label>
        <select
          id="style"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="casual">{t('main.styleCasual')}</option>
          <option value="formal">{t('main.styleFormal')}</option>
          <option value="poetic">{t('main.stylePoetic')}</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="count" className="block text-sm font-medium text-gray-700 mb-1">
          {t('main.count')}
        </label>
        <input
          type="number"
          id="count"
          value={count}
          onChange={(e) => setCount(Math.max(1, Math.min(5, parseInt(e.target.value))))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          min="1"
          max="5"
        />
      </div>
      <button
        onClick={generateSentences}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center w-full mb-4"
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
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          {sentences.map((sentence, index) => (
            <p key={index} className="text-lg mb-2">{sentence}</p>
          ))}
        </div>
      )}
    </div>
  )
}

export default SentenceGenerator