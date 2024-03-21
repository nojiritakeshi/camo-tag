'use client'
import { useState } from 'react'
import styles from './page.module.css'
import { Camo } from '@camo-tag/react'
import { TestComponent } from './TestComponent'
import { HaveSlotComp } from './HaveSlotComp'

export default function Home() {
  const [isStealth, setIsStealth] = useState(false)
  const [as, setAs] = useState<React.ElementType>('div')
  const changeStealth = () => {
    setAs(as === 'div' ? 'main' : 'div')
    setIsStealth(!isStealth)
  }
  return (
    <Camo as={as} is-only={isStealth} is-all={false} style={{ background: 'green', width: '100%' }}>
      <div>
        <p>HogeHoge</p>
      </div>
      <div>
        <p>HugaHuga</p>
      </div>
      <div is-survivor={true}>
        <p>NinNinjya</p>
      </div>
      <div is-only={isStealth}>
        <p>Soccer</p>
        <p>Baseball</p>
        <p>Basketball</p>
      </div>
      <TestComponent />
      <HaveSlotComp>
        <p>test</p>
      </HaveSlotComp>
      <div is-survivor={true} className={styles.main}>
        <button onClick={() => changeStealth()}>Change</button>
      </div>
    </Camo>
  )
}
