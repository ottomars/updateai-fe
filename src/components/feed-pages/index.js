import './index.css'
import React from 'react'
import IconButton from 'material-ui/IconButton'
import RadioButtonUncheckedIcon from 'material-ui/svg-icons/toggle/radio-button-unchecked'
import RadioButtonCheckedIcon from 'material-ui/svg-icons/toggle/radio-button-checked'

const PageButton = ({pageNum, selected, onPageButtonClick}) => {
  const Icon = selected ? RadioButtonCheckedIcon : RadioButtonUncheckedIcon
  return (
    <IconButton
      onTouchTap={e => {
        e.preventDefault()
        onPageButtonClick(pageNum)
      }}
      iconStyle={{width: 16, height: 16}}
      style={{width: 16, height: 16, padding: 0}}
    >
      <Icon hoverColor='#999' color='#333'/>
    </IconButton>
  )
}

const FeedPages = ({page, numPages, onPageButtonClick}) => (
  <div className='FeedPages'>
    {Array.from({length: numPages}).map((v, k) => (
      <div className='FeedPages-button' key={k}>
        <PageButton
          pageNum={k}
          selected={k === page}
          onPageButtonClick={onPageButtonClick}
        />
      </div>
    ))}
  </div>
)

export default FeedPages
