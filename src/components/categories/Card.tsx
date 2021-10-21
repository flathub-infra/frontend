import Link from 'next/link'

export default function CategoryCard({ name, href }) {
  return (
    <Link href={href} passHref>
      <div className='category-card'>{name}</div>
    </Link>
  )
}
