import { useWindowDimensions } from '@figurl/core-utils';
import { getFigureData, startListeningToParent } from '@figurl/interface';
import { useEffect, useState } from 'react';
import { isMarkdownData, MarkdownComponent } from './MarkdownComponent/MarkdownComponent';

const urlSearchParams = new URLSearchParams(window.location.search)
const queryParams = Object.fromEntries(urlSearchParams.entries())

const testSource = `
# Test markdown

This is a test
\`\`\`python
def main():
  print('test')
  a = code_block() # a comment
  return 0
\`\`\`

- [ ] checklist item 1
- [ ] checklist item 2

* a
* bullet
* list

This should be <b>bold</b>

This inline math: $a = \\frac{1}{2}$

<iframe
  src="https://figurl.org/f?v=gs://figurl/bluster-views-1&d=sha1://8edc7b6bd4a5d141963345d4017ce9dfc354f9f1&label=Bluster:%20Unequal%20variances"
  width="1000" height="400" frameborder="0"
></iframe>

$$a = \\frac{1}{2}$$
`

function App() {
  const [data, setData] = useState<any>()
  const [errorMessage, setErrorMessage] = useState<string>()
  const {width, height} = useWindowDimensions()

  // const testing = queryParams.test === '1'
  const testing = (!queryParams.figureId)

  useEffect(() => {
    if (testing) {
      // To test the Test1View without using the figurl parent
      // for example, with no internet connection,
      // use http://localhost:3000?test=1
      setData({source: testSource})
    }
    else {
      getFigureData().then((data: any) => {
        if (!data) {
          setErrorMessage(`No data returned by getFigureData()`)
          return
        }
        setData(data)
      }).catch((err: any) => {
        setErrorMessage(`Error getting figure data`)
        console.error(`Error getting figure data`, err)
      })
    }
  }, [testing])

  if ((!queryParams.figureId) && (!testing)) {
    return (
      <div style={{padding: 20}}>
        <h2>This page is not being embedded as a figurl figure.</h2>
      </div>
    )
  }

  if (errorMessage) {
    return <div style={{color: 'red'}}>{errorMessage}</div>
  }

  if (!data) {
    return <div>Waiting for data</div>
  }

  if (!isMarkdownData(data)) {
    return <div>Invalid data.</div>
  }

  return (
      <MarkdownComponent
        data={data}
        width={width - 10}
        height={height - 5}
      />
  )
}

startListeningToParent()

export default App;

