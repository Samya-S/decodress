// import styles from './blogpost.module.css'
// import React from 'react'

const Slug = ({ params }) => {
  return (
    <div>
      Product/[slug]: {params.slug}
    </div>
  )
}

export default Slug
