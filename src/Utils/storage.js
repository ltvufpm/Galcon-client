const STAT_LS_KEY = 'statistics'

const prepareDataForUi = rawValue => Object.keys(rawValue).map(
  user => ({ user, value: rawValue[user] })
)

const prepareDataForStorage = JSON.stringify

const getNormalizedStatistics = () => {
  const lsData = window.localStorage.getItem(STAT_LS_KEY);
  return lsData ? JSON.parse(lsData) : {}
}

export const addRecord = (user, score) => {
  const currStatistics = getNormalizedStatistics()
  const currUserScore = currStatistics[user] || 0
  const newStatistics = { ...currStatistics, [user]: currUserScore + score }
  window.localStorage.setItem(STAT_LS_KEY, prepareDataForStorage(newStatistics))
}

export const getStatistics = () => prepareDataForUi(
  getNormalizedStatistics()
)