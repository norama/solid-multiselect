import { IStyle } from 'components/option/Option'
import { Show } from 'solid-js'

type Props = {
  loadingMessage?: string
  style: IStyle
}

const Loading = ({ loadingMessage = 'loading...', style }: Props) => {
  return (
    <ul class="optionContainer" style={style['optionContainer']}>
      <Show when={!!loadingMessage} fallback={loadingMessage}>
        <span class="notFound" style={style['loadingMessage']}>
          {loadingMessage}
        </span>
      </Show>
    </ul>
  )
}

export default Loading
