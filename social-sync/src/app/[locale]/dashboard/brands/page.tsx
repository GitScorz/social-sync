'use client';

import PageTitle from '@/components/ui/analytics/page-title';
import { faAd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';

const faqs = [
  {
    question: 'Como posso inscrever minha marca no Social Sync?',
    answer:
      'Para inscrever a sua marca, clique no botão "És uma marca?" e preencha o formulário de inscrição.',
  },
  {
    question: 'Qual é o custo para utilizar o Social Sync?',
    answer:
      'Os custos variam de acordo com o tipo de parceria e os serviços escolhidos. Entre em contato para mais detalhes.',
  },
  {
    question: 'Quais são os benefícios de ser um influenciador no Social Sync?',
    answer:
      'Os influenciadores têm acesso a parcerias com marcas de renome, aumentando sua visibilidade e rendimentos.',
  },
];

const indicators = [
  { value: '500+', label: 'Marcas Parceiras' },
  { value: '1M+', label: 'Campanhas Realizadas' },
  { value: '10M+', label: 'Alcance de Influenciadores' },
  { value: '99%', label: 'Satisfação dos Clientes' },
];

const testimonials = [
  {
    text: 'O Social Sync revolucionou nossa estratégia de marketing, conectando-nos com os melhores influenciadores.',
    author: 'João Silva',
    company: 'Apple',
  },
  {
    text: 'A parceria com o Social Sync aumentou nossa visibilidade de forma exponencial.',
    author: 'Maria Pereira',
    company: 'Microsoft',
  },
  {
    text: 'Graças ao Social Sync, conseguimos campanhas publicitárias extremamente eficazes.',
    author: 'Carlos Almeida',
    company: 'Google',
  },
];

const mockBrands = [
  {
    name: 'Coca-Cola',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/1200px-Coca-Cola_logo.svg.png',
  },
  {
    name: 'Nike',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1024px-Logo_NIKE.svg.png',
  },
  {
    name: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/647px-Apple_logo_black.svg.png',
  },
  {
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png',
  },
  {
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png',
  },
  {
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png',
  },
  {
    name: 'Samsung',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/1024px-Samsung_Logo.svg.png',
  },
  {
    name: 'Pepsi',
    logo: 'https://i.pinimg.com/originals/61/af/37/61af370544463d4b8db051d1149f830d.png',
  },
  {
    name: 'Adidas',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/800px-Adidas_Logo.svg.png',
  },
  {
    name: 'Starbucks',
    logo: 'https://static.vecteezy.com/system/resources/previews/022/636/379/non_2x/starbucks-logo-starbucks-icon-transparent-free-png.png',
  },
  {
    name: 'Toyota',
    logo: 'https://seeklogo.com/images/T/toyota-logo-3A02221675-seeklogo.com.png',
  },
  {
    name: 'Intel',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Intel-logo-2022.png',
  },
];

export default function Brands() {
  const t = useTranslations('Dashboard');

  return (
    <div className='w-full flex justify-center items-center flex-col gap-4'>
      <h1 className='text-5xl md:text-7xl text-gray-200 font-bold text-center mb-8'>
        {t('navbar.brands')}
      </h1>
      <p className='text-xl md:text-2xl text-gray-200 text-center max-w-4xl mb-12'>
        {t('brands.description')}
      </p>
      <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-16'>
        <button className='bg-purple-600 hover:bg-purple-800 text-white font-bold py-4 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 text-lg'>
          {t('brands.are-brand')}
        </button>
        <button className='bg-green-600 hover:bg-green-800 text-white font-bold py-4 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 text-lg'>
          {t('brands.are-influencer')}
        </button>
      </div>
      <h2 className='text-4xl md:text-5xl font-semibold text-gray-200 text-center mb-8'>
        {t('brands.brands-that-are-with-us')}
      </h2>
      <p className='text-lg md:text-xl text-gray-300 text-center max-w-3xl mb-12'>
        {t('brands.second-description')}
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {mockBrands.map((brand, index) => (
          <div
            key={index}
            className='bg-gray-800 text-white p-5 rounded-lg flex items-center space-x-4 transform transition duration-500 hover:scale-105'
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className='w-16 h-16 object-contain'
            />
            <span className='text-xl font-semibold'>{brand.name}</span>
          </div>
        ))}
      </div>

      <h2 className='text-4xl md:text-5xl font-semibold text-gray-200 text-center mb-8 mt-8'>
        Depoimentos
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className='bg-gray-800 text-white p-5 rounded-lg transform transition duration-500 hover:scale-105'
          >
            <p className='text-lg mb-4'>"{testimonial.text}"</p>
            <span className='block text-purple-400 font-semibold'>
              {testimonial.author}
            </span>
            <span className='block text-gray-400'>{testimonial.company}</span>
          </div>
        ))}
      </div>

      <h2 className='text-4xl md:text-5xl font-semibold text-gray-200 text-center mb-8'>
        Perguntas Frequentes (FAQs)
      </h2>
      <div className='text-gray-300 max-w-3xl mb-16'>
        {faqs.map((faq, index) => (
          <div key={index} className='mb-8'>
            <h3 className='text-xl font-semibold mb-2'>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>

      <h2 className='text-4xl md:text-5xl font-semibold text-gray-200 text-center mb-8'>
        Indicadores de Sucesso
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16'>
        {indicators.map((indicator, index) => (
          <div key={index} className='text-center'>
            <span className='block text-5xl font-bold text-purple-400 mb-2'>
              {indicator.value}
            </span>
            <span className='block text-gray-400'>{indicator.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
