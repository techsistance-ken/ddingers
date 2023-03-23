import Counter from './PlayerTag.svelte'
import { render, fireEvent } from '@testing-library/svelte'
 
it('it works', async () => {
  const { getByText, getByTestId } = render(Counter, {
    tag: "kj",
    color: "orange"
  })
 
  const increment = getByText('kj')
 
  expect(increment.textContent).toBe('12')
 
})