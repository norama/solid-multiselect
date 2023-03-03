const X = '\u2573'

type Props = {
  onClick: () => void
}

const Remover = ({ onClick }: Props) => (
  <div class="icon_cancel closeIcon" onClick={onClick} onTouchStart={onClick}>
    {X}
  </div>
)

export default Remover
