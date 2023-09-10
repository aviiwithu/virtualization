import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import VirtualList from '../components/VirtualList/VirtualList'

const listData = Array(100).fill("data").map((el,idx)=>`item-${idx}`)
export default function Home() {
  const [listItems, setListItems] = useState(Array(100).fill("data"))
  return (
    <div className={styles.container}>
      <Head>
        <title>Virtualization</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p>test para</p>
        <div className={styles.virtual_container}>
            <VirtualList
             list={listData} 
             listItemClass={styles.li_item}
             ul_itemClass={styles.ul_item}
             />
        </div>
      </main>

      
    </div>
  )
}
