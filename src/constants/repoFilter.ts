const REPO_FILTER_LIST = [
  { name: "All", value: "all" },
  { name: "Public", value: "public" },
  { name: "Fork", value: "forks" },
  { name: "Source", value: "sources" },
]

const REPO_FILTER_LIST_VALUES = REPO_FILTER_LIST.map((item) => item.value)
const REPO_FILTER_LIST_DEFAULT = REPO_FILTER_LIST[0].value

export {
  REPO_FILTER_LIST,
  REPO_FILTER_LIST_VALUES,
  REPO_FILTER_LIST_DEFAULT,
}