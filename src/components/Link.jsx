export function Link({ href, children }) {
  const active = (window.location.pathname.replace(/\/$/, '') || '/') === href;
  return <a className={active ? 'active' : ''} href={href}>{children}</a>;
}
