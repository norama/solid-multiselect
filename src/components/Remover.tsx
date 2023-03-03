const X = '\u2573'

export type RemoverProps = {
  onClick: () => void
}

const Remover = ({ onClick }: RemoverProps) => (
  <div class="icon_cancel closeIcon" onClick={onClick} onTouchStart={onClick}>
    {X}
  </div>
)

export default Remover
