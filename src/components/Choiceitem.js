import './Choiceitem.css'

const Choiceitem = props => {
  const {choice, onClickChoice} = props
  const {id, imageUrl} = choice

  const onClick = () => {
    onClickChoice(id)
  }

  let testId = ''
  if (id === 'ROCK') {
    testId = 'rockButton'
  } else if (id === 'PAPER') {
    testId = 'paperButton'
  } else {
    testId = 'scissorsButton'
  }

  return (
    <button
      className="choice-btn"
      data-testid={testId}
      onClick={onClick}
      type="button"
    >
      <img src={imageUrl} alt={id} />
    </button>
  )
}

export default Choiceitem
