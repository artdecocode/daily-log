const after = async () => {
  await new Promise(r => setTimeout(r, 100))
  throw new Error('example error after await')
}

const before = async () => {
  throw new Error('example error before await')
}

(async () => {
  try {
    await before()
  } catch ({ stack }) {
    console.log(stack) // error stack is there
  }
})

;(async () => {
  try {
    await after()
  } catch ({ stack }) {
    console.log(stack) // cuts at anonymous
  }
})