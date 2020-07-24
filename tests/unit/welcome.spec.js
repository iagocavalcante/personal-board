import '@testing-library/jest-dom'
import { loadLanguage } from '@/i18n'
import { renderVuesax } from '@/tests/utils/config'
import Welcome from '@/components/Welcome'

describe('Welcome Component', () => {
  it('should render logo image in main page', () => {
    const { getByAltText } = renderVuesax(Welcome)
    expect(getByAltText('Personal Board')).toBeInTheDocument()
  })

  it('should render username label in english', async () => {
    const { getByText } = renderVuesax(Welcome)
    await loadLanguage('en')
    expect(getByText('Enter with your username or leave blank')).toBeInTheDocument()
  })

  it('should render username label in portuguese', async () => {
    const { getByText } = renderVuesax(Welcome)
    await loadLanguage('pt-Br')
    expect(getByText('Entre com seu nome de usuário ou deixe em branco')).toBeInTheDocument()
  })
})
