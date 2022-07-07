import { computed } from "vue"
// 对手
const useCompetitors = (info) => {
  const getCompetitors = computed(() => {
    const competitors = info.competitors?.competitor
    const list = []
    competitors?.forEach(item => {
      list.push({
        ...item,
        title: `${item.country}: ${item.abbreviation}`
      })
    });
    return list
  })
  return getCompetitors
}

export default useCompetitors