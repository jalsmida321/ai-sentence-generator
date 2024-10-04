import React from 'react'
import { useTranslation } from 'react-i18next'
import Header from './components/Header'
import Footer from './components/Footer'
import SentenceGenerator from './components/SentenceGenerator'

const App: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">{t('main.title')}</h1>
        <SentenceGenerator />
      </main>
      <Footer />
    </div>
  )
}

export default App