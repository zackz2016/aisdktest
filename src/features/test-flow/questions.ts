// features/test-flow/questions.ts
export const testQuestions = [
  {
    id: 'weekendMood',
    title: '你理想的周末状态是？',
    options: [
      { label: '在家耍废', value: 'lazy' },
      { label: '户外撒欢', value: 'active' },
      { label: '猫咖蹲点', value: 'cozy' },
      { label: '沙发看剧', value: 'chill' },
      { label: '和朋友聚会', value: 'social' },
      { label: '一个人发呆', value: 'quiet' },
      { label: '学习成长', value: 'learning' },
      { label: '猫主子舔我', value: 'catFocus' },
      { label: '被窝+零食', value: 'comfort' },
    ]
  },
  {
    id: 'personality',
    title: '你觉得你最贴近的性格是？',
    options: [
      { label: '活泼外向', value: 'extrovert' },
      { label: '安静内敛', value: 'introvert' },
      { label: '理性分析型', value: 'analytical' },
      { label: '感性情绪型', value: 'emotional' },
      { label: '爱自由', value: 'freeSpirit' },
      { label: '超级宅', value: 'homie' },
      { label: '社交王者', value: 'socialButterfly' },
      { label: '天马行空', value: 'creative' },
      { label: '规矩稳定', value: 'organized' },
    ]
  },
  // 后续还可加 “心情”、“喜好”、“梦想”等等
]
