import { RemovableItemProps } from './components/selection/Selection'
import './Collapsible.css'
import { createSignal } from 'solid-js'

const Collapsible = ({ value, RemoverComponent }: RemovableItemProps) => {
  const [open, setOpen] = createSignal(false)

  return (
    <>
      <div class={`collapsibleHeader ${open() ? 'open' : ''}`}>
        {value as string}
        <div style={{ display: 'flex' }}>
          <div onClick={() => setOpen((o) => !o)}>{open() ? '✓' : '🖉'}</div>
          <RemoverComponent value={value} />
        </div>
      </div>
      <div class={`collapsibleContent ${open() ? 'open' : ''}`}>
        CONTENT <br />
        {value as string} <br />
        CONTENT
      </div>
    </>
  )
}

export default Collapsible
