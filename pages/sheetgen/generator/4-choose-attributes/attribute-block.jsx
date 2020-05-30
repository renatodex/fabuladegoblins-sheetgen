import { useState } from 'react'

export default function AttributeBlock ({ attribute, onChangeEvent, remainingPoints }) {
  const [value, setValue] = useState(0);
  const MIN_VALUE = 0
  const MAX_VALUE = 12

  let onChangeEventWrapper = function ({ e, attribute, newValue }) {
    setValue(newValue)
    onChangeEvent({ e, attribute, newValue })
  }

  return (
    <div>
      <h1>{ attribute?.name }</h1>
      <p>{ attribute?.description }</p>

      <input
        type="number"
        value={value}
        min={MIN_VALUE}
        max={MAX_VALUE}
        readOnly
      />

      <button onClick={(e) => {
        onChangeEventWrapper({
          e,
          attribute,
          newValue: ((value - 1) < MIN_VALUE) ? MIN_VALUE : (value - 1),
        })
      }}>
        Diminuir
      </button>
      <button onClick={(e) => {
        if (remainingPoints > 0) {
          onChangeEventWrapper({
            e,
            attribute,
            newValue: ((value + 1) > MAX_VALUE) ? MAX_VALUE : (value + 1),
          })
        }
      }}>
        Aumentar
      </button>
    </div>
  )
}
