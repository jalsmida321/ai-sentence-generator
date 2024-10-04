import React from 'react'
import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import LanguageSelector from './LanguageSelector'

const Header: React.FC = () => {
  const { t } = useTranslation()

  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Globe className="w-8 h-8 mr-2" />
          <span className="text-xl font-semibold">{t('main.title')}</span>
        </div>
        <nav className="flex items-center">
          <ul className="flex space-x-4 mr-4">
            <li><a href="#" className="hover:underline">{t('header.home')}</a></li>
            <li><a href="#" className="hover:underline">{t('header.about')}</a></li>
            <li><a href="#" className="hover:underline">{t('header.contact')}</a></li>
          </ul>
          <LanguageSelector />
        </nav>
      </div>
    </header>
  )
}

export default Header