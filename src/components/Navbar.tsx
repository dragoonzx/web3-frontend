import { Link } from 'react-router-dom'
import { LogoText } from 'components/Text'
import { useCallback, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Button from 'components/Button'
import Logo from 'icons/Logo'
import Wallet from 'components/Wallet'
import classnames, {
  alignItems,
  backgroundColor,
  display,
  inset,
  justifyContent,
  margin,
  padding,
  position,
  space,
  transitionProperty,
  zIndex,
} from 'classnames/tailwind'
import useThrottle from 'hooks/useThrottle'

const navbar = (visible?: boolean, withoutWallet?: boolean) =>
  classnames(
    position('sticky'),
    inset('top-0'),
    display('flex'),
    alignItems('items-center'),
    justifyContent(withoutWallet ? 'sm:justify-center' : 'justify-between'),
    padding('py-4', 'px-4', 'lg:px-25'),
    space('space-x-9', 'lg:space-x-0'),
    zIndex('z-50'),
    backgroundColor(visible ? 'bg-primary-dark' : 'bg-transparent'),
    transitionProperty('transition-all')
  )

const logoContainer = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  space('space-x-2'),
  margin('mt-2')
)

export default function () {
  const { pathname } = useLocation()
  const withoutWallet = pathname.split('/').length >= 3

  const [backgroundVisible, setBackgroundVisible] = useState(false)
  const onScroll = useCallback(() => {
    setBackgroundVisible(window.scrollY > 20)
  }, [])
  const throttledScroll = useThrottle(onScroll, 200)
  useMemo(() => {
    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [throttledScroll])

  return (
    <nav className={navbar(backgroundVisible, withoutWallet)}>
      <Link to="/">
        <div className={logoContainer}>
          <Logo />
          <LogoText>DappTemplate</LogoText>
        </div>
      </Link>
      {!withoutWallet && <Wallet />}
    </nav>
  )
}
